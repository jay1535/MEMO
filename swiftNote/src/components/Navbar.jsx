"use client";

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Menu, X, Linkedin } from "lucide-react";
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
    { path: loggedIn ? "/dashboard" : "/login", label: "AddNote" },
    { path: "/about", label: "About" },
    { path: "/notes", label: "Notes" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="
          w-full 
          bg-[#0b0712]/95
          border-b border-[#2b1840]
          px-6 py-4 
          shadow-lg
           top-0 z-50
          backdrop-blur-xl
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
              <span className="text-3xl font-extrabold tracking-wide    bg-linear-to-r 
              from-purple-500 
              via-fuchsia-500 
              to-purple-600 
              bg-clip-text 
              text-transparent
              drop-shadow-[0_0_10px_rgba(140,0,255,0.4)] transition ">
                Swift<span className="text-white">Notes</span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <ul className="hidden md:flex gap-8">
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
            </ul>
          </div>

          {/* RIGHT (DESKTOP) */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => window.open("https://github.com/jay1535", "_blank")}
              className="rounded-xl border-[#b68aff] text-[#b68aff] hover:bg-[#b68aff] hover:text-black"
            >
              <Github className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open("https://linkedin.com/in/jayant-habbu/", "_blank")}
              className="rounded-xl border-[#b68aff] text-[#b68aff] hover:bg-[#b68aff] hover:text-black"
            >
              <Linkedin className="w-5 h-5" />
            </Button>

            {!loggedIn ? (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button
                    className="
                      bg-linear-to-r from-[#7b2ff7] to-[#c084fc]
                      text-white rounded-lg px-4 font-semibold
                      shadow-[0_0_12px_rgba(139,92,246,0.5)]
                      hover:shadow-[0_0_18px_rgba(139,92,246,0.7)]
                      hover:scale-[1.03] transition-all
                    "
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button
                    variant="outline"
                    className="
                      rounded-xl px-4
                      border-[#c084fc] text-[#d8b4ff]
                      hover:bg-[#c084fc]/20 hover:text-white
                      shadow-[0_0_10px_rgba(192,132,252,0.4)]
                      hover:shadow-[0_0_14px_rgba(192,132,252,0.6)]
                      transition-all
                    "
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                onClick={handleLogout}
                className="
                  bg-linear-to-r from-[#d00049] to-[#ff4f79]
                  text-white rounded-xl px-4 font-semibold
                  hover:scale-[1.03]
                  shadow-[0_0_12px_rgba(255,79,121,0.45)]
                  hover:shadow-[0_0_18px_rgba(255,79,121,0.65)]
                  transition-all
                "
              >
                Logout
              </Button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 border rounded-lg border-[#b68aff] text-[#b68aff] hover:bg-[#b68aff] hover:text-black transition"
            onClick={() => setOpenMenu(true)}
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR OVERLAY */}
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpenMenu(false)}
        ></div>
      )}

      {/* MOBILE SIDEBAR — BLACK GLASS */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64
          bg-black/40 backdrop-blur-xl            /* BLACK GLASS */
          border-l border-white/10
          shadow-[0_0_25px_rgba(0,0,0,0.6)]
          z-50 p-6
          transform transition-transform duration-300
          ${openMenu ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-300 hover:text-white"
          onClick={() => setOpenMenu(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 mt-2">
          <img src={logo} alt="SwiftNotes Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-[#b68aff]">
            Swift<span className="text-white">Notes</span>
          </span>
        </div>

        {/* Nav Links */}
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
        </div>

        <hr className="border-white/10 my-4" />

        {/* Social Buttons */}
        <div className="flex gap-3 mb-5">
          <Button
            variant="outline"
            onClick={() => window.open("https://github.com/jay1535", "_blank")}
            className="rounded-xl border-[#b68aff] text-[#b68aff] hover:bg-[#b68aff] hover:text-black"
          >
            <Github />
          </Button>

          <Button
            variant="outline"
            onClick={() => window.open("https://linkedin.com/in/jayant-habbu/", "_blank")}
            className="rounded-xl border-[#b68aff] text-[#b68aff] hover:bg-[#b68aff] hover:text-black"
          >
            <Linkedin />
          </Button>
        </div>

        {/* AUTH (Mobile) */}
        {!loggedIn ? (
          <div className="flex flex-col gap-3">
            <Link to="/login" onClick={() => setOpenMenu(false)}>
              <Button
                className="
                  w-full bg-linear-to-r from-[#7b2ff7] to-[#c084fc]
                  text-white rounded-xl font-semibold
                  shadow-[0_0_12px_rgba(139,92,246,0.5)]
                "
              >
                Login
              </Button>
            </Link>

            <Link to="/signup" onClick={() => setOpenMenu(false)}>
              <Button
                variant="outline"
                className="
                  w-full rounded-xl
                  border-[#c084fc] text-[#d8b4ff]
                  hover:bg-[#c084fc]/20 hover:text-white
                "
              >
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Button
            onClick={handleLogout}
            className="
              w-full bg-linear-to-r from-[#d00049] to-[#ff4f79]
              text-white rounded-xl font-semibold
            "
          >
            Logout
          </Button>
        )}
      </div>
    </>
  );
};

export default Navbar;
