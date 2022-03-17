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

    const result = await client.query("SELECT id, username, email, role, gender, avatar, avatar_public_id, socketsessionid FROM users WHERE id=$1", [userID]);

    return res.status(200).json({
        success:true,
        user:result.rows[0]
    })
}

export const saveMessage = async (req:Request, res:Response, next:NextFunction)=>{
    const client = await postgresPool;

    const {senderID, receiverID, content, time} = req.body

    const result = await client.query("INSERT INTO messages (senderID, receiverID, content, time) VALUES ($1, $2, $3, $4)", [senderID, receiverID, content, time])
    console.log("saving messages", content)
    return res.status(200).json({
        successful:true,
        message:"Message saved",
        content
    })
}

export const getMessages = async (req:Request, res:Response, next:NextFunction) => {
    const receiver = req.query.receiver
    const senderID = res.locals.user.id;

    const client = await postgresPool;

    const result = await client.query("SELECT senderid, content, time FROM messages WHERE (senderid=$1 AND receiverid=$2) OR (senderid=$2 AND receiverid=$1)", [senderID, receiver]);

    return res.status(200).json({success:true, messages:result.rows})
}

export const getChats = async (req:Request, res:Response, next:NextFunction) => {
    const id = res.locals.user.id;
    const client = await postgresPool;

    const result = await client.query(`SELECT id, username FROM users WHERE NOT id=$1 AND (id IN 
                                        (SELECT senderid FROM messages WHERE senderid=$1 OR receiverid=$1)
                                         OR id IN
                                        (SELECT receiverid FROM messages WHERE senderid=$1 OR receiverid=$1))`, 
                                        [id])
    return res.status(200).json({success:true, chats:result.rows})
}