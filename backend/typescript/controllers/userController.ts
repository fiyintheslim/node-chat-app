import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../utilities/registerError";

export const login = (req:Request, res:Response, next:NextFunction) =>{
    return next(new ErrorHandler("testing", 350))
    //return res.status(200).json({success:true, message:"Login route"})
}