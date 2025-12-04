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
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          bg-card/70 backdrop-blur-xl border border-border
          p-8 rounded-2xl shadow-xl
        "
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-1">
            Create your account
          </h2>
          <p className="text-muted-foreground text-sm">
            Join SwiftNotes — save ideas, stay organized.
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Username
          </label>
          <input
            type="text"
            name="name"
            required
            value={credentials.name}
            onChange={onChange}
            placeholder="Enter your username"
            className="
              w-full px-4 py-3 rounded-xl
              bg-popover text-popover-foreground
              border border-border placeholder:opacity-60
              focus:outline-none focus:ring-2 focus:ring-ring
            "
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter your email"
            className="
              w-full px-4 py-3 rounded-xl
              bg-popover text-popover-foreground
              border border-border placeholder:opacity-60
              focus:outline-none focus:ring-2 focus:ring-ring
            "
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter password"
            className="
              w-full px-4 py-3 rounded-xl
              bg-popover text-popover-foreground
              border border-border placeholder:opacity-60
              focus:outline-none focus:ring-2 focus:ring-ring
            "
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
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
              w-full px-4 py-3 rounded-xl
              bg-popover text-popover-foreground
              border border-border placeholder:opacity-60
              focus:outline-none focus:ring-2 focus:ring-ring
            "
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="
            w-full py-4 text-lg rounded-xl
            bg-primary text-primary-foreground
            hover:bg-primary/90 shadow-lg transition-all hover:scale-[1.02]
            flex items-center justify-center gap-2
          "
        >
          Sign Up <ArrowRight className="w-4 h-4" />
        </Button>

        {/* Login link */}
        <p className="text-center text-muted-foreground mt-5 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer underline-offset-2 hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
