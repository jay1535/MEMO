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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTasks();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [task, setTask] = useState({
    id: "",
    etitle: "",
    edescription: "",
    ereminderAt: "",
  });

  /* Open Edit Dialog */
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

  /* Save Changes */
  const handleClick = async () => {
    await editTask(task.id, {
      title: task.etitle,
      description: task.edescription,
      reminderAt: task.ereminderAt || null,
    });

    setOpen(false);
    showAlert("Task updated successfully ✅", "success");
  };

  const onChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start px-6 py-12">

      {/* Outer Tasks Card */}
      <Card
        className="
          w-full max-w-[1400px] 
          bg-card/60 border border-border 
          backdrop-blur-xl rounded-3xl 
          shadow-[0_0_35px_rgba(140,0,255,0.25)]
          transition-all duration-300
        "
      >

        {/* Heading */}
        <CardHeader>
          <CardTitle
            className="
              text-4xl font-bold text-center
              drop-shadow-[0_0_20px_rgba(140,0,255,0.55)]
              bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600 
              bg-clip-text text-transparent
            "
          >
            Your Task Command Center 🚀
          </CardTitle>

          <p className="text-center text-muted-foreground mt-3">
            Stay focused, hit deadlines, and turn plans into progress.
          </p>
        </CardHeader>

        {/* Tasks Grid */}
        <CardContent className="h-[65vh] overflow-y-auto pr-3 custom-scroll mt-2">

          {tasks.length === 0 ? (
            <div className="w-full text-center py-20">
              <h3
                className="
                  text-2xl font-semibold 
                  bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600 
                  bg-clip-text text-transparent
                  drop-shadow-[0_0_10px_rgba(140,0,255,0.4)]
                "
              >
                No Tasks Yet 🗒️
              </h3>

              <p className="mt-2 text-muted-foreground text-base">
                Create your first task and start making progress —  
                <span className="text-primary font-medium">
                  success loves planning.
                </span>
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
            bg-card/80 border border-border text-card-foreground
            backdrop-blur-2xl rounded-3xl shadow-2xl
            transition-all duration-500
          "
        >
          <DialogHeader>
            <DialogTitle
              className="
                text-xl font-bold
                bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600 
                bg-clip-text text-transparent
                drop-shadow-[0_0_10px_rgba(140,0,255,0.4)]
              "
            >
              Edit Your Task 🛠️
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">

            {/* Title */}
            <div>
              <Label className="text-sm">Title</Label>
              <Input
                type="text"
                name="etitle"
                value={task.etitle}
                onChange={onChange}
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm">Description</Label>
              <Input
                type="text"
                name="edescription"
                value={task.edescription}
                onChange={onChange}
              />
            </div>

            {/* Reminder */}
            <div>
              <Label className="text-sm">Reminder</Label>
              <Input
                type="datetime-local"
                name="ereminderAt"
                value={task.ereminderAt}
                onChange={onChange}
              />
            </div>

          </div>

          <DialogFooter className="flex justify-between mt-3">

            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="
                border-primary text-primary 
                hover:bg-primary/20
              "
            >
              Cancel
            </Button>

            <Button
              onClick={handleClick}
              disabled={!task.etitle || !task.edescription}
              className="
                bg-primary text-primary-foreground 
                hover:bg-primary/80 
                shadow-[0_0_10px_rgba(140,0,255,0.5)]
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
