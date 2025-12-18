const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToMongo = require("./db");

// Routes
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const taskRoutes = require("./routes/tasks");

// Connect DB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "auth-token"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
