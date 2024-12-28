import { sendResponse } from "../utils/apiResponse.js";
import { Consultation } from "../models/consultation.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";

export const createConsultation = async (req, res) => {
  try {
    const {
      doctorId,
      patientId,
      illness,
      recentSurgeryName,
      recentSurgeryTimespan,
      isDiabetic,
      qrCode,
      transitionId,
      allergies,
      other,
    } = req.body;

    if (
      !doctorId ||
      !patientId ||
      !illness ||
      !recentSurgeryName ||
      !recentSurgeryTimespan ||
      !isDiabetic ||
      !qrCode ||
      !transitionId
    ) {
      return sendResponse(res, 400, "Please provide complete data");
    }

    let consultation = await Consultation.create({
      doctorId,
      patientId,
      currentIllNess: illness,
      recentSurgery: {
        name: recentSurgeryName,
        timespan: recentSurgeryTimespan,
      },
      familyHistory: {
        isDiabetic,
        allergies,
        other,
      },
      payment: {
        qrCode,
        transitionId,
      },
    });

    return sendResponse(
      res,
      201,
      "consultation created !!",
      true,
      consultation
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getConsultationsOfDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    if (!doctorId) {
      return sendResponse(res, 400, "Please provide the doctorId");
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return sendResponse(res, 404, "No doctor found");
    }

    const consultations = await Consultation.find({ doctorId });
    if (!consultations || !consultations.length > 0) {
      return sendResponse(res, 404, "This doctor has no consultations");
    }
    return sendResponse(res, 200, "", true, consultations);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
export const getConsultationsOfPatient = async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return sendResponse(res, 400, "Please provide the patientId");
    }

    const doctor = await Patient.findById(patientId);

    if (!doctor) {
      return sendResponse(res, 404, "No doctor found");
    }

    const consultations = await Consultation.find({ patientId });
    if (!consultations || !consultations.length > 0) {
      return sendResponse(res, 404, "This doctor has no consultations");
    }
    return sendResponse(res, 200, "", true, consultations);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
export const getConsultationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, "Please provide the consultation id");
    }
    const consultation = await Consultation.findById(id);
    if (!consultation) {
      return sendResponse(res, 404, "No consultation found");
    }
    return sendResponse(res, 200, "", true, consultation);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
