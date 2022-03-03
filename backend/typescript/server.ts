const {Server, ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData} = require("socket.io");
const app = require("./app");


const server = app.listen(process.env.PORT, ()=>{
    console.log(`App started on port ${process.env.PORT}`)
})

const socketServer = new Server(server);

socketServer.on("connection", function(socket: any){
    console.log("user connected", socket)
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
