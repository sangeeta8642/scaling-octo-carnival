import mongoose from "mongoose";
import bcrypt from "bcrypt";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    surgeryHistory: {
      type: [String],
      default: [],
    },
    illnessHistory: {
      type: [String],
      default: [],
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

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

patientSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Patient = mongoose.model("Patient", patientSchema);
// module.exports = Patient;