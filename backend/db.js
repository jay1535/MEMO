const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "swiftNote", // 🔒 FORCE DB
    });

    console.log("✅ CONNECTED TO DB:", conn.connection.name);
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
