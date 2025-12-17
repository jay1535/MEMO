import React, { useState } from "react";
import TaskContext from "./taskContext";

const TaskState = ({ children }) => {
  const host = process.env.VITE_BACKEND_URL;
  const [tasks, setTasks] = useState([]);

  // Get all tasks
  const getTasks = async () => {
    const response = await fetch(`${host}/api/tasks/fetchtasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setTasks(json);
  };

  // Add a task
  const createTask = async (title, description, reminderAt) => {
    const response = await fetch(`${host}/api/tasks/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, reminderAt }),
    });

    const json = await response.json();
    setTasks([json, ...tasks]);
  };

  // Delete a task
  const removeTask = async (id) => {
    const response = await fetch(
      `${host}/api/tasks/deletetask/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const json = await response.json();
    console.log(json);

    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Edit a task
  const editTask = async (id, title, description, reminderAt) => {
    const response = await fetch(
      `${host}/api/tasks/updatetask/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, reminderAt }),
      }
    );

    const json = await response.json();
    console.log(json);

    const updatedTasks = tasks.map((task) =>
      task._id === id
        ? { ...task, title, description, reminderAt }
        : task
    );

    setTasks(updatedTasks);
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
