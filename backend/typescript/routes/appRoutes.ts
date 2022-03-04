import express = require('express');
import {getUsers} from "../controllers/appController"


const router = express.Router();

router.route("/users").get(getUsers)

export default router