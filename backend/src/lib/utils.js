import jwt from 'jsonwebtoken';


export const generateToken = (id, res) => {
    
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "90d",
    });

    res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 90,
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV !== "development" ? true : false
    });

    return token;

}