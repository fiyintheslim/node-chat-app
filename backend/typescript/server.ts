const {Server, Socket} = require("socket.io");
const enterChat = require("./utilities/socketHandler");
import {message} from "./utilities/types"
const app = require("./app");


const server = app.listen(process.env.PORT, ()=>{
    console.log(`App started on port ${process.env.PORT}`)
})

const socketServer = new Server(server);

socketServer.on("connection", function(socket: typeof Socket){
    socket.on("online", function(){
        
    })
})

process.on("unhandledRejection", function(err){
    console.log(`Server stopped due to unhandledRejection: ${err}`);
    server.close();
    process.exit(0)
})

process.on("uncaughtException", function(err){
    console.log(`Server stopped due to uncaughtException: ${err}`);
    server.close();
    process.exit(0)
})
