const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Task = require("../models/Task");

/* GET TASKS */
router.get("/fetchtasks", fetchuser, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
    res.json(tasks);
  } catch {
    res.status(500).send("Server Error");
  }
});

/* ADD TASK */
router.post("/addtask", fetchuser, async (req, res) => {
  try {
    const { title, description, reminderAt } = req.body;

    const task = new Task({
      title,
      description,
      reminderAt: reminderAt || null,
      user: req.user.id,
      status: "pending",
    });

    const saved = await task.save();
    res.json(saved);
  } catch {
    res.status(500).send("Server Error");
  }
});

/* UPDATE TASK */
router.put("/updatetask/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, reminderAt, status } = req.body;

    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (reminderAt !== undefined) update.reminderAt = reminderAt;
    if (status !== undefined) update.status = status;

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).send("Server Error");
  }
});

/* DELETE TASK */
router.delete("/deletetask/:id", fetchuser, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
