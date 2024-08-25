import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());


//handling api routes:
import userRouter from "./routes/user.routes.js"
import cardRouter from "./routes/flashcard.routes.js";

app.use("/api/users/v1", userRouter);
app.use("/api/flashcards/v1", cardRouter);

export { app };