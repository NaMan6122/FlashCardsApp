import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js"
import { asyncHandler } from "../helpers/AsyncHandler.js";
import { ApiError } from "../helpers/ApiError.js";

//checks whether the user is logged in or not, and if he is, this function acts as a middleware and adds req.user field to the req object.
const verifyJWT = asyncHandler( async(req , res, next) => {
    const accessToken = req.cookies?.accessToken || req.headers("Authorization").replace("Bearer", "");
    console.log(accessToken);
    if(!accessToken){
        throw new ApiError(400, "Unauthorized Access, Please Login First!!");
    }
    //now to verify whether that the token is correct or not, we decode the token using token secret,
    //the decoded token will have the field _id, now we will search for the user with this _id.
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if(!user){
        throw new ApiError(400, "Invalid Access Token, User not found!");
    }
    //if the user is found, we add the user to the req object so that we can access the user in the routes.
    req.user = user;
    next();
});

export { verifyJWT };
