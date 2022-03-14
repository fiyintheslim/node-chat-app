import {Request, Response, NextFunction} from "express"
import ErrorHandler from "../utilities/registerError"
import {verify} from "../utilities/tokens"
import {postgresPool} from "../app"


const isAuthenticated = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.get("Token");
    
    const client = await postgresPool; 
    if(!token){
        return next(new ErrorHandler("Login to access this resource", 403));
    }
    const verified = await verify(token) as {id:number, iat:number, exp:number};
    const user = await client.query("SELECT id, username, email, avatar, avatar_public_id, role, socketSessionID FROM users WHERE id=$1", [verified.id])
    
    res.locals.user = user.rows[0]
    
    return next()
    
}

export default isAuthenticated