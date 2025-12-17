"use client";

import React from "react";
import { ArrowLeft, NotepadText, NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-center bg-background text-foreground px-6 relative">

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon Icon={NotepadText} delay="0s" left="20%" />
        <FloatingIcon Icon={NotebookPen} delay="2s" left="60%" />
        <FloatingIcon Icon={NotepadText} delay="4s" left="80%" />
      </div>

      <h1
  className="
    text-[120px] md:text-[200px] lg:text-[260px] 
    font-extrabold leading-none
    bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-700
    bg-clip-text text-transparent
    drop-shadow-[0_0_35px_rgba(140,0,255,0.55)]
    animate-pulse
  "
>
 

        404
      </h1>

      <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl">
        Oops! The page you're looking for has vanished from your notes...
      </p>

      {/* Glow Progress Bar */}
      <div className="mt-6 w-64 h-2 rounded-full bg-primary/20 overflow-hidden shadow-[0_0_25px_rgba(140,0,255,0.5)]">
        <div className="h-full w-full bg-linear-to-r from-primary via-fuchsia-500 to-primary animate-progress"></div>
      </div>

      {/* Back Button */}
      <Link
        to="/"
        className="
          mt-10 px-6 py-3 rounded-full text-lg font-semibold
          bg-linear-to-r from-purple-600 via-fuchsia-500 to-purple-700 
          text-white shadow-[0_0_15px_rgba(140,0,255,0.5)]
          hover:scale-105 hover:shadow-[0_0_25px_rgba(140,0,255,0.7)]
          transition-all duration-300 flex items-center gap-2
        "
      >
        <ArrowLeft size={20} /> Go Back Home
      </Link>
    </div>
  );
}

/* Floating Icons Animation */
function FloatingIcon({ Icon, delay, left }) {
  return (
    <Icon
      className="
        absolute top-full opacity-[0.25] text-primary 
        w-14 h-14 animate-floating
      "
      style={{
        animationDelay: delay,
        left: left,
      }}
    />
  );
}
