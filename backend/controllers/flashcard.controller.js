import { Flashcard } from "../models/flashcardModel.js"
import { ApiError } from "../helpers/ApiError.js";
import { ApiResponse} from "../helpers/ApiResponse.js";
import { asyncHandler } from "../helpers/AsyncHandler.js";

const postNewCard = asyncHandler( async(req, res) => {
    //we will get info from the frontend form fields, so we need to get the values from the request body.
    const {question, answer} = req.body;
    //we will create a new flashcard object with the values from the request body.
    const newCard={
        question: question,
        answer: answer,
    }
    //we will save the new flashcard object to the database.
    const card = await Flashcard.create(newCard);
    if(!card){
        throw new ApiError(400, "Failed to create new flashcard");
    }
    console.log("Flashcard created successfully!!");
    //we will return a success response to the frontend.
    res.status(200)
    .json(new ApiResponse(200, card, "New Flash Card Created Successfully!!"));
})

const getCardData = asyncHandler( async(req, res) => {
    const { index, direction } = req.query;
    //console.log(index, direction);
    if(!index || !direction){
        throw new ApiError(400, "Index and Direction are required!!");
    }
    let cardInstance;

    if(direction === "current"){
        cardInstance = await Flashcard.findOne({index: index});
    }else if(direction === "next"){
        cardInstance = await Flashcard.findOne({index: index + 1});
    }else if(direction === "previous"){
        cardInstance = await Flashcard.findOne({index: index - 1});
    }
    console.log(cardInstance);
    if(!cardInstance){
        throw new ApiError(404, "Card not found!!");
    }

    res.status(200)
    .json(new ApiResponse(200, cardInstance, "Card Data Retrieved Successfully!!"));
});

export {
    postNewCard,
    getCardData,
}