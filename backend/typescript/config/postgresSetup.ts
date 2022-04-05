const {Pool} = require("pg");
import dotenv = require("dotenv");
import path = require("path");

dotenv.config({path:path.join(__dirname, "/var.env")})

const dbConnection = async ()=>{
    
    if(process.env.NODE_ENV === "production"){
         let pool =await new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        })
        return pool
    }
    else{
         let pool = await new Pool({
            user : process.env.DB_USER,
            host : process.env.DB_HOST,
            password : process.env.DB_PASSWORD,
            port : process.env.DB_PORT,
            database : process.env.DB,
        })
        return pool
    }
    
}

export default dbConnection