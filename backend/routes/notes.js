const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

/* GET NOTES */
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id }).sort({
    isFavorite: -1,
    date: -1,
  });
  res.json(notes);
});

/* ADD NOTE */
router.post("/addnote", fetchuser, async (req, res) => {
  const { title, description, tag, color } = req.body;
  const note = new Notes({
    title,
    description,
    tag,
    color,
    user: req.user.id,
  });
  const saved = await note.save();
  res.json(saved);
});

/* UPDATE NOTE (COLOR INCLUDED) */
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json(note);
});

/* DELETE NOTE */
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  await Notes.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* TOGGLE FAVORITE */
router.put("/togglefavorite/:id", fetchuser, async (req, res) => {
  const note = await Notes.findById(req.params.id);
  note.isFavorite = !note.isFavorite;
  await note.save();
  res.json(note);
});

module.exports = router;
