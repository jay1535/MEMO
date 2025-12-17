"use client";

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Github,
  Menu,
  X,
  Linkedin,
  ChevronDown,
  PlusCircle,
  Eye,
  Notebook,
  ListTodo,
  ChevronDownIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import logo from "../assets/logo.svg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const loggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setOpenMenu(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="
          w-full bg-[#0b0712]/95 border-b border-[#2b1840]
          px-6 py-4 shadow-lg backdrop-blur-xl top-0 z-50
        "
      >
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="SwiftNotes Logo"
                className="w-10 h-10 drop-shadow-[0_0_8px_rgba(182,136,255,0.6)]"
              />
              <span
                className="
                  text-3xl font-extrabold tracking-wide bg-linear-to-r 
                  from-purple-500 via-fuchsia-500 to-purple-600 
                  bg-clip-text text-transparent
                  drop-shadow-[0_0_10px_rgba(140,0,255,0.4)]
                "
              >
                Swift<span className="text-white">Notes</span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <ul className="hidden md:flex gap-8 items-center">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`
                      text-lg transition-all font-medium
                      ${
                        location.pathname === path
                          ? "text-[#b68aff] border-b-2 border-[#b68aff] pb-1"
                          : "text-gray-300 hover:text-[#b68aff]"
                      }
                    `}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {/* --- DROPDOWN 1: ADD MENU --- */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-300 text-lg font-medium hover:text-[#b68aff] flex items-center gap-1 outline-none">
                  Add <ChevronDownIcon className="w-4 h-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="
                    bg-[#140c1f]/90 border border-[#2b1840] 
                    rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.4)]
                    backdrop-blur-2xl text-gray-200
                  "
                >
                  <DropdownMenuItem
                    onClick={() => navigate(loggedIn ? "/dashboard" : "/login")}
                    className="hover:bg-[#b68aff]/20 cursor-pointer flex items-center gap-2"
                  >
                    <Notebook className="w-4 h-4" /> Add Note
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/taskDashboard")}
                    className="hover:bg-[#b68aff]/20 cursor-pointer flex items-center gap-2"
                  >
                    <ListTodo className="w-4 h-4" /> Add Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* --- DROPDOWN 2: VIEW MENU --- */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-300 text-lg font-medium hover:text-[#b68aff] flex items-center gap-1 outline-none">
                  View <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="
                    bg-[#140c1f]/90 border border-[#2b1840] 
                    rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.4)]
                    backdrop-blur-2xl text-gray-200
                  "
                >
                  <DropdownMenuItem
                    onClick={() => navigate("/notes")}
                    className="hover:bg-[#b68aff]/20 cursor-pointer flex items-center gap-2"
                  >
                    <Notebook className="w-4 h-4" /> View Notes
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/tasks")}
                    className="hover:bg-[#b68aff]/20 cursor-pointer flex items-center gap-2"
                  >
                    <ListTodo className="w-4 h-4" /> View Tasks
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ul>
          </div>

          {/* DESKTOP RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => window.open("https://github.com/jay1535")}
              className="rounded-xl border-[#b68aff] text-[#b68aff]"
            >
              <Github className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open("https://linkedin.com/in/jayant-habbu/")}
              className="rounded-xl border-[#b68aff] text-[#b68aff]"
            >
              <Linkedin className="w-5 h-5" />
            </Button>

            {!loggedIn ? (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button className="bg-linear-to-r from-[#7b2ff7] to-[#c084fc] text-white rounded-lg px-4 font-semibold shadow-lg hover:scale-[1.03] transition">
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button variant="outline" className="rounded-xl px-4 border-[#c084fc] text-[#d8b4ff]">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                onClick={handleLogout}
                className="bg-linear-to-r from-[#d00049] to-[#ff4f79] text-white rounded-xl px-4 font-semibold hover:scale-[1.03] transition"
              >
                Logout
              </Button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 border rounded-lg border-[#b68aff] text-[#b68aff]"
            onClick={() => setOpenMenu(true)}
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpenMenu(false)}
        ></div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-black/40 
          backdrop-blur-xl border-l border-white/10
          shadow-xl z-50 p-6 transform transition-transform duration-300
          ${openMenu ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button
          className="absolute top-5 right-5 text-gray-300"
          onClick={() => setOpenMenu(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-8 mt-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-[#b68aff]">
            Swift<span className="text-white">Notes</span>
          </span>
        </div>

        {/* MOBILE NAV */}
        <div className="flex flex-col gap-4 mb-6">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setOpenMenu(false)}
              className={`text-lg ${
                location.pathname === path
                  ? "text-[#b68aff]"
                  : "text-gray-200 hover:text-[#b68aff]"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* ADD BUTTONS */}
          <button
            onClick={() => navigate("/dashboard")}
            className="text-left text-lg text-gray-200 hover:text-[#b68aff]"
          >
             Add Note
          </button>

          <button
            onClick={() => navigate("/taskDashboard")}
            className="text-left text-lg text-gray-200 hover:text-[#b68aff]"
          >
             Add Task
          </button>

          {/* VIEW BUTTONS */}
          <button
            onClick={() => navigate("/notes")}
            className="text-left text-lg text-gray-200 hover:text-[#b68aff]"
          >
             View Notes
          </button>

          <button
            onClick={() => navigate("/tasks")}
            className="text-left text-lg text-gray-200 hover:text-[#b68aff]"
          >
             View Tasks
          </button>
        </div>

        <hr className="border-white/10 my-4" />

        {/* SOCIAL ICONS */}
        <div className="flex gap-3 mb-5">
          <Button
            variant="outline"
            onClick={() => window.open("https://github.com/jay1535")}
            className="rounded-xl border-[#b68aff] text-[#b68aff]"
          >
            <Github />
          </Button>

          <Button
            variant="outline"
            onClick={() => window.open("https://linkedin.com/in/jayant-habbu/")}
            className="rounded-xl border-[#b68aff] text-[#b68aff]"
          >
            <Linkedin />
          </Button>
        </div>

        {/* AUTH */}
        {!loggedIn ? (
          <div className="flex flex-col gap-3">
            <Link to="/login" onClick={() => setOpenMenu(false)}>
              <Button className="w-full bg-linear-to-r from-[#7b2ff7] to-[#c084fc] text-white rounded-xl font-semibold">
                Login
              </Button>
            </Link>

            <Link to="/signup" onClick={() => setOpenMenu(false)}>
              <Button variant="outline" className="w-full rounded-xl border-[#c084fc] text-[#d8b4ff]">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Button
            onClick={handleLogout}
            className="w-full bg-linear-to-r from-[#d00049] to-[#ff4f79] text-white rounded-xl font-semibold"
          >
            Logout
          </Button>
        )}
      </div>
    </>
  );
};

export default Navbar;
