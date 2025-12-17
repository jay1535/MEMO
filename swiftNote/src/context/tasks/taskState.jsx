import React, { useState } from "react";
import TaskContext from "./taskContext";

const TaskState = ({ children }) => {
  const host = import.meta.env.VITE_BACKEND_URL;
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch tasks
  const getTasks = async () => {
    const res = await fetch(`${host}/api/tasks/fetchtasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  // ✅ Create task
  const createTask = async (title, description, reminderAt) => {
    const res = await fetch(`${host}/api/tasks/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, reminderAt }),
    });

    const data = await res.json();
    setTasks((prev) => [data, ...prev]);
  };

  // ✅ Delete task
  const removeTask = async (id) => {
    await fetch(`${host}/api/tasks/deletetask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  // ✅ Edit task (FORCED UI UPDATE)
  const editTask = async (id, updatedTask) => {
    await fetch(`${host}/api/tasks/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(updatedTask),
    });

    // 🔥 Update state locally (this is the key fix)
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, ...updatedTask } : task
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
