//const path = require("path")
import express = require("express");
import dotenv = require("dotenv");
import path = require("path");
import cookieParser = require("cookie-parser")
import cloudinary = require("cloudinary");
import cors = require("cors")

import fileUpload = require("express-fileupload")
import user from "./routes/userRoutes"
import chatApp from "./routes/appRoutes";
import errors from "./middlewares/handleErrorResponse"

import postgres from "./config/postgresSetup"

const app = express();
app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors())


dotenv.config({path:path.join(__dirname, "/config/var.env")})

//export const postgresPool = postgres()

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure:true
})


app.use("/api/v1", user)
app.use("/api/v1", chatApp)
app.use(errors);

module.exports = app