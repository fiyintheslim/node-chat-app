import {Request, Response, NextFunction} from "express";
import bcrypt = require("bcrypt");
import ErrorHandler from "../utilities/registerError";
import {postgresPool} from "../app";
import {send, verify} from "../utilities/tokens"
import sendResetMail from "../utilities/mailer"
import crypto = require("crypto");
import cloudinary = require("cloudinary")



export const signUp = async (req:Request, res:Response, next:NextFunction)=>{
    const user = req.body;
    
    if(!user.password || !user.email || !user.password){
        return next(new ErrorHandler("Incomplete data", 400))
    }
    const client = await postgresPool
    //Check if email already exists
    const emailExists =await client.query("SELECT email FROM users WHERE email = $1", [user.email]);
    if(emailExists.rows[0]){
        return next(new ErrorHandler("Email already exists", 422))
    }
    //check if username already exists
    const usernameExists = await client.query("SELECT username FROM users WHERE username = $1", [user.username]);
    if(usernameExists.rows[0]){
        return next(new ErrorHandler("Username already exists", 422))
    }
    const upload = await cloudinary.v2.uploader.upload(user.avatar, {
        folder:"chat/avatars",
        width:500,
        heigth:500,
        crop:"fill"
    })
    
    
   const hashed = await bcrypt.hash(user.password, 10)
    const saved = await client.query("INSERT INTO users (username, email, password, avatar, avatar_public_id) VALUES($1, $2, $3, $4, $5) RETURNING id, username, email, avatar, avatar_public_id, role, socketSessionID", [user.username, user.email, hashed, upload.secure_url, upload.public_id]);
    console.log(saved.rows[0])
    //send token
    
    const token = await send(saved.rows[0].id);
    console.log(token)

    return res.status(200).cookie("token", token, {maxAge: parseInt(process.env.COOKIES_EXPIRES!) * 24 * 60 * 60 *1000, httpOnly: true}).json({success:true, message:"Registered successfully.", user:saved.rows[0], token})
    
}

export const login = async (req:Request, res:Response, next:NextFunction) =>{
    console.log("Login link clicked")
    const user = req.body;
    
    if(!user.password || !user.detail){
        return next(new ErrorHandler("Incomplete data", 400))
    }

    const client = await postgresPool;
    console.log("query postgres", client)
    const gottenUser = await client.query("SELECT * FROM users WHERE email = $1 OR username = $1", [user.detail]);
    console.log("after query")

    if(!gottenUser.rows[0]){
        return next(new ErrorHandler("User not found", 404))
    }
    const verifyPassword = await bcrypt.compare(user.password, gottenUser.rows[0].password);
    if(!verifyPassword){
        return next(new ErrorHandler("Wrong password", 403))
    }
    const trimmed = gottenUser.rows[0]
    const token = await send(gottenUser.rows[0].id);
    delete trimmed.password
    delete trimmed.created_at
    delete trimmed.password_reset_token
    delete trimmed.password_reset_token_expires
    
    return res.status(200).cookie("token", token, {maxAge:parseInt(process.env.COOKIES_EXPIRES!) * 24 * 60 * 60 * 1000, httpOnly:true}).json({success:true, message:"Login successful.", user:trimmed, token})
}
//logout
export const logout = async (req:Request, res:Response, next:NextFunction) =>{
    
    const cookie = req.cookies.token;
    if(!cookie){
        return next(new ErrorHandler("Login to access this resource.", 403))
    }
    const verified = await verify(cookie);
    console.log(verified)

    return res.status(200).cookie("token", cookie, {maxAge:0, httpOnly:true}).json({successful:true, message:"Logged out successfully."})
}
//request password reset
export const requestPasswordReset = async (req:Request, res:Response, next:NextFunction)=>{
    
    const email = req.body.email;

    const client = await postgresPool;

    const user = await client.query("SELECT id, email, username FROM users WHERE email = $1", [email]);
    
    if(!user.rows[0]){
        return next(new ErrorHandler("Email not found.", 403));
    }

    const resetToken = crypto.randomBytes(36).toString("hex");
    const resetTokenExpires = Date.now() + 5 * 60 * 1000;

    const hashedToken = await bcrypt.hash(resetToken, 10);

    const update = await client.query("UPDATE users SET password_reset_token=$1, password_reset_token_expires=$2", [hashedToken, resetTokenExpires])
    const url = `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/password/reset/${user.rows[0].id}/${resetToken}`
    
    const sent = await sendResetMail(email, url, user.rows[0].username);

    return res.status(200).json({success:true, message:"Token sent, check your email.", resetToken})

}
//reset password
export const passwordReset = async (req:Request, res:Response, next:NextFunction) =>{
    const resetToken = req.params.token;
    const id = req.params.id
    const password = req.body.password
    
    const client = await postgresPool;
    const user = await client.query("SELECT password_reset_token, password_reset_token_expires FROM users WHERE id=$1", [id]);

    if(!user.rows[0].password_reset_token){
        return next(new ErrorHandler("Request password reset token.", 404))
    }

    await client.query("UPDATE users SET password_reset_token=NULL, password_reset_token_expires=NULL WHERE id=$1", [id]);

    if(user.rows[0].password_reset_token_expires < Date.now()){
        return next(new ErrorHandler("Reset token has expired", 403))
    }

    const verifiedToken = await bcrypt.compare(resetToken, user.rows[0].password_reset_token);
    console.log("verified", verifiedToken)
    if(!verifiedToken){
        return next(new ErrorHandler("Invalid token.", 403))
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query("UPDATE users SET password=$1 WHERE id=$2", [hashedPassword, id]);

    return res.status(200).json({success:true, message:"password reset successful"})
}
//get profile details
export const me = async (req:Request, res:Response, next:NextFunction) => {
    
    return res.status(200).json({success:true, user:res.locals.user})
}

export const trial =async (req:Request, res:Response, next:NextFunction) =>{
    return res.status(200).json({success:true, message:"endpoint working"})
}
//saving socket session ID
export const saveSessionID = async (req:Request, res:Response, next:NextFunction) => {
    const sessionID = req.body.sessionID
    const id = res.locals.user.id
    
    const client = await postgresPool;
    const result = await client.query("UPDATE users SET socketSessionID=$1 WHERE id=$2", [sessionID, id]);
   
    return res.status(200).json({success:true, message:"Socket session saved successfully"})
}
//update profile dscription
export const updateDescription = async (req:Request, res:Response, next:NextFunction) => {
    const id = res.locals.user.id;
    const description = req.body.description
    console.log("description", description)
    const client = await postgresPool;
    const result = await client.query("UPDATE users SET description=$1 WHERE id=$2", [description, id]);

    return res.status(200).json({success:true, message:"Profile description updated"})
}
//delete account
export const deleteAccount = async (req:Request, res:Response, next:NextFunction) => {
    const id = res.locals.user.id;

    const client = await postgresPool;

    const result = await client.query("DELETE FROM users WHERE id=$1 RETURNING avatar_public_id", [id]);
    const imgID = result.rows[0].avatar_public_id;
    if(imgID){
        await cloudinary.v2.uploader.destroy(imgID)
    }
    return res.status(200).json({success:true, message:"User account deleted"})
}