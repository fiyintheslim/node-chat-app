import { Socket, Server } from "socket.io"
import crypto = require("crypto")
import SessionStorage from "./socketSessionStorage"
import getGroups from "./getAllGroups"
import { message, joinChat } from "./types"


export const ioServer = (server: any) => {
    return new Server(server, {
        transports: ["polling"],
        cors: {
            origin: "*"
        }
    })
}

const sessionStorage = new SessionStorage()


export const connection = async (io: any) => {
    
    io.use(async (socket: any, next: any) => {
        

        const sessionID = socket.handshake.auth.sessionID;
        const userID = socket.handshake.auth.userID
        console.log("connecting", sessionID, userID)
        
        if (sessionID === null || sessionID ==="null" || !sessionID) {
            const savedSocketSession = sessionStorage.getSessionID(userID);
            
            if (savedSocketSession) {
                
                socket.handshake.auth.sessionID = savedSocketSession
                return next()
            }
            
            socket.handshake.auth.sessionID = socket.id;
            
            sessionStorage.addSession(userID, socket.id)
            
            return next()
        }
        
        const savedSocketSession = sessionStorage.getSessionID(userID);
        if(!savedSocketSession || savedSocketSession !== "null" || savedSocketSession !== null){
            sessionStorage.addSession(userID, sessionID)
        }
        return next()
    })
    io.on("connection", async (socket: any) => {
       

        socket.emit("session", socket.handshake.auth.sessionID)
        socket.join(socket.handshake.auth.sessionID);
        
        
        let users: { sessionID: string, username: string, userID: string }[] = [];
        
        const avail = io.of("/").sockets

        avail.forEach((e: any) => {
            users.push({ sessionID: e.handshake.auth.sessionID, username: e.handshake.auth.username, userID: e.handshake.auth.userID })
        })

        console.log("connected", users, sessionStorage.allSessions())
        socket.emit("users", users)
        socket.broadcast.emit("user_connected", users)

        socket.on("groups", (data:any)=>{
            console.log("groups", data)
            data.forEach((str:string)=>{
                socket.join(str)
            })
        })

        socket.on("private_message", async (res: any) => {
            
            console.log("A message was sent", res, res.data, res.to)
            socket.to(res.to).emit("private_message", res.data)
        })

        socket.on("group_message", async (data:any)=>{
            console.log("group message", data)
            socket.to(data.to).emit("group_message", data)
        })

        socket.on("join_chat", (data: joinChat) => {
            console.log(`User:${socket.id} joined chat, ${data.username}`)
        })

        socket.on("disconnecting", () => {
            console.log("User is disconnecting", socket.id)
            users = users.filter((user) => {
                return user.userID !== socket.handshake.auth.userID
            })

            console.log("users left", users)
            socket.broadcast.emit("user_connected", users)
        })
    })
}

