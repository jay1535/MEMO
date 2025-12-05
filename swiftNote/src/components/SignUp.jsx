"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("⚠️ Passwords do not match!", "danger");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/createuser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        props.showAlert("Account created Successfully! 🎉", "success");
        navigate("/");
      } else {
        props.showAlert("⚠️ Invalid details. Please try again.", "danger");
      }
    } catch (error) {
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

        {/* SAME LOGO + TITLE AS LOGIN */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.svg"
            alt="SwiftNote Logo"
            className="w-20 h-20"
          />

          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl drop-shadow-[0_0_25px_rgba(140,0,255,0.35)]">
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

        {/* Sign Up Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-white">
            Create Your Account
          </h2>
          <p className="text-purple-200/60 text-sm mt-1">
            Join SwiftNotes — save ideas, stay organized.
          </p>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm font-medium text-purple-200">Username</label>
          <input
            type="text"
            name="name"
            required
            value={credentials.name}
            onChange={onChange}
            placeholder="Enter your username"
            className="
              w-full mt-2 px-4 py-3 rounded-lg
              bg-[#1A1A22] text-white
              border border-purple-700/30 placeholder-purple-200/40
              focus:outline-none focus:ring-2 focus:ring-purple-600
            "
          />
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
        <div className="mb-4">
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

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-sm font-medium text-purple-200">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            required
            value={credentials.cpassword}
            onChange={onChange}
            placeholder="Confirm password"
            className="
              w-full mt-2 px-4 py-3 rounded-lg
              bg-[#1A1A22] text-white
              border border-purple-700/30 placeholder-purple-200/40
              focus:outline-none focus:ring-2 focus:ring-purple-600
            "
          />
        </div>

        {/* Sign Up Button */}
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
          Sign Up <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Login Redirect */}
        <p className="text-center text-purple-200/70 mt-5 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-300 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
