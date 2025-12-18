const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  tag: {
    type: String,
    default: "general",
  },

  // ⭐ Pin / Favorite
  isFavorite: {
    type: Boolean,
    default: false,
  },

  // 🎨 Color
  color: {
    type: String,
    default: "#0A030A",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
