import {Request, Response, NextFunction} from "express"
import ErrorHandler from "../utilities/registerError"
import {verify} from "../utilities/tokens"
//import {postgresPool} from "../app"
import postgres from "../config/postgresSetup"

const postgresPool = postgres()

const isAuthenticated = async (req:Request, res:Response, next:NextFunction)=>{
    
    const token = req.get("Token");
    
    const client = await postgresPool; 
    
    if(!token){
        return next(new ErrorHandler("Login to access this resource", 403));
    }
    try{
        const verified = await verify(token) as {id:number, iat:number, exp:number};
        if(!verified){}
        const user = await client.query("SELECT id, username, email, avatar, avatar_public_id, role, socketsessionid, description FROM users WHERE id=$1", [verified.id])
        
        if(user.rows.length < 1){
            return next(new ErrorHandler("Account doesn't exist", 422))
        }
        res.locals.user = user.rows[0]

        return next()
    }catch(err){
        console.log("JWT error");
        return next(new ErrorHandler("Invalid token", 403))
    }
    
    
}

export default isAuthenticated