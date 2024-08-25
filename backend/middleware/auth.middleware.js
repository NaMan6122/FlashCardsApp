import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js"
import { asyncHandler } from "../helpers/AsyncHandler.js";
import { ApiError } from "../helpers/ApiError.js";
import dotenv from "dotenv";
import { ApiResponse } from "../helpers/ApiResponse.js";
dotenv.config();
//checks whether the user is logged in or not, and if he is, this function acts as a middleware and adds req.user field to the req object.
const verifyJWT = asyncHandler( async(req , _, next) => {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
    // console.log("hi");
    // console.log(req.cookies);
    // console.log("hi");
    // console.log(accessToken);
    if(!accessToken){
        throw new ApiError(400, "Unauthorized Access, Please Login First!!");
    }
    //now to verify whether that the token is correct or not, we decode the token using token secret,
    //the decoded token will have the field _id, now we will search for the user with this _id.
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(400, "Invalid Access Token, User not found!");
    }
    //if the user is found, we add the user to the req object so that we can access the user in the routes.
    req.user = user;
    next();
});

const isUserAdmin = asyncHandler( async(req, res, next) => {
    //if we are checking this it means we have passed through the verifyJWT middleware, and hence we have the access to req.user property.
    const currUser = req.user;
    console.log(req.user);
    console.log("Hello!");
    if(currUser.isAdmin === false){
        throw new ApiError(403, "Unauthorized Access, the User is Not Admin!!");
    }
    return res.status(200).json(new ApiResponse(200, {}, "DOne"));
});

export { verifyJWT, isUserAdmin };
