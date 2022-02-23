const {Pool, Client} = require("pg");

const dbConnection = async ()=>{
    const pool =await new Pool({
        user:process.env.DB_USER,
        host:process.env.DB_HOST,
        password:process.env.DB_PASSWORD,
        port:process.env.DB_PORT,
        database:process.env.DB
    })
    return pool
}

export default dbConnection