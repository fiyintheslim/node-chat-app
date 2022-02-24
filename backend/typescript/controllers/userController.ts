import {Request, Response, NextFunction} from "express";
import bcrypt = require("bcrypt");
import ErrorHandler from "../utilities/registerError";
import {saveUser} from "../utilities/postgresFunctions";
import {postgresPool} from "../app";
import {send, verify} from "../utilities/tokens"



export const signUp = async (req:Request, res:Response, next:NextFunction)=>{
    const user = req.body;
    if(!user.password){
        return next(new ErrorHandler("No data received", 400))
    }
    const client = await postgresPool
    const emailExists =await client.query("SELECT email FROM users WHERE email = $1", [user.email]);
    if(emailExists.rows[0]){
        return next(new ErrorHandler("Email already exists", 422))
    }
    const usernameExists = await client.query("SELECT username FROM users WHERE username = $1", [user.username]);
    if(usernameExists.rows[0]){
        return next(new ErrorHandler("Username already exists", 422))
    }
   const hashed = await bcrypt.hash(user.password, 10)
    const saved = await client.query("INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING id, username, email", [user.username, user.email, hashed]);
    console.log(saved.rows[0])
    const token = await send(saved.rows[0].id);
    return res.status(200).cookie("token", token, {maxAge: parseInt(process.env.COOKIES_EXPIRES!) * 24 * 60 * 60 *1000, httpOnly: true}).json({success:true, message:"Registered successfully"})
    
}

export const login = (req:Request, res:Response, next:NextFunction) =>{
    const user = req.body;
    if(!user){
        return next(new ErrorHandler("No data received", 400))
    }
    
    return res.status(200).json({success:true, message:"Login route", user})
}

