import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

const registerUser = asyncHandler (async(req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are important!"})
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
        return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    // create user

    const user = await User.create({
        username,
        email: email.toLowerCase(),
        password,
    });

    res.status(201).json({
        message: "User registered!",
        user: { id: user._id, email: user.email, username: user.username }
    });

});

const loginUser = async (req, res) => {
    try {
        
        // checking if the user already exists
        const { email, password } = req.body;
       
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
             message: "User not found"
        });

       
        // compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"

        })

        res.status(200).json({
            message: "User Logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username 
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const logoutuser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User not found"
        });
         
        res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }
}
export {
    registerUser,
    loginUser,
    logoutuser
};