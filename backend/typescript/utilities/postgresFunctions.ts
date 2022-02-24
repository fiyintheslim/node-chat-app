import bcrypt = require("bcrypt");
import { ResultBuilder, } from "pg"
import postgres from "../config/postgresSetup"
import ErrorHandler from "./registerError"

import { postgresPool } from "../app"

import { signupUser } from "./types";


export const saveUser = async (user: signupUser) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const client = await postgresPool
    const emailExists =await client.query("SELECT email FROM users WHERE email = $1", [user.email]);
    const usernameExists = await client.query("SELECT username FROM users WHERE username = $1", [user.username]);

    console.log(emailExists.rows[0], usernameExists.rows[0])
    try {
        const res = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [user.username, user.email, hashedPassword]);
        return res
    } catch (err) {
        console.log("sql error", err)
        //return new ErrorHandler(err.detail, 400)
    }
}