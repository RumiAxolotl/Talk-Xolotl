import jwt from 'jsonwebtoken';


export const generateAccessToken = (id, res) => {
    
    const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
    });

    res.cookie("Access_Token", token, {
        maxAge: 1000 * 60 * 60 * 2,
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV !== "development" ? true : false
    });

    return token;

}

export const generateRefreshToken = (id, res) => {
    
    const token = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });

    res.cookie("Refresh_Token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV !== "development" ? true : false
    });

    return token;

}