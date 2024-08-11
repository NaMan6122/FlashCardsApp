import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./dbConfig/dbConfig.js";

dotenv.config();

connectDB()
.then(() => {
    app.on(process.env.PORT, (error) => {
        if(error){
            console.log("Something went wrong, cant connect to DB!");
        }
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT}`)
    });
})
.catch((error) => {
    console.log("Server Connection Error!!");
    console.log(error);
})
