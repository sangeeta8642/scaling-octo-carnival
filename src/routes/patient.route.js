import e from "express";
import {
  getPatientById,
  loginPatient,
  registerPatient,
} from "../controllers/patient.controller.js";
import { singleUpload } from "../middlewares/singleUpload.js";
import isAuthenticate from "../middlewares/isAuthenticate.js";

const router = e.Router();

router.route("/register").post(singleUpload, registerPatient);
router.route("/login").post(loginPatient);
router.route("/:id").get(isAuthenticate, getPatientById);

export default router;
