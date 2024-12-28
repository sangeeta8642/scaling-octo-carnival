import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    currentIllNess: {
      type: String,
      required: true,
    },
    recentSurgery: {
      type: String,
      timespan: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    familyHistory: {
      isDiabetic: { type: Boolean, required: true },
      allergies: { type: String, default: "" },
      other: { type: String, default: "" },
    },
    payment: {
      qrCode: { type: String, required: true }, //URL of qrcode
      transitionId: { type: String, required: true },
    },
    profilePic: {
      type: String, //cloudinary url
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Consultation", consultationSchema);
