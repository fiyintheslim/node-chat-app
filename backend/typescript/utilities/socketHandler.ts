import {Socket, Server} from "socket.io"
import {message} from "./types"

export const ioServer = (server:any) => {
    return new Server(server, {
        transports:["polling"],
        cors:{
            origin:"*"
        }
    })
}

export const connection = (io:Socket) => {
    io.on("connection", (socket)=>{
        console.log("User connected", socket.id)

        socket.on("message", (data:message)=>{
            console.log("A message was sent", data)
        })

        socket.on("join_chat", ()=>{
            console.log(`User:${socket.id} joined chat`)
        })

        socket.on("disconnecting", ()=>{
            console.log("User is disconnecting")
        })
    })
}

