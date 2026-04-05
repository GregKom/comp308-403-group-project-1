import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    //pretty sure mongo already gives an ID but I'll leave this commented for now
    //userID: {type: String, requried: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
}, {timestamps: true});

//password hashing
userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
})

export const User = mongoose.model("User", userSchema);