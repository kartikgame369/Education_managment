import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import router from "./src/routes/patientRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/patients", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
