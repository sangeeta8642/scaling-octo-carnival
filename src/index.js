import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import { PORT } from "./constants.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at ${PORT}\n`);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED !!!", err);
  });
