import { asyncHandler } from "../utils/asyncHandler.js";
import { customError } from "../utils/customError.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { Employee } from "../Models/employee.schema.js";

export const authCheck = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new customError(401, "Invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = verifyAccessToken(token);

        const user = await Employee.findById(decoded.id);

        if (!user) {
            throw new customError(404, "User not found");
        }

        req.user = user;

        next();

    } catch (err) {

        if (err.name === "TokenExpiredError") {
            throw new customError(401, "Access token expired");
        }

        throw new customError(401, "Invalid token");
    }
});