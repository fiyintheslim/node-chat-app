import {Request, Response, NextFunction} from "express";
export const login = (req:Request, res:Response, next:NextFunction) =>{
    return res.status(200).json({success:true, message:"Login route"})
}