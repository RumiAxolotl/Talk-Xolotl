import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

const signup = async (UserData) => {
    try {
        const { username, email, password } = UserData;

        if (!username || !email || !password) {
            return {
                statusCode: 400,
                message: "Please provide all required fields",
            };
        }

        if (password.length < 6) {
            return {
                statusCode: 400,
                message: "Password must be at least 6 characters",
            };
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            return {
                statusCode: 400,
                message: "User already exists",
            };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return {
            statusCode: 201,
            message: "User signed up successfully",
            data: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        };
    }
    catch (error) {
        throw error;
    }
}
    
const signin = async (UserData) => {
    try {
        const { email, password } = UserData;
        if (!email || !password) {
            return {
                statusCode: 400,
                message: "Please provide all required fields",
            };
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return {
                statusCode: 400,
                message: "Invalid credentials",
            };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                statusCode: 400,
                message: "Invalid credentials",
            };
        }
        return {
            statusCode: 200,
            message: "User signed in successfully",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email, 
            },
        };
    }
    catch (error) {
        throw error;
    }
}

const updateProfile = async (UserData) => {
    try {
        const { avatar, userID } = UserData;

        if (!avatar) {
            return {
                statusCode: 400,
                message: "avatar is required",
            };
        }
        if (!userID) {
            return {
                statusCode: 401,
                message: "User not found",
            };
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userID, 
            { avatar: avatar }, 
            { new: true }
        );
        return {
            statusCode: 200,
            message: "Profile updated successfully",
            data: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
            },
        };
    } catch (error) {
        throw error;
    }
};

export default {
    signup,
    signin,
    updateProfile,
};