import postgres from "./postgresSetup";
import dotenv = require("dotenv");
import path = require("path")

dotenv.config({path:path.join(__dirname, "/var.env")})

const setTables = async () =>{
    const pool = await postgres()
    const client = await pool.connect()
    await client.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NUll,
        avatar VARCHAR(255),
        avatar_public_id VARCHAR(255),
        role VARCHAR(6) NOT NULL DEFAULT 'user',
        description TEXT,
        gender VARCHAR(6) NOT NULL,
        socketSessionID VARCHAR(255),
        password_reset_token VARCHAR(255),
        password_reset_token_expires VARCHAR(255),
        created_at TIMESTAMP default current_timestamp
    )`)

    await client.query(`
    CREATE TABLE messages IF NOT EXISTS(
        id SERIAL PRIMARY KEY NOT NULL,
        senderID INTEGER NOT NULL,
        receiverID INTEGER,
        content TEXT NOT NULL,
        roomID VARCHAR(255),
        time INTEGER NOT NULL,
    )`)

    await client.query(`
    CREATE TABLE IF NOT EXISTS groups(
        groupID SERIAL NOT NULL PRIMARY KEY,
        groupName TEXT NOT NULL,
        groupOwner TEXT NOT NULL,
        groupAdmins TEXT,
    ) 
    `)
        console.log("tables set")
    await client.release();
}
//avatar_url VARCHAR(255) NOT NULL,
//avatar_id VARCAHR(255) NOT NULL,
setTables()
