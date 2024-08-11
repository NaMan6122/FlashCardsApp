import {Router} from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { logoutUser, onLogin, onSignup } from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(onLogin);
router.route("/signup").post(onSignup);

//secured routes:

router.route("/logout").post(verifyJWT, logoutUser);

export default router;