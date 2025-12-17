"use client";

import React, { useContext, useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ListTodo, PlusCircle } from "lucide-react";
import TaskContext from "../context/tasks/taskContext";


const AddTask = ({ showAlert }) => {
  const { createTask } = useContext(TaskContext);

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    reminderAt: "",
  });

  const onChange = (e) => {
    setTask({ ...task, [e.target.id]: e.target.value });
  };

  const handleAdd = async () => {
    if (!task.title || !task.description) return;

    // ✅ IMPORTANT FIX: pass individual values
    await createTask(
      task.title,
      task.description,
      task.reminderAt
    );

    showAlert("Task added successfully ✅", "success");

    setTask({
      title: "",
      description: "",
      reminderAt: "",
    });
    setOpen(false);
  };

  return (
    <div className="my-6 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-purple-400 mb-1">
        Plan Your Next Move
      </h2>
      <p className="text-sm text-gray-400 mb-4 text-center max-w-md">
        Turn ideas into actions and stay one step ahead.
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Trigger */}
        <DialogTrigger asChild>
          <button
            type="button"
            className="
              w-64 h-32 border-2 border-dashed border-purple-400 
              rounded-xl text-purple-400
              flex flex-col items-center justify-center
              hover:bg-purple-400/10 transition
            "
          >
            <ListTodo className="w-8 h-8 mb-1" />
            <span className="text-sm font-medium">Add Task</span>
          </button>
        </DialogTrigger>

        {/* Modal */}
        <DialogContent className="bg-[#010102] text-white rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl text-purple-400 flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Create New Task
            </DialogTitle>

            <DialogDescription className="text-sm text-gray-400">
              Add a task with details and optional reminders to stay organized.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="title" className="text-purple-200">
                Task Title
              </Label>
              <Input
                id="title"
                value={task.title}
                onChange={onChange}
                placeholder="e.g. Finish assignment"
                className="bg-[#1d1d1d] border-none"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="description" className="text-purple-200">
                Description
              </Label>
              <Input
                id="description"
                value={task.description}
                onChange={onChange}
                placeholder="Add task details"
                className="bg-[#1d1d1d] border-none"
              />
            </div>

            {/* Reminder */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="reminderAt" className="text-purple-200">
                Reminder (optional)
              </Label>
              <Input
                id="reminderAt"
                type="datetime-local"
                value={task.reminderAt}
                onChange={onChange}
                className="bg-[#1d1d1d] border-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleAdd}
              disabled={!task.title || !task.description}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Small steps today lead to big wins tomorrow 🚀
      </p>
    </div>
  );
};

export default AddTask;
