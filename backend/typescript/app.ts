//const path = require("path")
import express = require("express");
import dotenv = require("dotenv");
import path = require("path");
import user from "./routes/userRoutes"
import errors from "./middlewares/handleErrorResponse"

const app = express();

dotenv.config({path:path.join(__dirname, "/config/var.env")})



app.use("/api/v1", user)
app.use(errors);

module.exports = app