import {Router} from "express";
import { verifyJWT, isUserAdmin } from "../middleware/auth.middleware.js";
import { getCardData, postNewCard } from "../controllers/flashcard.controller.js";

const router = Router();

router.route("/study-material").get(verifyJWT, getCardData);
router.route("/upload-material").post(verifyJWT, isUserAdmin, postNewCard);

export default router;