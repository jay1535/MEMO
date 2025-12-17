"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SignUp = ({ showAlert }) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SIGNUP CLICKED"); // ✅ debug

    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      showAlert("⚠️ Passwords do not match!", "danger");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const json = await response.json();
      console.log("SIGNUP RESPONSE:", json);

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        showAlert("Account created successfully 🎉", "success");
        navigate("/");
      } else {
        showAlert(json.error || "Invalid details", "danger");
      }
    } catch (error) {
      console.error(error);
      showAlert("⚠️ Server error. Try again later.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0A0A0F]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#12121A] border border-purple-700/30 p-10 rounded-2xl"
      >
        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.svg" alt="SwiftNotes" className="w-20 h-20 mb-2" />

          <h1 className="text-5xl font-bold bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
            SwiftNotes
          </h1>

          <p className="text-purple-200/70 text-lg mt-1">
            Fast. Simple. Smart Notes.
          </p>
        </div>

        {/* HEADING */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-white">
            Create Your Account
          </h2>
          <p className="text-purple-200/60 text-sm mt-1">
            Join SwiftNotes — stay organized.
          </p>
        </div>

        {/* USERNAME */}
        <div className="mb-4">
          <label className="text-purple-200 text-sm">Username</label>
          <input
            type="text"
            name="name"
            required
            value={credentials.name}
            onChange={onChange}
            placeholder="Enter username"
            className="w-full mt-2 px-4 py-3 rounded-lg bg-[#1A1A22] text-white border border-purple-700/30 focus:ring-2 focus:ring-purple-600 outline-none"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-purple-200 text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter email"
            className="w-full mt-2 px-4 py-3 rounded-lg bg-[#1A1A22] text-white border border-purple-700/30 focus:ring-2 focus:ring-purple-600 outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="text-purple-200 text-sm">Password</label>
          <input
            type="password"
            name="password"
            required
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter password"
            className="w-full mt-2 px-4 py-3 rounded-lg bg-[#1A1A22] text-white border border-purple-700/30 focus:ring-2 focus:ring-purple-600 outline-none"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6">
          <label className="text-purple-200 text-sm">Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            required
            value={credentials.cpassword}
            onChange={onChange}
            placeholder="Confirm password"
            className="w-full mt-2 px-4 py-3 rounded-lg bg-[#1A1A22] text-white border border-purple-700/30 focus:ring-2 focus:ring-purple-600 outline-none"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg rounded-lg bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center gap-2"
        >
          {loading ? "Creating Account..." : "Sign Up"}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </Button>

        {/* LOGIN REDIRECT */}
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
