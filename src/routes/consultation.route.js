import e from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import {
  createConsultation,
  getConsultationById,
  getConsultationsOfDoctor,
  getConsultationsOfPatient,
} from "../controllers/consultation.controller.js";

const router = e.Router();

router.route("/").post(isAuthenticate, createConsultation);
router.route("/get/by/doctor").get(isAuthenticate, getConsultationsOfDoctor);
router.route("/get/by/patient").get(isAuthenticate, getConsultationsOfPatient);
router.route("/:id").get(isAuthenticate, getConsultationById);

export default router;
