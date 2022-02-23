//const path = require("path")
import express = require("express");
import dotenv = require("dotenv");
import path = require("path");
import user from "./routes/userRoutes"
import errors from "./middlewares/handleErrorResponse"

import postgres from "./config/postgresSetup"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))

dotenv.config({path:path.join(__dirname, "/config/var.env")})

export const postgresPool = postgres()


app.use("/api/v1", user)
app.use(errors);

module.exports = app