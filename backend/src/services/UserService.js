import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";


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






export default {
    signup,
    signin,
};