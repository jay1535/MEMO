import React, { useState } from "react";
import TaskContext from "./taskContext";

const TaskState = ({ children }) => {
  const host = import.meta.env.VITE_BACKEND_URL;
  const [tasks, setTasks] = useState([]);

  /* ================= GET TASKS ================= */
  const getTasks = async () => {
    const res = await fetch(`${host}/api/tasks/fetchtasks`, {
      headers: { "auth-token": localStorage.getItem("token") },
    });

    const data = await res.json();
    setTasks(data);
  };

  /* ================= CREATE TASK ================= */
  const createTask = async (title, description, reminderAt) => {
    const res = await fetch(`${host}/api/tasks/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, reminderAt }),
    });

    const newTask = await res.json(); // ✅ await OUTSIDE
    setTasks((prev) => [newTask, ...prev]);
  };

  /* ================= TOGGLE STATUS ================= */
  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "completed" ? "pending" : "completed";

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, status: newStatus } : t
      )
    );

    await fetch(`${host}/api/tasks/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  /* ================= DELETE TASK ================= */
  const removeTask = async (id) => {
    await fetch(`${host}/api/tasks/deletetask/${id}`, {
      method: "DELETE",
      headers: { "auth-token": localStorage.getItem("token") },
    });

    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  /* ================= EDIT TASK ================= */
  const editTask = async (id, updatedTask) => {
    const res = await fetch(`${host}/api/tasks/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(updatedTask),
    });

    const updated = await res.json();

    setTasks((prev) =>
      prev.map((t) =>
        t._id === updated._id ? { ...t, ...updated } : t
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        removeTask,
        editTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
