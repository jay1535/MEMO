const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const taskRoutes = require("./routes/tasks");

// Connect DB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// --------------------
// Middleware
// --------------------

// Parse JSON
app.use(express.json());

// Allowed Frontend Origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://swiftnotes-lilac.vercel.app",
];

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server or Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "auth-token"],
    credentials: true,
  })
);

// Handle preflight requests (VERY IMPORTANT)
app.options("*", cors());

// --------------------
// Routes
// --------------------

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tasks", taskRoutes);

// --------------------
// Start Server
// --------------------

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
