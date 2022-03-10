import { Socket, Server } from "socket.io"
import { message, joinChat } from "./types"

export const ioServer = (server: any) => {
    return new Server(server, {
        transports: ["polling"],
        cors: {
            origin: "*"
        }
    })
}

export const connection = (io: any) => {

    // io.use((socket, next)=>{
    //     //console.log("socket use method", socket.handshake)
    // })
    io.on("connection", async (socket: Socket) => {
        
        const users:{id:string, username:string, userID:string}[] = [];
        const avail = io.of("/").sockets
        
        avail.forEach((e:any)=>{
           if(e.connected){
            users.push({id:e.id, username:e.handshake.auth.username, userID:e.handshake.auth.userID})
           }
        })
        
        
        console.log("users", users)
      
        socket.emit("user", users)
        socket.broadcast.emit("user_connected", {id:socket.id, username:socket.handshake.auth.username, userID:socket.handshake.auth.userID})

        socket.on("message", (data: message) => {
            console.log("A message was sent", data)
        })

        socket.on("join_chat", (data: joinChat) => {
            console.log(`User:${socket.id} joined chat, ${data.username}`)
        })

        socket.on("disconnecting", () => {
            console.log("User is disconnecting")
            console.log(io, io.connected)
        })
    })
}

