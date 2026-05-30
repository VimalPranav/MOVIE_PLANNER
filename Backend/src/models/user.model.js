import mongoose, { Schema } from "mongoose";

const userSchema = new Schema( // or mongoose.Schema
    {
        username: {
            type: String,
            required: true,
            unique: true     
        },

        password: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        isAdmin: {
            type: Boolean,
            default: false,
            required: true 
        },
        
    },

    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)
export default User;