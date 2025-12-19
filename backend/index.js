const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectToMongo = require("./db");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const taskRoutes = require("./routes/tasks");

// --------------------
// Connect to MongoDB
// --------------------
connectToMongo();
console.log("🧠 ACTIVE DB:", mongoose.connection.name);

// --------------------
// App Init
// --------------------
const app = express();
const port = process.env.PORT || 5000;

// --------------------
// Middleware
// --------------------

// Parse JSON
app.use(express.json());

// --------------------
// ✅ CORS CONFIG (FIXED)
// --------------------
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://swiftnotes-lilac.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "auth-token"],
  credentials: true,
};

// Apply CORS
app.use(cors(corsOptions));

// Explicitly handle preflight
app.options("*", cors(corsOptions));

// --------------------
// Routes
// --------------------
app.get("/", (req, res) => {
  res.send("🚀 SwiftNotes API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tasks", taskRoutes);

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// --------------------
// Start Server
// --------------------
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
