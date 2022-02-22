import {ErrorRequestHandler, Request, Response, NextFunction} from "express";

interface error extends Error{
    message:string;
    statusCode:number;
    trace:Error;
}

const errorHandler = (err:error, req:Request, res:Response, next:NextFunction) =>{
    console.log("error", err.stack)
    const errMessage = err.message || "Internal server error.";
    const errCode  = err.statusCode || 500;

    return res.status(errCode).json({
        success:false,
        error:errMessage,
        stack:err.stack
    })
}

export default errorHandler;