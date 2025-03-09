import UserService from '../services/UserService.js';
import { generateToken } from '../lib/utils.js';



export const signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const signup = await UserService.signup({ username, email, password });
        console.log(signup);
        if (signup.data) {
            generateToken(signup.data._id, res);
            res.status(201).json(signup.data);

        }
        else {
            throw new Error(signup.message);
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
        console.log(signin);
        if (signin.data) {
            generateToken(signin.data._id, res);
            res.status(200).json(signin.data);
        }
        else {
            throw new Error(signin.message);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
}

export const signout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User signed out successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
}
