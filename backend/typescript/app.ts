//const path = require("path")
import express = require("express");
import dotenv = require("dotenv");
import path = require("path");
import user from "./routes/userRoutes"

const app = express();

dotenv.config({path:path.join(__dirname, "/config/var.env")})



app.use("/api/v1", user)

module.exports = app