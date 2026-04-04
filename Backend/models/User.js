import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userID: {type: String, requried: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
})

export const User = mongoose.model("User", userSchema);