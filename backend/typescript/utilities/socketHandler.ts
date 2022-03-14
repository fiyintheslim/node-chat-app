import { Socket, Server } from "socket.io"
import crypto = require("crypto")
import SessionStorage from "./socketSessionStorage"
import { message, joinChat } from "./types"
import {postgresPool} from "../app"

export const ioServer = (server: any) => {
    return new Server(server, {
        transports: ["polling"],
        cors: {
            origin: "*"
        }
    })
}

const sessionStorage = new SessionStorage()
const randomId = async () => crypto.randomBytes(8).toString('hex');

export const connection = (io: any) => {

    io.use(async (socket: any, next: any) => {
        const client = await postgresPool

        const sessionID = socket.handshake.auth.sessionID;
        const userID = socket.handshake.auth.userID
        console.log("connecting", sessionID, userID)
        if (sessionID === null || sessionID ==="null" || !sessionID) {
            const savedSocketSession = sessionStorage.getSessionID(userID);
            
            if (savedSocketSession) {
                
                socket.handshake.auth.sessionID = savedSocketSession
                return next()
            }
            const user = await client.query("SELECT socketSessionID FROM users WHERE id=$1", [userID])
            if(user.rows[0]){
                socket.handshake.auth.sessionID = user.rows[0];
                sessionStorage.addSession(userID, user.rows[0])
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
        const client = await postgresPool;

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

        socket.on("private_message", async (res: any) => {
            
            //client.query("")
            console.log("A message was sent", res, res.data, res.to)
            socket.to(res.to).emit("private_message", res.data)
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

