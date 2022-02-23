import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../utilities/registerError";
import {saveUser} from "../utilities/postgresFunctions"

export const signUp = async (req:Request, res:Response, next:NextFunction)=>{
    const user = req.body;
    if(!user.password){
        return next(new ErrorHandler("No data received", 400))
    }
    try{
        const saved = await saveUser(req.body);
        return res.status(200).json({success:true, message:"user saved"})
    } catch (err){
        return next(new ErrorHandler("Problem saving user to database", 400))
    }
    
}

export const login = (req:Request, res:Response, next:NextFunction) =>{
    const user = req.body;
    if(!user){
        return next(new ErrorHandler("No data received", 400))
    }
    
    return res.status(200).json({success:true, message:"Login route", user})
}

