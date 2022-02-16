import * as express from "express";
const router = express.Router();
import {login} from "../controllers/userController";


router.route("/").get(login)
export default router