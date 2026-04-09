import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        minlength: 10
    },
    role: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otpSentAt: {
        type: Date,
        default: null
    },
    wrongOtpAttempts: {
        type: Number,
        default: 0
    },
    otpBlockedUntil: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        default: null
    },
    profile:{
        type:String
    }
}, { timestamps: true })

export const Employee = mongoose.model("Employee", employeeSchema)