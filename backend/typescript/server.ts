const {Server, Socket, RequestSocket} = require("socket.io");
//const https = require("https");
const {ioServer, connection} = require("./utilities/socketHandler");

const app = require("./app");


const server = app.listen(process.env.PORT, ()=>{
    console.log(`App started on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

const io = ioServer(server);
connection(io)


if(process.env.NODE_ENV === "development"){
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
}
