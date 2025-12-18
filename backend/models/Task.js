const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
    required: true,
  },

  reminderAt: {
    type: Date,
    default: null,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("tasks", TaskSchema);
