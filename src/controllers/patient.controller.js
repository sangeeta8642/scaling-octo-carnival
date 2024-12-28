import { Patient } from "../models/patient.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerPatient = async (req, res) => {
  try {
    // console.log("req", req);

    const {
      name,
      age,
      email,
      password,
      phone,
      surgeryHistory,
      illnessHistory,
    } = req.body;

    if (
      !name ||
      !age ||
      !email ||
      !password ||
      !phone
    ) {
      return res
        .status(400)
        .json({ message: "please provide the complete data22", success: false });
    }

    const isEmailExists = await Patient.findOne({ email });
    const isMobNOExists = await Patient.findOne({ phone });

    if (isEmailExists) {
      return res.status(400).json({
        message: "this email already exists,please provide the new one",
        success: false,
      });
    }

    if (isMobNOExists) {
      return res.status(400).json({
        message: "this mobile number already exists,please provide the new one",
        success: false,
      });
    }

    const image = req.file;

    if (!image) {
      return res.status(400).json({
        message: "please provide the profile image",
        success: false,
      });
    }

    
    const imageUri = getDataUri(image);
    console.log(imageUri);
    const cloudRes = cloudinary.uploader.upload(imageUri);

    console.log("Could --- ", cloudRes);

    await Patient.create({
      name,
      age,
      email,
      password,
      phone,
      surgeryHistory,
      illnessHistory,
      profilePic: cloudRes || "",
    });

    return res
      .status(200)
      .json({ message: "patient created successfully", status: true });
  } catch (error) {
    res.status(500).json({
      message: "failed to create patient",
      error: error.message,
      success: false,
    });
  }
};

// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// export const registerPatient = async (req, res) => {
//   try {
//     const {
//       name,
//       age,
//       email,
//       password,
//       phone,
//       surgeryHistory,
//       illnessHistory,
//     } = req.body;

//     // Check for existing email or phone
//     const isEmailExists = await Patient.findOne({ email });
//     const isMobNOExists = await Patient.findOne({ phone });

//     if (isEmailExists) {
//       return res.status(400).json({
//         message: "This email already exists. Please provide a new one.",
//         success: false,
//       });
//     }

//     if (isMobNOExists) {
//       return res.status(400).json({
//         message: "This mobile number already exists. Please provide a new one.",
//         success: false,
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         message: "Please provide a profile image.",
//         success: false,
//       });
//     }

//     const imageUri = getDataUri(req.file.buffer);
//     const cloudRes = await cloudinary.uploader.upload(imageUri.content);

//     await Patient.create({
//       name,
//       age,
//       email,
//       password,
//       phone,
//       surgeryHistory,
//       illnessHistory,
//       profilePic: cloudRes.url, // store the image URL from Cloudinary
//     });

//     return res.status(200).json({ message: "Patient created successfully", success: true });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to create patient.",
//       error: error.message,
//       success: false,
//     });
//   }
// };
