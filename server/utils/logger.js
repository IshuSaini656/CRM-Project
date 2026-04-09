import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

const logger = winston.createLogger({
    level: "info",
    format: logFormat,
    transports: [

        new winston.transports.Console(),

        new DailyRotateFile({
            filename: "logs/combined.log",
            datePattern: "YYYY-MM-DD",
            maxFiles: "14d"
        }),

        new DailyRotateFile({
            filename: "logs/error.log",
            level: "error",
            datePattern: "YYYY-MM-DD",
            maxFiles: "30d"
        })

    ]
});

export default logger;