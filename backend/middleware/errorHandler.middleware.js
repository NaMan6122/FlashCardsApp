// import { app } from "../app.js";
// import { ApiError } from "../helpers/ApiError.js"
// import { ApiResponse } from "../helpers/ApiResponse.js"

// //handles error thrown by the custom ApiError class and returns the response to the frontend, which is passed inside the ApiError.
// const errorHandler = ((err, req, res, next) => {
//     if(err instanceof ApiError){
//         console.log("ggqp");
//         return res.status(err.status).json(new ApiResponse(err.status, {}, err.message));
//     }
//     console.log("ggWp");
//     return res.status(500).json(new ApiResponse(500, {}, "Sommething is Not RIght!!"));
// });

// export default errorHandler;
