"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  Layers,
  PenLine,
  Search,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

// Safe redirect function
const handleRedirect = () => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("token");

  window.location.href = token ? "/dashboard" : "/login";
};

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center px-5 pt-32 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl drop-shadow-[0_0_25px_rgba(140,0,255,0.35)]">
          Organize Your Thoughts with{" "}
          <span className="text-primary">SwiftNotes</span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          Capture, manage, and organize your ideas in a beautifully designed
          purple-themed digital workspace.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex gap-4 mt-8 flex-wrap justify-center">

          {/* GET STARTED */}
          <Button
            onClick={handleRedirect}
            className="
              px-8 py-6 text-lg rounded-xl shadow-xl hover:scale-105 transition-all
              bg-white text-black hover:bg-primary/80
            "
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* VIEW NOTES */}
          <Button
            variant="outline"
            onClick={handleRedirect}
            className="
              px-8 py-6 text-lg rounded-xl hover:scale-105 transition-all
              border-primary text-primary hover:bg-primary hover:text-primary-foreground
            "
          >
            View Notes
          </Button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          How <span className="text-primary">SwiftNotes</span> Works
        </h2>

        <p className="text-center mt-3 text-muted-foreground max-w-2xl mx-auto">
          A lightning-fast and intuitive way to store your ideas.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">
          <HowCard
            icon={<Layers className="w-10 h-10 text-primary" />}
            title="1. Create Notes"
            desc="Add notes instantly with a clean and modern interface."
          />
          <HowCard
            icon={<Search className="w-10 h-10 text-primary" />}
            title="2. Search Everything"
            desc="Locate any note in seconds with smart search tools."
          />
          <HowCard
            icon={<PenLine className="w-10 h-10 text-primary" />}
            title="3. Edit Anytime"
            desc="Stay organized by updating your ideas whenever needed."
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 bg-card/30 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Why Choose <span className="text-primary">SwiftNotes?</span>
        </h2>

        <p className="text-center mt-3 text-muted-foreground max-w-2xl mx-auto">
          A digital companion crafted for productivity and elegance.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<FileText className="w-10 h-10 text-primary" />} 
            title="Beautiful UI" 
            desc="Minimal, fast, and pleasing design language." 
          />
          <FeatureCard 
            icon={<Sparkles className="w-10 h-10 text-primary" />} 
            title="Smart Organization" 
            desc="Keep your notes automatically arranged." 
          />
          <FeatureCard 
            icon={<Zap className="w-10 h-10 text-primary" />} 
            title="Lightning Fast" 
            desc="Blazing performance optimized for speed." 
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-10 h-10 text-primary" />} 
            title="Secure" 
            desc="Your notes remain private and protected." 
          />
          <FeatureCard 
            icon={<ArrowRight className="w-10 h-10 text-primary" />} 
            title="Easy Navigation" 
            desc="Move between notes with fluid navigation." 
          />
          <FeatureCard 
            icon={<PenLine className="w-10 h-10 text-primary" />} 
            title="Made for Students" 
            desc="Perfect for exam notes, tasks, ideas, and reminders." 
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Managing Your Notes with{" "}
          <span className="text-primary">SwiftNotes</span>
        </h2>

        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          The fastest and most elegant way to save your ideas.
        </p>

        <div className="flex justify-center">
          <Button
            onClick={handleRedirect}
            className="
              mt-7 px-10 py-6 rounded-xl text-lg shadow-xl hover:scale-110
              bg-white text-black hover:bg-primary/80
              flex items-center
            "
          >
            Start Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-border text-sm text-muted-foreground">
        © {new Date().getFullYear()} SwiftNotes — Built by Jayant
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
