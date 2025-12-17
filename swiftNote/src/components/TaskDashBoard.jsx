"use client";

import React from "react";
import AddTask from "./AddTask";

function TaskDashboard({ showAlert }) {
  return (
    <div
      className="
        min-h-screen 
        w-full 
        bg-background 
        text-foreground 
        px-6 py-10 
        flex flex-col items-center
      "
    >
      {/* Dashboard Title */}
      <h1
        className="
          text-5xl md:text-6xl font-extrabold text-primary 
          drop-shadow-[0_0_28px_rgba(155,0,255,0.55)]
          mb-5 text-center
        "
      >
        Plan Smart. Execute Better.
      </h1>

      <p className="text-muted-foreground text-center max-w-2xl mb-12 text-lg md:text-xl leading-relaxed">
        Turn your ideas into actions with SwiftTasks.  
        Create tasks, set reminders, and stay focused on what truly matters.
      </p>

      {/* Add Task Section */}
      <AddTask showAlert={showAlert} />
    </div>
  );
}

export default TaskDashboard;
