import React from "react";
import AddNote from "./AddNote";

function DashBoard({ showAlert }) {
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
        Think. Create. Stay Organized.
      </h1>

      <p className="text-muted-foreground text-center max-w-2xl mb-12 text-lg md:text-xl leading-relaxed">
        SwiftNotes gives you a clean and focused space to capture your ideas. 
        Add new notes, update them anytime, and keep everything organized effortlessly.
      </p>

      {/* Add Note Section */}
      <AddNote showAlert={showAlert} />
    </div>
  );
}

export default DashBoard;
