import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: "error",
        message: "Too many login attempts. Try again after 15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false
});

export const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        status: "error",
        message: "Too many OTP attempts from this IP . try again after 10 minutes"
    }
});