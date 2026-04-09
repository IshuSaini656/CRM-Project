import mongoose from "mongoose"

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course : {
        type : String,
        required:true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10
    },
}, { timestamps : true})

export const Student = mongoose.model("student",studentSchema) 