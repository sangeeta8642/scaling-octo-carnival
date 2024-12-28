import e from "express";
import { singleUpload } from "../middlewares/singleUpload.js";
import {
  getAllDoctors,
  loginDoctor,
  registerDoctor,
} from "../controllers/doctor.controller.js";
import isAunthenticate from "../middlewares/isAuthenticate.js";

const router = e.Router();

router.route("/register").post(singleUpload, registerDoctor);
router.route("/login").post(loginDoctor);
router.route("/").get(isAunthenticate, getAllDoctors);
router.route("/:id").get(isAunthenticate, getAllDoctors);

export default router;
