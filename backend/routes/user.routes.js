import {Router} from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/login").post();
router.route("/signup").post();

//secured routes:

router.route("/logout").post(verifyJWT);

export default router;