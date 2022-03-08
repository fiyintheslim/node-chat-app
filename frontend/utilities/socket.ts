import {io} from "socket.io-client"

const server = io(process.env.NEXT_PUBLIC_SERVER as string, {autoConnect:false})

server.onAny((e, ...arg)=>{
    console.log("Event fired", e, arg)
})

export default server