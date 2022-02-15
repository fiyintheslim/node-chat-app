"use strict";
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "/config/var.env") });
const app = express();
module.exports = app;
