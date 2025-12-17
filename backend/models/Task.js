const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
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

  tag: {
    type: String,
    default: "general",
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
