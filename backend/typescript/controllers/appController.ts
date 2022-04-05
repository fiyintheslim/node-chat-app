import {Request, Response, NextFunction} from "express"

import crypto = require("crypto");
import ErrorHandler from "../utilities/registerError";
import cloudinary = require("cloudinary")
//import {postgresPool} from "../app"
import postgres from "../config/postgresSetup"

const postgresPool = postgres()

export const getUsers = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.get("token");
    const user = res.locals.user
    const client = await postgresPool
    
    
    const users = await client.query("SELECT id, username, email, avatar, role FROM users WHERE NOT id=$1", [user.id]) 
    return res.status(200).json({success:true, users:users.rows})
    
    
}

export const getUser = async (req:Request, res:Response, next:NextFunction) => {
    
    const userID = req.params.id
    const client = await postgresPool;
    

    const result = await client.query("SELECT id, username, email, role, gender, avatar, avatar_public_id, socketsessionid, description FROM users WHERE id=$1", [userID]);

    return res.status(200).json({
        success:true,
        user:result.rows[0]
    })  

}

export const saveMessage = async (req:Request, res:Response, next:NextFunction)=>{
    const client = await postgresPool;
    
    const {senderID, receiverID, content, time} = req.body

    const result = await client.query("INSERT INTO messages (senderID, receiverID, content, time) VALUES ($1, $2, $3, $4)", [senderID, receiverID, content, time])
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
                                    (SELECT receiverid FROM messages WHERE senderid=$1 OR receiverid=$1)) ORDER BY username ASC`, 
                                    [id])
                                            
    return res.status(200).json({success:true, chats:result.rows})
    
    
}

export const getActivities = async (req:Request, res:Response, next:NextFunction) => {
    const id = res.locals.user.id;
    //const id = req.query.id
    
    const client = await postgresPool;

    const all = await client.query("SELECT COUNT(id) FROM messages")
    const messages = await client.query("SELECT COUNT(id) FROM messages WHERE senderid=$1 OR receiverid=$1", [id]);
    const sent =  await client.query("SELECT COUNT(id) FROM messages WHERE senderid=$1", [id]);
    const received = await client.query("SELECT COUNT(id) FROM messages WHERE receiverid=$1", [id]);
    
    return res.status(200).json({success:true, stats:{all:all.rows[0].count, mine:messages.rows[0].count, sent:sent.rows[0].count, received:received.rows[0].count}})
    
}

export const createGroup = async (req:Request, res:Response, next:NextFunction) => {
    const id = res.locals.user.id
    const groupId = crypto.randomBytes(8).toString("hex");
    const {groupName, interests, avatar} = req.body;
    const client = await postgresPool;
    
    const upload = await cloudinary.v2.uploader.upload(avatar, {
        folder:"chat/groups",
        width:500,
        heigth:500,
        crop:"fill"
    })
    
    const result = await client.query("INSERT INTO groups (groupid, groupname, interests, groupowner, groupavatar, groupavatar_public_id) VALUES ($1, $2, $3, $4, $5, $6)", [groupId, groupName, interests, id, upload.secure_url, upload.public_id]);

    await client.query("INSERT INTO groups_participants (participant, groupid) VALUES ($1, $2)", [id, groupId]);

    return res.status(200).json({successs:true, message:"Group created successfully.", group:req.body, groupId})
    
    
}

export const getGroups = async (req:Request, res:Response, next:NextFunction) => {

    const client = await postgresPool;

    const results = await client.query("SELECT groupid, groupname, groupavatar, groupowner, interests FROM groups");
    return res.status(200).json({sucess:true, groups:results.rows})
    
} 

export const getMyGroups = async (req:Request, res:Response, next:NextFunction) => {
    const id = res.locals.user.id;
    const client = await postgresPool;
    
    const result = await client.query("SELECT groupname, groupid, groupowner FROM groups WHERE groupid IN (SELECT groupid FROM groups_participants WHERE participant = $1)", [id]);
    //Alternate query;
    // SELECT groups.groupid, groups.groupname FROM groups INNER JOIN groups_participants ON groups_participants.groupid=groups.groupid WHERE groups_participants.participant=$1'
    return res.status(200).json({success:true, myGroups:result.rows})
    
}

export const getMyCreatedGroups = async (req:Request, res:Response, next:NextFunction) => {
    const id = res.locals.user.id;
    const client = await postgresPool;
    
    const result = await client.query("SELECT * FROM groups WHERE groupowner=$1", [id]);

    return res.status(200).json({success:true, groups:result.rows})  
    
}

export const joinGroup = async (req:Request, res:Response, next:NextFunction) => {
    const id = res.locals.user.id;
    const groupId = req.body.groupId;
    
    const client = await postgresPool;
    
    await client.query("INSERT INTO groups_participants (participant, groupid) VALUES ($1, $2)", [id, groupId]);
    return res.status(200).json({success:true, message:"Added to group successfully"});
   
}

export const getGroup = async (req:Request, res:Response, next:NextFunction) => {
    const groupid = req.query.groupid
    const client = await postgresPool;
    
    const result = await client.query("SELECT groupid, groupname, groupavatar, groupowner, interests FROM groups WHERE groupid=$1", [groupid]);
    return res.status(200).json({success:true, group:result.rows[0]})
    
}

export const saveGroupMessage = async (req:Request, res:Response, next:NextFunction) => {
    const {senderid, content, time, groupid} = req.body
    const client = await postgresPool;
    
    await client.query("INSERT INTO messages (senderid, groupid, content, time) VALUES ($1, $2, $3, $4)", [senderid, groupid, content, time])
    return res.status(200).json({success:true, content: req.body})
   
}

export const getGroupMessages = async (req:Request, res:Response, next:NextFunction) => {
    const groupid = req.body.groupid
    const client = await postgresPool;
    
    const groupMessages = await client.query("SELECT messages.groupid, messages.content, messages.time, messages.senderid, users.username FROM messages INNER JOIN users ON users.id = messages.senderid WHERE groupid = $1", [groupid])
    return res.status(200).json({success:true, messages:groupMessages.rows}) 
    
}

export const deleteMyGroup = async(req:Request, res:Response, next:NextFunction) => {
    const userId = res.locals.user.id
    const groupid = req.query.groupid;

    const client = await postgresPool;
    
    const owner = await client.query("SELECT groupowner, groupavatar_public_id  FROM groups WHERE groupid=$1", [groupid]);
    const isOwner = owner.rows.find((own:{groupowner:string})=>own.groupowner === userId.toString())
    console.log("owner", owner.rows, isOwner)
    if(!isOwner){
        return next(new ErrorHandler("You don't own this group", 403))
    }
    await cloudinary.v2.uploader.destroy(owner.rows[0].groupavatar_public_id)

    await client.query("DELETE FROM groups WHERE groupid=$1", [groupid]);
    await client.query("DELETE FROM groups_participants WHERE groupid=$1", [groupid]);
    await client.query("DELETE FROM messages WHERE groupid=$1", [groupid]);

    return res.status(200).json({success:true, message:"Group deleted successfully"});
    
}