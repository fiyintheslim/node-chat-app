import {io} from "socket.io-client"

const server = io(process.env.NEXT_PUBLIC_SERVER as string, {autoConnect:false})

server.onAny((e, ...arg)=>{
    console.log("Event fired", e, arg)
})

server.on("users", (data)=>{
    console.log("users updated", data, server.id)

})

server.on("user_connected", (data)=>{
    console.log(`${data.username} is online`)
})

server.on("disconnecting", ()=>{
    alert("Disconnecting")
})

server.on("connect_err", (err)=>{
    console.log("Error", err)
})

export default server