import * as express from "express";
import {login, signUp, logout, requestPasswordReset, passwordReset, me, trial} from "../controllers/userController";
import isAuthenticated from "../middlewares/isAuthenticated"

const router = express.Router();


router.route("/register").post(signUp)
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/reset").post(requestPasswordReset);
router.route("/password/reset/:id/:token").post(passwordReset);
router.route("/me/:token").get(isAuthenticated, me)
router.route("/trial").get(trial, me);

export default router