import UserService from '../services/UserService.js';
import { generateAccessToken, generateRefreshToken } from '../lib/jwt.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const signup = await UserService.signup({ username, email, password });
        if (signup.data) {
            generateAccessToken(signup.data._id, res);
            generateRefreshToken(signup.data._id, res);
            res.status(201).json(signup.data);

        }
        else {
            res.status(signup.statusCode).json({ message: signup.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }

    

}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const signin = await UserService.signin({ email, password });

        if (signin.data) {
            generateAccessToken(signin.data._id, res);
            generateRefreshToken(signin.data._id, res);

            res.status(200).json(signin.data);
        }
        else {
            res.status(signin.statusCode).json({ message: signin.message });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
}

export const signout = (req, res) => {

    try {
        res.clearCookie("Access_Token");
        res.clearCookie("Refresh_Token");
        res.status(200).json({ message: "User signed out successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
}

/**
 * Updates the user's profile by uploading a new avatar image to Cloudinary
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user information
 * @param {Object} req.file - Uploaded file information
 * @param {Buffer} req.file.buffer - File buffer data
 * @param {string} req.file.mimetype - MIME type of the uploaded file
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated user data or error message
 * @throws {Error} If there's an issue with file upload or database update
 */
export const updateProfile = async (req, res) => {
    try {
        const user = req.user;
        
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        // Convert buffer to base64 for Cloudinary
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        
        // Upload the file to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'avatars',
        });

        // Update the user's profile with the new avatar URL
        const update = await UserService.updateProfile({ 
            avatar: uploadResponse.secure_url, 
            userID: user._id 
        });
        
        if (update.data) {
            res.status(200).json(update.data);
        } else {
            res.status(update.statusCode).json({ message: update.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
}

