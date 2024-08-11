import mongoose from "mongoose";

const flashcardModel = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
},{timestamps: true});

export const Flashcard = mongoose.model("Flashcard", flashcardModel);