import bcrypt = require("bcrypt");
import {ResultBuilder, } from "pg"
import postgres from "../config/postgresSetup"
import ErrorHandler from "./registerError"

import {postgresPool} from "../app"

import {signupUser} from "./types";


export const saveUser = async (user:signupUser)=>{
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    const client = await postgresPool
    try{
        const res =await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [user.username, user.email, hashedPassword])
    } catch (err){
        console.log(err)
    }
}