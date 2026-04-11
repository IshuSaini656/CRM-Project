import { Employee } from "../Models/employee.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customError } from "../utils/customError.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../Services/email.service.js";
import { otpTemplate } from "../Templates/otp.template.js";
import { success } from "../utils/success.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import logger from "../utils/logger.js";

export const authController = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new customError(400, "All fields are required")
    }

    const user = await Employee.findOne({ email })

    if (!user) {
        throw new customError(404, "User not Found")
    }

    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword)

    if (!isMatch) {
        logger.warn(`Invalid password attempt for ${email}`)
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    if (user.isVerified) {

        logger.info(`User login successful: ${email}`)

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        }

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
        user.refreshToken = hashedRefreshToken
        await user.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return success(res, 200, "Login Successful", {
            accessToken,
            isVerified: user.isVerified
        })
    }

    const OTP = Math.floor(100000 + Math.random() * 900000)

   try {
    await sendEmail(user.email, "OTP", otpTemplate(OTP))
} catch (err) {
    logger.error(err)
    throw new customError(500, "Failed to send OTP. Try again")
}

    user.otp = await bcrypt.hash(String(OTP), 10)
    user.otpExpiry = Date.now() + 60 * 1000
    user.otpSentAt = Date.now()

    await user.save()

    success(res, 200, "Otp has been sent successfully check email", {
        isVerified: user.isVerified
    })

})


export const checkOtpController = asyncHandler(async (req, res, next) => {

    const { otp, email } = req.body

    const user = await Employee.findOne({ email })

    if (!user) {
        throw new customError(404, "User not found")
    }

    if (user.otpBlockedUntil && Date.now() < user.otpBlockedUntil) {
        logger.warn(`Blocked user tried OTP verify: ${email}`)
        throw new customError(403, "Account temporarily blocked. Try again later")
    }

    if (!user.otpExpiry || Date.now() > user.otpExpiry) {
        throw new customError(400, "OTP expired")
    }

    const isOtpValid = await bcrypt.compare(String(otp), user.otp)

    if (isOtpValid) {

        logger.info(`User verified successfully via OTP: ${email}`)

        user.isVerified = true
        user.otp = null
        user.otpExpiry = null
        user.otpSentAt = null
        user.wrongOtpAttempts = 0
        user.otpBlockedUntil = null

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        }

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
        user.refreshToken = hashedRefreshToken

        await user.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return success(res, 200, "Login Successful", {
            accessToken
        })
    }

    user.wrongOtpAttempts = (user.wrongOtpAttempts || 0) + 1

    logger.warn(`Invalid OTP attempt for ${email}`)

    if (user.wrongOtpAttempts >= 5) {

        logger.warn(`User blocked due to multiple wrong OTP attempts: ${email}`)

        user.otpBlockedUntil = Date.now() + 24 * 60 * 60 * 1000
        await user.save()
        throw new customError(403, "Too many wrong OTP attempts. Account blocked for 1 day")
    }

    await user.save()

    throw new customError(400, "Invalid OTP")

})


export const resendOtpController = asyncHandler(async (req, res, next) => {

    const { email } = req.body;

    const user = await Employee.findOne({ email })

    if (!user) {
        throw new customError(404, "User not found")
    }

    if (user.isVerified) {
        throw new customError(400, "User already verified")
    }

    if (user.otpBlockedUntil > Date.now()) {
        logger.warn(`Blocked user tried OTP resend: ${email}`)
        throw new customError(403, "Account Blocked for 24 hours")
    }

    if (user.otpSentAt && Date.now() - user.otpSentAt < 60 * 1000) {
        throw new customError(400, "Please wait 1 minute before requesting a new OTP")
    }

    const OTP = Math.floor(100000 + Math.random() * 900000)

    await sendEmail(user.email, "OTP", otpTemplate(OTP))

    logger.info(`OTP resent to ${email}`)

    user.otp = await bcrypt.hash(String(OTP), 10)
    user.otpExpiry = Date.now() + 60 * 1000
    user.otpSentAt = Date.now()

    await user.save()

    success(res, 200, "Otp has been sent successfully check email")
})


export const regenerateAccessToken = asyncHandler(async (req, res, next) => {

    const { refreshToken } = req.cookies

    if (!refreshToken) {
        throw new customError(400, "Refresh token not found")
    }
    
    const decoded = verifyRefreshToken(refreshToken)

    if (!decoded) {
        throw new customError(403, "Refresh Token Expired")
    }

    const user = await Employee.findById(decoded.id)

    if (!user || !user.refreshToken) {
        throw new customError(403, "Invalid refresh token")
    }

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken)

    if (!isTokenValid) {
        logger.warn(`Refresh token mismatch for user id: ${decoded.id}`)

        user.refreshToken = null
        await user.save()
        throw new customError(403, "Refresh token mismatch")
    }

    logger.info(`Access token regenerated for ${user.email}`)

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    const newAccessToken = generateAccessToken(payload)
    const newRefreshToken = generateRefreshToken(payload)

    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10)


    user.refreshToken = hashedRefreshToken
    await user.save()

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    success(res, 200, "New tokens generated", {
        accessToken: newAccessToken
    })

})


export const logoutController = asyncHandler(async (req, res, next) => {

    const { refreshToken } = req.cookies

    if (refreshToken) {

        const decoded = verifyRefreshToken(refreshToken)

        if (decoded) {
            const user = await Employee.findById(decoded.id)

            if (user) {
                user.refreshToken = null
                user.isVerified = false
                await user.save()

                logger.info(`User logged out: ${user.email}`)
            }
        }
    }

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    return res.status(200).json({
        message: "Logout successful"
    })
})
