import * as express from "express";
const router = express.Router();
import {login, signUp} from "../controllers/userController";

router.route("/register").post(signUp)
router.route("/login").post(login)
export default router