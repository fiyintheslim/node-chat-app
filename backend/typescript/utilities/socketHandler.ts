import {Socket, Server} from "socket.io"
import {message, joinChat} from "./types"

export const ioServer = (server:any) => {
    return new Server(server, {
        transports:["polling"],
        cors:{
            origin:"*"
        }
    })
}

export const connection = (io:Socket) => {
    io.use((socket, next)=>{
        //console.log("socket use method", socket.handshake)
    })
    io.on("connection", (socket)=>{
        console.log("User connected", socket.id, socket.handshake.auth)

        socket.on("message", (data:message)=>{
            console.log("A message was sent", data)
        })

        socket.on("join_chat", (data:joinChat)=>{
            console.log(`User:${socket.id} joined chat, ${data.username}`)
        })

        socket.on("disconnecting", ()=>{
            console.log("User is disconnecting")
        })
    })
}

