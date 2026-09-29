const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log("🔄 Connexion à MongoDB...");
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    
    console.log("✅ MongoDB connecté");
  } catch (error) {
    console.error("❌ Erreur MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;