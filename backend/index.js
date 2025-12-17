const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const taskRoutes = require("./routes/tasks");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// ✅ ALLOWED ORIGINS (LOCAL + PROD)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / Postman requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Optional: handle preflight explicitly
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
