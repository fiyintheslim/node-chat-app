import {Request, Response, NextFunction} from "express"
import ErrorHandler from "../utilities/registerError";
import {postgresPool} from "../app"

export const getUsers = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.get("token");
    const user = res.locals.user
    const client = await postgresPool
    const users = await client.query("SELECT id, username, email, avatar, role FROM users WHERE NOT id=$1", [user.id]) 
    return res.status(200).json({success:true, users:users.rows})
}

export const getUser = async (req:Request, res:Response, next:NextFunction) => {
    console
    const userID = req.params.id
    const client = await postgresPool;

    const result = await client.query("SELECT id, username, email, role, gender, avatar, avatar_public_id FROM users WHERE id=$1", [userID]);

    return res.status(200).json({
        success:true,
        user:result.rows[0]
    })
}

export const saveMessage = async (req:Request, res:Response, next:NextFunction)=>{
    const client = await postgresPool;

    const content = req.body

    //const result = await client.query("INSERT INTO messages (senderID, receiverID, content, roomID, time) VALUES ($1, $2, $3, $4)", [])
    console.log("saving messages", content)
    return res.status(200).json({
        successful:true,
        message:"Message saved",
        content
    })
}