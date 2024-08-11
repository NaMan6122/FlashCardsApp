import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    refreshToken : String,
});

userModel.pre("save", async function(){
    if(this.isModified(password)){
        try {
            const hashedPass = await bcrypt.hash(this.password, 10);
            this.password = hashedPass;
        } catch (error) {
            console.log(`Error Hashing Password: ${error}`);
        }
    }
});

userModel.methods.isPasswordCorrect = async function(password){
    //console.log(password, this.password);
    const res = await bcrypt.compare(password, this.password);
    return res;
}

userModel.methods.generateRefreshToken = async function() {
    const token = jwt.sign({
        _id: this._id.toString(),
    },
    process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
    //console.log(`refreshToken: ${token}`);
    return token;
};

userModel.methods.generateAccessToken = async function(){
    const token = jwt.sign({
        _id: this._id.toString(),
        username: this.username,
        email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    //console.log(`accessToken: ${token}`);
    return token;
};

export const User = mongoose.model("User", userModel);