import express from "express"

import cors from "cors"
import { requestLogger } from "./middleWares/request.logger.js"
import { loginLimiter } from "./middleWares/loginLimit.js"  // rate limiter
import { authCheck } from "./middleWares/auth.check.js"  // authentication middleware
import cookieParser from "cookie-parser"
import helmet from "helmet"
import compression from "compression"

import hrRoute from "./Routes/hr.route.js"
import adminRoutes from "./Routes/admin.route.js"
import authRoute from "./Routes/auth.route.js"
import { errorHandler } from "./utils/globalError.js"

const App = express();

App.set("trust proxy", 1)

// ---------------- MIDDLEWARES ----------------

App.use(helmet())
App.use(compression())
// CORS configuration (allow frontend requests)
App.use(cors({
    origin: process.env.DOMAIN,
    credentials: true
}))

// Parse JSON request body
App.use(express.json())

// Parse cookies from request
App.use(cookieParser())

// Rate limiter to prevent brute force attacks
App.use(loginLimiter)

// Request logger middleware (logs every request)
App.use(requestLogger)


// ---------------- PUBLIC ROUTES ----------------

// authentication routes (login, otp, refresh etc.)
App.use("/api", authRoute)


// ---------------- PROTECTED ROUTES ----------------

// all routes after this middleware require authentication
App.use(authCheck)

App.use("/api/admin", adminRoutes)
App.use("/api/hr", hrRoute)


// ---------------- ERROR HANDLER ----------------

// global error handling middleware
App.use(errorHandler)

export default App
