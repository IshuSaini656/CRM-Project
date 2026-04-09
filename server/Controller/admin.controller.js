import cloudinary from "../config/cloudinary.js";
import { Employee } from "../Models/employee.schema.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customError } from "../utils/customError.js";
import { success } from "../utils/success.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const createUserController = asyncHandler(async (req, res, next) => {
    const { name , email, phone, password, role } = req.body;

    // Check required fields
    if (!name || !email || !phone || !password || !role) {
        throw new customError(400, "All fields are required");
    }

    // Check if user exists
    const user = await Employee.findOne({ email });
    if (user) {
        throw new customError(400, "User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await Employee.create({
        name,
        email,
        phone,
        role,
        password: hashedPassword,
    });

    success(res, 201, "User created successfully")
    // res.status(201).json({ status: "Success", message: "User created successfully" });
});

export const getUserController = asyncHandler(async (req, res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: "fail",
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    const user = await Employee
        .findById(decoded.id)
        .select("name email phone role profile");   // sirf ye fields aayengi

    if (!user) {
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        });
    }

    success(res, 200, "User fetched successfully",user)

});

export const uploadProfileImage = asyncHandler(async (req, res,next) => {
    const result = await cloudinary.uploader.upload(req.file.path);

    const user = await Employee.findById(req.user.id);

    user.profile = result.secure_url; 

    await user.save();

    res.json({
        message: "Image uploaded",
        imageUrl: user.profile
    });
});

