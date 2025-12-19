const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

/* =========================
   GET ALL NOTES
========================= */
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id }).sort({
      isFavorite: -1,
      date: -1,
    });

    res.json(notes);
  } catch (error) {
    console.error("🔥 FETCH NOTES ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* =========================
   ADD NOTE
========================= */
router.post("/addnote", fetchuser, async (req, res) => {
  try {
    const { title, description, tag, color } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "Title and description are required",
      });
    }

    const note = new Notes({
      title,
      description,
      tag: tag || "General",
      color: color || "#0F172A",
      user: req.user.id,
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error("🔥 ADD NOTE ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* =========================
   UPDATE NOTE
========================= */
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag, color } = req.body;

    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    if (color) newNote.color = color;

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // 🔐 Ownership check
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not allowed" });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error("🔥 UPDATE NOTE ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* =========================
   DELETE NOTE
========================= */
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // 🔐 Ownership check
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not allowed" });
    }

    await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("🔥 DELETE NOTE ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* =========================
   TOGGLE FAVORITE
========================= */
router.put("/togglefavorite/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // 🔐 Ownership check
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not allowed" });
    }

    note.isFavorite = !note.isFavorite;
    await note.save();

    res.json(note);
  } catch (error) {
    console.error("🔥 TOGGLE FAVORITE ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
