const server = require("./app");


server.listen(process.env.PORT, ()=>{
    console.log(`App started on port ${process.env.PORT}`)
})


