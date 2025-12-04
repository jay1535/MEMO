"use client";

import React from "react";

export default function Alert({ alert }) {
  if (!alert) return null;

  const typeStyles = {
    success: "bg-green-600/20 text-green-400 border-green-600/30",
    danger: "bg-red-600/20 text-red-400 border-red-600/30",
    warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    info: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  };

  const prefixEmoji = {
    success: "✅",
    danger: "⚠️",
    warning: "🔔",
    info: "ℹ️",
  };

  return (
    <div className="w-full flex justify-center mt-4 px-4">
      <div
        className={`
          w-full md:w-[600px]
          px-5 py-3 rounded-xl border 
          backdrop-blur-xl shadow-md
          transition-all duration-300 animate-slideDown
        
          ${typeStyles[alert.type] || typeStyles.info}
        `}
      >
        <strong className="mr-2">
          {prefixEmoji[alert.type] || "🔔"}
        </strong>

        {alert.msg}
      </div>
    </div>
  );
}
