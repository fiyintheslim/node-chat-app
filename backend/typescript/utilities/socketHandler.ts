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
        
        let users:{id:string, username:string, userID:string}[] = [];
        
        const avail = io.of("/").sockets
        
        avail.forEach((e:any)=>{
            users.push({id:e.id, username:e.handshake.auth.username, userID:e.handshake.auth.userID})
        })
        
        // users = users.reduce((acc:{id:string, username:string, userID:string}[], e:any)=>{
        //     let obj = acc.find(el=>{
        //         return el.userID === e.userID})

        //     console.log("obj",e.userID, obj)

        //     let index = obj ? acc.indexOf(obj) : undefined
        //     console.log("index", index)
        //     if(obj && index){
        //         console.log("duplicate", acc, e)
        //         acc[index] = {id:e.id, username:e.username, userID:e.userID}
        //         return [...acc]
        //     }else{
        //         return [...acc, {id:e.id, username:e.username, userID:e.userID}]
        //     }
            
        // }, [])
        
        
        console.log("users", users);
        //console.log("Filtered users", filteredUsers);
      
        socket.emit("users", users)
        socket.broadcast.emit("user_connected", users)

        socket.on("private_message", (data: message) => {
            console.log("A message was sent", data)
        })

        socket.on("join_chat", (data: joinChat) => {
            console.log(`User:${socket.id} joined chat, ${data.username}`)
        })

        socket.on("disconnecting", () => {
            console.log("User is disconnecting", socket)
            console.log(socket.id)
            users = users.filter((user)=>{
                return user.userID !== socket.handshake.auth.userID
            })
            
            console.log("users left", users)
            socket.broadcast.emit("user_connected", users)
        })
    })
}

