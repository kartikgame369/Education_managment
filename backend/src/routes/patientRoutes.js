import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();


router.post("/", async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
});


router.get("/", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});


router.put("/:id", async (req, res) => {
  const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(updated);
});


router.delete("/:id", async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Patient deleted" });
});

export default router;
