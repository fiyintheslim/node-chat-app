import {io} from "socket.io-client"

const server = io(process.env.NEXT_PUBLIC_SERVER as string, {autoConnect:false})

server.onAny((e, ...arg)=>{
    console.log("Event fired", e, arg)
})

server.on("user", (data)=>{
    console.log(data, server.id)
})

server.on("user_connected", (data)=>{
    alert(`${data.username} is online`)
})

export default server