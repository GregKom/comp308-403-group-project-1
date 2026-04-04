import mongoose from "mongoose";
import { User } from "../../models/User.js";

export const userResolvers = {
    Query: {
        users: async () => {
            return await User.find().toSorted({createdAt: -1})
        }
    },

    Mutation: {
        registerUser: async(_, args) =>
        {
            const newUser = new User({
                userID: new mongoose.Types.ObjectId().toString,
                ...args,
            });
            return newUser.save();
        },

        loginUser: async(_, args) =>
        {
            
        },

        logoutUser: async(_, args) =>
        {
          
        }
    }
}