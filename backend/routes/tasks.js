const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Task = require("../models/Task");
const { body, validationResult } = require("express-validator");

// Route 1: Get all tasks
router.get("/fetchtasks", fetchuser, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occurred");
  }
});

// Route 2: Add a task
router.post(
  "/addtask",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, reminderAt } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = new Task({
        title,
        description,
        reminderAt,
        user: req.user.id,
      });

      const savedTask = await task.save();
      res.json(savedTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occurred");
    }
  }
);

// Route 3: Update an existing task
router.put("/updatetask/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, reminderAt } = req.body;

    const newTask = {};
    if (title) newTask.title = title;
    if (description) newTask.description = description;
    if (reminderAt) newTask.reminderAt = reminderAt;

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not found");
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );

    res.json({ task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occurred");
  }
});

// Route 4: Delete task
router.delete("/deletetask/:id", fetchuser, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not found");
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    task = await Task.findByIdAndDelete(req.params.id);
    res.json({ Success: "Task has been deleted", task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occurred");
  }
});

module.exports = router;
