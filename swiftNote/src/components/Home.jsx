"use client";

import React from "react";

import {
  ArrowRight,
  FileText,
  Layers,
  PenLine,
  Search,
  Sparkles,
  Zap,
  ShieldCheck
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">

      {/* HERO SECTION */}
      <section className="flex flex-col  items-center text-center px-5 pt-32 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl drop-shadow-[0_0_25px_rgba(140,0,255,0.35)]">

          Bring Clarity to Your Ideas with{" "}

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

        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          A clean, modern workspace designed to help you capture thoughts,
          stay organized, and think effortlessly.
        </p>

        {/* Animated Gradient Progress Bar */}
        <div className="mt-10 w-56 h-2 rounded-full bg-primary/20 overflow-hidden shadow-[0_0_20px_4px_rgba(140,0,255,0.4)]">
          <div className="h-full w-full bg-linear-to-r from-primary via-fuchsia-500 to-primary animate-progress" />
        </div>

        <p className="mt-4 text-muted-foreground text-sm">
          Log in or sign up to begin your note-taking journey.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          How{" "}
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
          </span>{" "}
          Helps You Stay Organized
        </h2>

        <p className="text-center mt-3 text-muted-foreground max-w-2xl mx-auto">
          Designed for speed, simplicity, and a seamless writing experience.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">
          <HowCard
            icon={<Layers className="w-10 h-10 text-primary" />}
            title="1. Create Instantly"
            desc="Add notes with ease using a clean, distraction-free interface."
          />
          <HowCard
            icon={<Search className="w-10 h-10 text-primary" />}
            title="2. Find Anything"
            desc="Search through your ideas quickly with smart filters and tools."
          />
          <HowCard
            icon={<PenLine className="w-10 h-10 text-primary" />}
            title="3. Edit Effortlessly"
            desc="Refine, update, and enhance your notes whenever inspiration strikes."
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 bg-card/30 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Why People Love{" "}
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
        </h2>

        <p className="text-center mt-3 text-muted-foreground max-w-2xl mx-auto">
          Beautifully simple. Powerful when you need it.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<FileText className="w-10 h-10 text-primary" />} 
            title="Elegant Design" 
            desc="A refined interface built to keep you focused on your ideas." 
          />
          <FeatureCard 
            icon={<Sparkles className="w-10 h-10 text-primary" />} 
            title="Smart Organization" 
            desc="Your notes stay neatly arranged—no clutter, no chaos." 
          />
          <FeatureCard 
            icon={<Zap className="w-10 h-10 text-primary" />} 
            title="Ultra Fast" 
            desc="Optimized for speed, giving you a smooth writing experience." 
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-10 h-10 text-primary" />} 
            title="Privacy First" 
            desc="Your notes stay secure, protected, and just for you." 
          />
          <FeatureCard 
            icon={<ArrowRight className="w-10 h-10 text-primary" />} 
            title="Effortless Navigation" 
            desc="Move across pages and sections with clean, fluid transitions." 
          />
          <FeatureCard 
            icon={<PenLine className="w-10 h-10 text-primary" />} 
            title="Perfect for Students" 
            desc="Ideal for organizing study material, ideas, tasks, and reminders." 
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-border text-sm text-muted-foreground">
        © {new Date().getFullYear()}{" "}
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
        </span>{" "}
        — Built with passion by Jayant
      </footer>

    </div>
  );
}

/* Feature Card */
function FeatureCard({ icon, title, desc }) {
  return (
    <div
      className="
      p-6 rounded-2xl bg-card border border-border 
      hover:shadow-primary/30 hover:-translate-y-1 
      transition-all duration-300
    "
    >
      {icon}
      <h3 className="text-xl font-semibold mt-4 text-primary">{title}</h3>
      <p className="text-muted-foreground mt-2">{desc}</p>
    </div>
  );
}

/* How It Works Card */
function HowCard({ icon, title, desc }) {
  return (
    <div
      className="
      p-6 rounded-2xl bg-card border border-border 
      hover:shadow-primary/30 hover:-translate-y-1 
      transition-all duration-300
    "
    >
      {icon}
      <h3 className="text-xl font-semibold mt-4 text-primary">{title}</h3>
      <p className="text-muted-foreground mt-2">{desc}</p>
    </div>
  );
}
