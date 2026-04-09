import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const dbconnect = async () => {
    try {

        await mongoose.connect(process.env.DB_URL)
        logger.info("MongoDB connected successfully")

    } catch (error) {

        logger.error("MongoDB connection failed", error)

        // process.exit(1)   // stop server

    }
}