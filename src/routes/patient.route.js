import express from "express";
import { registerPatient } from "../controllers/patient.controller.js";
import { singleUpload } from "../middlewares/singleUpload.js";

const router = express.Router();

router.route("/register").post(singleUpload, registerPatient);

export default router;
