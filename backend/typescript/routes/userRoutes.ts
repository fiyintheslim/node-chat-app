import * as express from "express";
const router = express.Router();
import {login, signUp, logout, requestPasswordReset, passwordReset, trial} from "../controllers/userController";

router.route("/register").post(signUp)
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/reset").post(requestPasswordReset);
router.route("/password/reset/:id/:token").post(passwordReset);
router.route("/trial").get(trial);

export default router