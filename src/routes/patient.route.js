import e from "express";
import {
  loginPatient,
  registerPatient,
} from "../controllers/patient.controller.js";
import { singleUpload } from "../middlewares/singleUpload.js";

const router = e.Router();

router.route("/register").post(singleUpload, registerPatient);
router.route("/login").post(loginPatient);

export default router;
