import express = require('express');
import {getUsers, getUser, saveMessage} from "../controllers/appController"
import isAuthenticated from "../middlewares/isAuthenticated"


const router = express.Router();

router.route("/users").get(isAuthenticated, getUsers)
router.route("/user/:id").get(isAuthenticated, getUser)
router.route("/save/message").post(saveMessage)

export default router