require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("./models/Job");

const sampleJobs = [
  { title: "Développeur Full-Stack", company: "TechMaroc", city: "Casablanca", category: "IT", type: "CDI", description: "Nous recherchons un développeur full-stack passionné." },
  { title: "Stage Marketing Digital", company: "Atlas Agency", city: "Rabat", category: "Marketing", type: "Stage", description: "Stage de 6 mois en marketing digital." },
  { title: "Analyste Financier", company: "BanquePop", city: "Casablanca", category: "Finance", type: "CDI", description: "Analyse financière et reporting." },
  { title: "Développeur Frontend React", company: "StartupX", city: "Marrakech", category: "IT", type: "CDD", description: "Développement d'interfaces modernes avec React." },
  { title: "Chef de Projet IT", company: "DigitalCom", city: "Tanger", category: "IT", type: "CDI", description: "Gestion de projets IT et coordination d'équipe." },
  { title: "Stage Comptabilité", company: "FiduciairePlus", city: "Fès", category: "Finance", type: "Stage", description: "Stage en comptabilité générale." }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté");

    await Job.deleteMany({});
    console.log("🗑️  Jobs supprimés");

    const inserted = await Job.insertMany(sampleJobs);
    console.log(`✅ ${inserted.length} jobs ajoutés`);

    await mongoose.disconnect();
    console.log("👋 Déconnecté");
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    process.exit(1);
  }
}

seed();