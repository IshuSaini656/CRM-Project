import express from "express"
import { createUserController, getUserController ,uploadProfileImage } from "../Controller/admin.controller.js";
import upload from "../middleWares/multer.js";

const adminRoute =  express.Router()

adminRoute.post("/create-user", createUserController)
adminRoute.get("/userdata", getUserController)
adminRoute.patch("/profile-image", upload.single("image"), uploadProfileImage);

export default adminRoute;