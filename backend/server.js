const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Connexion à MongoDB =====
connectDB();

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== Routes =====
const jobsRouter = require("./routes/jobs");
app.use("/api/jobs", jobsRouter);

// ===== Route de test =====
app.get("/", (req, res) => {
  res.json({ message: "✅ JobFinder API is running" });
});

// ===== Démarrage =====
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});