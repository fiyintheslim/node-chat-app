import express = require('express');
import {getUsers} from "../controllers/appController"
import isAuthenticated from "../middlewares/isAuthenticated"


const router = express.Router();

router.route("/users").get(isAuthenticated, getUsers)

export default router