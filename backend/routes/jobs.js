const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// ===== GET /api/jobs — liste avec filtres =====
router.get("/", async (req, res) => {
  try {
    const { keyword, city, category } = req.query;
    let filter = {};

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ];
    }
    if (city) filter.city = city;
    if (category) filter.category = category;

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== GET /api/jobs/:id =====
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job non trouvé" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== POST /api/jobs =====
router.post("/", async (req, res) => {
  try {
    const { title, company, city, category, type, description } = req.body;

    if (!title || !company || !city || !category) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const newJob = new Job({ title, company, city, category, type, description });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;