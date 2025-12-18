"use client";

import React, { useContext } from "react";
import {
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TaskContext from "../context/tasks/taskContext";

const TaskItem = ({ task, updateTask, showAlert }) => {
  const { removeTask, toggleTaskStatus } = useContext(TaskContext);
  const isCompleted = task.status === "completed";

  const formattedDate = task.date
    ? new Date(task.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div
      className={`
        relative group flex gap-6
        p-4 rounded-3xl border
        bg-card/70 backdrop-blur-xl
        transition-all duration-300
        ${
          isCompleted
            ? "opacity-70 border-border"
            : "hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(155,0,255,0.25)]"
        }
      `}
    >
      {/* STATUS ACCENT */}
      <span
        className={`
          absolute left-0 top-0 h-full w-1 rounded-l-3xl
          ${
            isCompleted
              ? "bg-green-500/60"
              : "bg-yellow-500/60"
          }
        `}
      />

      {/* CONTENT */}
      <div className="flex-1 min-w-0 pl-2">
        {/* TITLE */}
        <h3
          className={`text-lg font-semibold tracking-tight ${
            isCompleted
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {task.title}
        </h3>

        {/* DESCRIPTION (ON HOVER) */}
        {!isCompleted && task.description && (
          <p
            className="
              mt-2 text-sm text-muted-foreground leading-relaxed
              max-h-0 opacity-0 overflow-hidden
              group-hover:max-h-24 group-hover:opacity-100
              transition-all duration-300
            "
          >
            {task.description}
          </p>
        )}

        {/* META */}
        <div className="flex items-center gap-4 mt-4 text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            {formattedDate}
          </span>

          <span
            className={`
              px-3 py-1 rounded-full font-medium tracking-wide
              ${
                isCompleted
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }
            `}
          >
            {isCompleted ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2">
        {/* TOGGLE */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => toggleTaskStatus(task._id, task.status)}
          className={`
            transition-all
            ${
              isCompleted
                ? "border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                : "border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
            }
          `}
        >
          {isCompleted ? (
            <>
              <RotateCcw className="w-4 h-4 mr-1" />
              Undo
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Done
            </>
          )}
        </Button>

        {/* EDIT */}
        <Button
          size="sm"
          variant="outline"
          disabled={isCompleted}
          onClick={() => updateTask(task)}
          className={`
            border-primary text-primary
            ${
              isCompleted
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary hover:text-white"
            }
          `}
        >
          <Pencil className="w-4 h-4" />
        </Button>

        {/* DELETE */}
        <Button
          size="sm"
          variant="outline"
          disabled={isCompleted}
          onClick={() => {
            removeTask(task._id);
            showAlert("Task deleted", "success");
          }}
          className={`
            border-red-500 text-red-400
            ${
              isCompleted
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-red-600 hover:text-white"
            }
          `}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
