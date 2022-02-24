//const path = require("path")
import express = require("express");
import dotenv = require("dotenv");
import path = require("path");
import cookieParser = require("cookie-parser")
import cloudinary = require("cloudinary");
import user from "./routes/userRoutes"
import errors from "./middlewares/handleErrorResponse"

import postgres from "./config/postgresSetup"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

dotenv.config({path:path.join(__dirname, "/config/var.env")})

export const postgresPool = postgres()

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure:true
})

app.use("/api/v1", user)
app.use(errors);

module.exports = app