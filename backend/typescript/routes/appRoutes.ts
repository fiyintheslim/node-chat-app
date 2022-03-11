import express = require('express');
import {getUsers, getUser} from "../controllers/appController"
import isAuthenticated from "../middlewares/isAuthenticated"


const router = express.Router();

router.route("/users").get(isAuthenticated, getUsers)
router.route("/user/:id").get(getUser)

export default router