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
  ShieldCheck,
  CheckSquare,
  ListChecks,
  CalendarCheck,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">

      {/* HERO SECTION */}
      <section className="flex h-screen flex-col items-center text-center px-5 pt-32 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl drop-shadow-[0_0_25px_rgba(140,0,255,0.35)]">

          Organize Everything in One Space with{" "}
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
          Your notes, to-dos, ideas, and tasks — all in one beautifully simple app.
        </p>

        {/* Animated Progress Line */}
        <div className="mt-10 w-56 h-2 rounded-full bg-primary/20 overflow-hidden shadow-[0_0_20px_4px_rgba(140,0,255,0.4)]">
          <div className="h-full w-full bg-linear-to-r from-primary via-fuchsia-500 to-primary animate-progress" />
        </div>

        <p className="mt-4 text-muted-foreground text-sm">
          Log in to start managing notes and tasks effortlessly.
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
          Makes Life Easier
        </h2>

        <p className="text-center mt-3 text-muted-foreground max-w-2xl mx-auto">
          A perfect blend of notes + to-do lists for maximum productivity.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">
          <HowCard
            icon={<Layers className="w-10 h-10 text-primary" />}
            title="1. Capture Notes Instantly"
            desc="Write anything—ideas, study notes, tasks, reminders—without distractions."
          />
          <HowCard
            icon={<CheckSquare className="w-10 h-10 text-primary" />}
            title="2. Manage Your Tasks"
            desc="Create, complete, and track to-dos with a clean and intuitive interface."
          />
          <HowCard
            icon={<CalendarCheck className="w-10 h-10 text-primary" />}
            title="3. Stay Organized"
            desc="Group notes & tasks together so everything stays structured."
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
          Simple enough to use daily. Powerful enough to stay forever.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">

          <FeatureCard 
            icon={<FileText className="w-10 h-10 text-primary" />} 
            title="Beautiful Note-Taking" 
            desc="Fast, minimal, and fluid note-writing experience." 
          />
          <FeatureCard 
            icon={<ListChecks className="w-10 h-10 text-primary" />} 
            title="Smart To-Do System" 
            desc="Track tasks, mark progress, and achieve more." 
          />
          <FeatureCard 
            icon={<Search className="w-10 h-10 text-primary" />} 
            title="Unified Search" 
            desc="Instantly find notes or tasks in one place." 
          />
          <FeatureCard 
            icon={<Sparkles className="w-10 h-10 text-primary" />} 
            title="Organized Collections" 
            desc="Group notes and to-dos into categories or subjects." 
          />
          <FeatureCard 
            icon={<Zap className="w-10 h-10 text-primary" />} 
            title="Lightning Fast" 
            desc="Built for speed—smooth transitions and instant responses." 
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-10 h-10 text-primary" />} 
            title="Your Data Stays Private" 
            desc="Secure and encrypted, always safe." 
          />
        </div>
      </section>

      {/* FOOTER */}
     <footer className="w-full border-t border-border bg-[#0b0712] mt-20">
  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

    {/* BRAND SECTION */}
    <div>
      <h2 className="text-3xl font-extrabold bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(140,0,255,0.4)]">
        SwiftNotes
      </h2>
      <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
        A fast, modern, and beautifully designed workspace to manage your 
        notes and tasks — streamlined for simplicity, power, and productivity.
      </p>
    </div>

    {/* PRODUCT */}
    <div>
      <h3 className="text-lg font-semibold text-primary mb-4">Product</h3>
      <ul className="space-y-2 text-muted-foreground">
        <li className="hover:text-primary cursor-pointer">Add Notes</li>
        <li className="hover:text-primary cursor-pointer">View Notes</li>
        <li className="hover:text-primary cursor-pointer">Add Tasks</li>
        <li className="hover:text-primary cursor-pointer">Task Reminders</li>
        <li className="hover:text-primary cursor-pointer">Update / Delete</li>
      </ul>
    </div>

    {/* RESOURCES */}
    <div>
      <h3 className="text-lg font-semibold text-primary mb-4">Resources</h3>
      <ul className="space-y-2 text-muted-foreground">
        <li className="hover:text-primary cursor-pointer">About SwiftNotes</li>
        <li className="hover:text-primary cursor-pointer">Documentation</li>
        <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
        <li className="hover:text-primary cursor-pointer">Terms & Conditions</li>
      </ul>
    </div>

    {/* CONTACT */}
    <div>
      <h3 className="text-lg font-semibold text-primary mb-4">Contact</h3>
      <ul className="space-y-3 text-muted-foreground">
        <li>Email: <span className="hover:text-primary cursor-pointer">habbujayant@gmail.com</span></li>
        <li>Location: Bengaluru, India</li>
      </ul>

      {/* SOCIALS */}
      <div className="flex gap-4 mt-5">
        <a
          href="https://github.com/jay1535"
          target="_blank"
          className="text-muted-foreground hover:text-primary transition"
        >
          <i className="fab fa-github text-xl"></i>
        </a>
        
        <a
          href="https://linkedin.com/in/jayant-habbu/"
          target="_blank"
          className="text-muted-foreground hover:text-primary transition"
        >
          <i className="fab fa-linkedin text-xl"></i>
        </a>

        <a
          href="https://www.instagram.com/jayant._.762/"
          target="_blank"
          className="text-muted-foreground hover:text-primary transition"
        >
          <i className="fab fa-instagram text-xl"></i>
        </a>
      </div>
    </div>
  </div>

  {/* BOTTOM COPYRIGHT BAR */}
  <div className="py-6 border-t border-border text-center text-sm text-muted-foreground">
    © {new Date().getFullYear()}{" "}
    <span className="bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(140,0,255,0.4)]">
      SwiftNotes
    </span>{" "}
    — Built with passion by <span className="text-primary">Jayant</span>
  </div>
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

/* How Card */
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
