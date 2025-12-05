"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        props.showAlert("Logged in Successfully 🎉", "success");
        navigate("/");
      } else {
        props.showAlert("⚠️ Invalid email or password.", "danger");
      }
    } catch {
      props.showAlert("⚠️ Something went wrong!", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0A0A0F]">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md 
          bg-[#12121A] 
          border border-purple-700/30 
          p-10 rounded-2xl
        "
      >
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.svg"
            alt="SwiftNote Logo"
            className="w-20 h-20"
          />

         <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl drop-shadow-[0_0_25px_rgba(140,0,255,0.35)]">

          

          {/* 🌈 BEAUTIFUL GRADIENT TEXT EFFECT */}
          <span
            className="
              bg-linear-to-r 
              from-purple-500 
              via-fuchsia-500 
              to-purple-600 
              bg-clip-text 
              text-transparent
              drop-shadow-[0_0_10px_rgba(140,0,255,0.4)]
            "
          >
            SwiftNotes
          </span>
        </h1>

          <p className="text-purple-200/70 text-lg mt-1">
            Fast. Simple. Smart Notes.
          </p>
        </div>

        {/* Form Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-white">
            Welcome Back
          </h2>
          <p className="text-purple-200/60 text-sm mt-1">
            Login to continue your journey.
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium text-purple-200">Email</label>
          <input
            type="email"
            name="email"
            required
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter your email"
            className="
              w-full mt-2 px-4 py-3 rounded-lg
              bg-[#1A1A22] text-white
              border border-purple-700/30 placeholder-purple-200/40
              focus:outline-none focus:ring-2 focus:ring-purple-600
            "
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font-medium text-purple-200">Password</label>
          <input
            type="password"
            name="password"
            required
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter your password"
            className="
              w-full mt-2 px-4 py-3 rounded-lg
              bg-[#1A1A22] text-white
              border border-purple-700/30 placeholder-purple-200/40
              focus:outline-none focus:ring-2 focus:ring-purple-600
            "
          />
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="
            w-full py-3 text-lg rounded-lg
            bg-purple-700 text-white 
            hover:bg-purple-800
            transition-colors
            flex items-center justify-center gap-2
          "
        >
          Login <LogIn className="w-5 h-5" />
        </Button>

        {/* Signup Link */}
        <p className="text-center text-purple-200/70 mt-5 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-300 cursor-pointer hover:underline"
          >
            Create one
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
