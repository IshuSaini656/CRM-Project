import logger from "./logger.js"

export const errorHandler = (err,req,res,next)=>{
    if (res.headersSent) {
        return next(err)
    }

   err.statusCode = err.statusCode || 500
   err.message = err.message || "Internal server Error"

    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl
    });

   res.status(err.statusCode).json({status : "Fail",message:err.message})
}