import dotenv from "dotenv"
dotenv.config()   // load environment variables from .env

import App from "./app.js"
import { dbconnect } from "./Database/dbconnect.js"
import logger from "./utils/logger.js"


const port = process.env.PORT || 5000

export const startServer = async () => {

    try {

        await dbconnect()

        App.listen(port, () => {
            logger.info(`Server running on port ${port}`)
        })

    } catch (error) {

        logger.error(error)
        process.exit(1)

    }

}