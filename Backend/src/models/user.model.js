import mongoose, { Schema } from "mongoose";

const userSchema = new Schema( // or mongoose.Schema
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLength: 30         
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 50
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        idAdmin: {
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