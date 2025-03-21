import jwt from 'jsonwebtoken';
import UserModel from "../models/UserModel.js";
import { generateAccessToken } from '../lib/jwt.js';


export const verifyToken = async (req, res, next) => {
    try {
        const access_token = req.cookies.Access_Token;
        if (!access_token) {
            const verifiedRefreshToken = req.cookies.Refresh_Token;
            if (!verifiedRefreshToken) {
                return res.status(401).json({ message: "User not authenticated" });
            }   
            else { 
                const verifiedRefresh = jwt.verify(verifiedRefreshToken, process.env.REFRESH_TOKEN_SECRET);
                const user = await UserModel.findById(verifiedRefresh.id).select("-password");
                if (!user) {
                    return res.status(401).json({ message: "User not found" });
                }
                generateAccessToken(user._id, res);
                req.user = user;
                return next();
            }
        } else {
            const verifiedAccess = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
            const user = await UserModel.findById(verifiedAccess.id).select("-password");
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            req.user = user;
            return next();
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}