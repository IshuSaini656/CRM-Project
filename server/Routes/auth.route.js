import express from "express"
import { authController, checkOtpController, regenerateAccessToken, resendOtpController , logoutController } from "../Controller/auth.controller.js";
import { otpLimiter ,loginLimiter} from "../middleWares/loginLimit.js";
const authRoute = express.Router()

authRoute.post("/login",authController)
authRoute.post("/otp-verify",otpLimiter,checkOtpController)
authRoute.post("/otp-resend",otpLimiter,resendOtpController)
authRoute.post("/refresh",regenerateAccessToken)
authRoute.post("/logout",loginLimiter,logoutController)

export default authRoute;