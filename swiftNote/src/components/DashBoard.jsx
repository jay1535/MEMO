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
      <h1 className="text-4xl font-bold text-primary drop-shadow-[0_4px_20px_rgba(140,0,255,0.25)] mb-3">
        Welcome to SwiftNotes
      </h1>

      <p className="text-muted-foreground text-center max-w-xl mb-10">
        Manage all your notes in one beautifully designed purple workspace.
        Create, edit, organize — your productivity starts here.
      </p>

      {/* Add Note Section */}
      <AddNote showAlert={showAlert} />

     
    </div>
  );
}

export default DashBoard;
