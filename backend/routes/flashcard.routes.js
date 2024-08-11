import {Router} from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { postNewCard } from "../controllers/flashcard.controller.js";

const router = Router();

router.route("/study-material").get(verifyJWT);
router.route("/upload-material").post(verifyJWT, postNewCard) //isAdmin);

export default router;