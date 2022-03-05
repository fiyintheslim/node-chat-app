import {Request, Response, NextFunction} from "express"
import ErrorHandler from "../utilities/registerError";
import {postgresPool} from "../app"

export const getUsers = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.get("token");
    const user = res.locals.user
    const client = await postgresPool
    const users = await client.query("SELECT id, username, email, avatar, role FROM users WHERE NOT id=$1", [user.id]) 
    res.status(200).json({success:true, users:users.rows})
}