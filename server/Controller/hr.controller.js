import { asyncHandler } from "../utils/asyncHandler.js";
import { customError } from "../utils/customError.js";
import { success } from "../utils/success.js";
import { Student } from "../Models/student.schema.js";

export const createStudent = asyncHandler(async(req,res,next)=>{
    const {name, course, phone , email} = req.body

    if (!name || !email || !phone || !course ) {
        throw new customError(400, "All fields are required");
    }

      // Check if user exists
    const user = await Student.findOne({ email, course });

    if (user) {
        throw new customError(400, "Student already enrolled in this course");
    }
    
        await Student.create({name , email ,course ,phone})
        
        success(res ,201 , "Student added Successfully")
})