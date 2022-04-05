import {Request, Response, NextFunction} from "express"
const handleAsyncErrors = (func:Function)=>(req:Request, res:Response, next:NextFunction) => Promise.resolve(func(req, res, next)).catch(next);

export default handleAsyncErrors