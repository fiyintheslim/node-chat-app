const app = require("./app");


const server = app.listen(process.env.PORT, ()=>{
    console.log(`App started on port ${process.env.PORT}`)
})

process.on("unhandledRejection", function(err){
    console.log(`Server stopped due to unhandledRejection: ${err}`);
    server.stop();
    process.exit(0)
})

process.on("uncaughtException", function(err){
    console.log(`Server stopped due to uncaughtException: ${err}`);
    server.stop();
    process.exit(0)
})
