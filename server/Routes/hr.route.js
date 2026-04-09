import express from "express"
import { createStudent } from "../Controller/hr.controller.js";

const hrRoute =  express.Router()

hrRoute.post("/create-student",createStudent)

export default hrRoute;