import * as express from "express";
import {login, signUp, logout, requestPasswordReset, passwordReset, me, trial, saveSessionID} from "../controllers/userController";
import isAuthenticated from "../middlewares/isAuthenticated"

const router = express.Router();


router.route("/register").post(signUp)
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/reset").post(requestPasswordReset);
router.route("/password/reset/:id/:token").post(passwordReset);
router.route("/me").get(isAuthenticated, me)
router.route("/save/sessionID").post(isAuthenticated, saveSessionID)
router.route("/trial").get(trial, me);

export default router