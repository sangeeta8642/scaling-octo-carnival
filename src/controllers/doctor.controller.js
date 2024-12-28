import { Doctor } from "../models/doctor.model.js";
import { sendResponse } from "../utils/apiResponse.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import jwt from "jsonwebtoken";

export const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, phone, speciality, experience } = req.body;

    if (!name || !email || !password || !phone || !speciality || !experience) {
      return sendResponse(res, 400, "please provide the complete data");
    }

    const isEmailExists = await Doctor.findOne({ email });
    const isMobNOExists = await Doctor.findOne({ phone });

    if (isEmailExists) {
      return sendResponse(res, 400, "This email already in use");
    }
    if (isMobNOExists) {
      return sendResponse(res, 400, "This mobile is already in use");
    }

    const file = req.file;
    if (!file) {
      return sendResponse(res, 400, "Please provide the profile image");
    }

    const fileUri = await getDataUri(file);
    const cloudRes = await cloudinary.uploader.upload(fileUri.content);

    let doctor = await Doctor.create({
      name,
      email,
      password,
      phone,
      speciality,
      experience,
      profilePic: cloudRes.secure_url,
    });

    return sendResponse(res, 201, "Doctor created successfully", true, doctor);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, "Please provide the complete data");
    }

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return sendResponse(res, 404, "No doctor found");
    }

    const isPasswordMatched = await doctor.matchPassword(password);

    if (!isPasswordMatched) {
      return sendResponse(res, 400, "Invalid password");
    }

    const token = jwt.sign({ doctorId: doctor._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    return sendResponse(res, 200, "login successfull", true);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    if (!doctors || !doctors.length > 0) {
      return sendResponse(res, 404, "No doctors found");
    }
    return sendResponse(res, 200, "", true, doctors);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, "Please provide the doctor id");
    }

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return sendResponse(res, 404, "No doctor found");
    }
    return sendResponse(res, 200, "", true, doctor);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
