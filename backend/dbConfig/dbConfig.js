import mongoose from "mongoose";

const DB_NAME = "flashCardApp";
const connectDB = async function(){
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MongoDB Connected Sucessfully!! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error, error.message);
        process.exit(1);
    }
}

export default connectDB;