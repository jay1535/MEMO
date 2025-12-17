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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTasks();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

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

  const handleClick = async () => {
    await editTask(task.id, {
      title: task.etitle,
      description: task.edescription,
      reminderAt: task.ereminderAt
        ? new Date(task.ereminderAt).toISOString()
        : null,
    });

    setOpen(false);
    showAlert("Task updated successfully ✅", "success");
  };

  const onChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen w-full flex justify-center px-6 py-12 bg-gradient-to-br from-[#0f0f1a] via-[#121212] to-[#0a0a14]">

      {/* MAIN CARD */}
      <Card
        className="
          w-full max-w-[1400px]
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          rounded-3xl
          shadow-[0_0_40px_rgba(140,0,255,0.25)]
        "
      >
        <CardHeader className="pb-2">
          <CardTitle
            className="
              text-4xl md:text-5xl text-center font-extrabold
              bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600
              bg-clip-text text-transparent
              drop-shadow-[0_0_20px_rgba(140,0,255,0.5)]
            "
          >
            Your Task Command Center 🚀
          </CardTitle>

          <p className="text-center text-muted-foreground mt-3">
            Organize smarter. Focus deeper. Execute better.
          </p>
        </CardHeader>

        <CardContent className="h-[65vh] overflow-y-auto mt-6 pr-2 custom-scroll">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h3
                className="
                  text-2xl font-semibold
                  bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600
                  bg-clip-text text-transparent
                "
              >
                No tasks yet 🗒️
              </h3>
              <p className="text-muted-foreground mt-2">
                Create one and start building momentum.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {tasks.map((t) => (
                <TaskItem
                  key={t._id}
                  task={t}
                  updateTask={updateTask}
                  showAlert={showAlert}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* EDIT TASK DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            bg-white/10 backdrop-blur-2xl
            border border-white/15
            rounded-3xl
            shadow-[0_0_35px_rgba(140,0,255,0.35)]
          "
        >
          <DialogHeader>
            <DialogTitle
              className="
                text-xl font-bold
                bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600
                bg-clip-text text-transparent
              "
            >
              Edit Task ✨
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div>
              <Label className="text-sm text-muted-foreground">Title</Label>
              <Input
                name="etitle"
                value={task.etitle}
                onChange={onChange}
                className="mt-1 bg-black/30 border-white/10"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Description</Label>
              <Input
                name="edescription"
                value={task.edescription}
                onChange={onChange}
                className="mt-1 bg-black/30 border-white/10"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Reminder</Label>
              <Input
                type="datetime-local"
                name="ereminderAt"
                value={task.ereminderAt}
                onChange={onChange}
                className="mt-1 bg-black/30 border-white/10"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-primary text-primary hover:bg-primary/20"
            >
              Cancel
            </Button>

            <Button
              onClick={handleClick}
              className="
                bg-primary text-primary-foreground
                hover:bg-primary/80
                shadow-[0_0_15px_rgba(140,0,255,0.45)]
              "
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
