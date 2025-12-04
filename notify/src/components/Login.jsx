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
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

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
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md 
          bg-card/70 backdrop-blur-xl 
          border border-border 
          p-8 rounded-2xl shadow-xl
        "
      >
        {/* TITLE */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary">
            Welcome Back
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Login to continue your journey.
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-sm font-medium text-foreground">
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
              w-full mt-2 px-4 py-3 rounded-xl
              bg-popover text-popover-foreground
              border border-border placeholder:opacity-60
              focus:outline-none focus:ring-2 focus:ring-ring
              transition
            "
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter your password"
            className="
              w-full mt-2 px-4 py-3 rounded-xl
              bg-popover text-popover-foreground
              border border-border placeholder:opacity-60
              focus:outline-none focus:ring-2 focus:ring-ring
              transition
            "
          />
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="
            w-full py-4 text-lg 
            rounded-xl bg-primary text-primary-foreground 
            hover:bg-primary/90 hover:scale-[1.02]
            shadow-lg transform transition
            flex items-center justify-center gap-2
          "
        >
          Login <LogIn className="w-4 h-4" />
        </Button>

        {/* Signup Redirect */}
        <p className="text-center text-muted-foreground mt-5 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-primary cursor-pointer underline-offset-2 hover:underline"
          >
            Create one
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
