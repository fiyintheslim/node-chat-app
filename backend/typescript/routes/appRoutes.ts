import express = require('express');
import {getUsers, getUser, saveMessage, getMessages} from "../controllers/appController"
import isAuthenticated from "../middlewares/isAuthenticated"


const router = express.Router();

router.route("/users").get(isAuthenticated, getUsers)
router.route("/user/:id").get(isAuthenticated, getUser)
router.route("/save/message").post(isAuthenticated, saveMessage)
router.route("/messages").get(isAuthenticated, getMessages)

export default router