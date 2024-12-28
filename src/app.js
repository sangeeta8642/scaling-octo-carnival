import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import PatientRoute from "./routes/patient.route.js";
import DoctorRoute from "./routes/doctor.route.js";
import { sendResponse } from "./utils/apiResponse.js";

const app = e();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(e.json({ limit: "16kb" }));
app.use(e.urlencoded({ extended: true, limit: "16kb" }));
app.use(e.static("public"));
app.use(cookieParser());

app.get("/", (_, res) => {
  return res.json("Im running");
});

app.post("/api/v1/logout", async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return sendResponse(res, 200, "logout successfull", true);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
});

app.use("/api/v1/patient", PatientRoute);
app.use("/api/v1/doctor", DoctorRoute);

export { app };
