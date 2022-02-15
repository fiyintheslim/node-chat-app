//const path = require("path")
import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path:path.join(__dirname, "/config/var.env")})
const app = express();

module.exports = app