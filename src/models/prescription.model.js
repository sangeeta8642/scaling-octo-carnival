import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
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
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },
    careToBeTaken: {
      type: String,
      required: true,
    },
    Medicines: {
      type: String,
      required: true,
    },
    pdf: {
      type: String, //url of the pdf
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
