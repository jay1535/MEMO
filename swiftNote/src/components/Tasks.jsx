"use client";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import TaskContext from "../context/tasks/taskContext";

const Tasks = ({ showAlert }) => {
  const { tasks, getTasks, editTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    id: "",
    etitle: "",
    edescription: "",
    ereminderAt: "",
  });

  /* ================= AUTH + FETCH ================= */
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTasks();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const normalizedTasks = tasks
    .map((t) => ({ ...t, status: t.status ?? "pending" }))
    .sort((a, b) => (a.status === "pending" ? -1 : 1));

  /* ================= OPEN EDIT ================= */
  const updateTask = (currentTask) => {
    setTask({
      id: currentTask._id,
      etitle: currentTask.title,
      edescription: currentTask.description,
      ereminderAt: currentTask.reminderAt
        ? new Date(currentTask.reminderAt).toISOString().slice(0, 16)
        : "",
    });
    setOpen(true);
  };

  /* ================= SAVE EDIT ================= */
  const handleClick = async () => {
    await editTask(task.id, {
      title: task.etitle,
      description: task.edescription,
      reminderAt: task.ereminderAt
        ? new Date(task.ereminderAt).toISOString()
        : null,
    });

    setOpen(false);
    showAlert("Task updated successfully", "success");
  };

  const onChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-6 py-12 flex flex-col items-center">

      {/* ================= TITLE SECTION (SAME AS NOTES) ================= */}
      <h1
        className="
          text-5xl md:text-6xl font-extrabold mb-5 text-center text-primary
          drop-shadow-[0_0_30px_rgba(155,0,255,0.6)]
        "
      >
        Plan Your Tasks<br />Effortlessly & Clearly
      </h1>

      <p className="max-w-2xl text-center text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed">
        A beautifully designed space to plan, track, and complete your daily
        tasks — keeping you focused and productive.
      </p>

      {/* ================= TASKS SECTION ================= */}
     <div className="w-full max-w-6xl">
  <Card
    className="
      bg-card/70 backdrop-blur-xl
      border border-border
      rounded-3xl shadow-xl
    "
  >
    {/* ===== Header ===== */}
    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <CardTitle
        className="
          text-2xl font-semibold text-primary
          drop-shadow-[0_0_15px_rgba(155,0,255,0.45)]
        "
      >
        Your Tasks
      </CardTitle>

      {/* Progress Indicator */}
      <span className="text-sm text-muted-foreground">
        {normalizedTasks.filter(t => t.status === "completed").length} /{" "}
        {normalizedTasks.length} completed
      </span>
    </CardHeader>

    {/* ===== Content ===== */}
    <CardContent className="max-h-[65vh] overflow-y-auto custom-scroll space-y-5">
  {normalizedTasks.length === 0 ? (
    <div className="py-24 text-center">
      <h3
        className="
          text-2xl font-semibold
          bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600
          bg-clip-text text-transparent
        "
      >
        No tasks yet
      </h3>
      <p className="text-muted-foreground mt-4 max-w-md mx-auto">
        Start by adding your first task and take control of your day.
      </p>
    </div>
  ) : (
    normalizedTasks.map((t) => (
      <TaskItem
        key={t._id}
        task={t}
        updateTask={updateTask}
        showAlert={showAlert}
      />
    ))
  )}
</CardContent>

  </Card>
</div>


      {/* ================= EDIT TASK DIALOG ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            bg-card border border-border backdrop-blur-xl
            rounded-2xl shadow-xl
          "
        >
          <DialogHeader>
            <DialogTitle
              className="
                text-xl font-bold text-primary
                drop-shadow-[0_0_15px_rgba(155,0,255,0.45)]
              "
            >
              Edit Your Task
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div>
              <Label className="text-sm text-muted-foreground">Title</Label>
              <Input
                name="etitle"
                value={task.etitle}
                onChange={onChange}
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">
                Description
              </Label>
              <Input
                name="edescription"
                value={task.edescription}
                onChange={onChange}
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">
                Reminder
              </Label>
              <Input
                type="datetime-local"
                name="ereminderAt"
                value={task.ereminderAt}
                onChange={onChange}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleClick}
              disabled={!task.etitle || !task.edescription}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
