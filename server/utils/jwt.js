import jwt from "jsonwebtoken";


export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn:"15m" }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn:"15d" }
    );
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY)
    } catch {
        return null
    }
}