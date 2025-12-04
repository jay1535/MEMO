import React from "react";

const About = () => {
  const features = [
    {
      title: "Add Notes",
      desc: "Create new notes quickly using a clean, focused input form.",
      icon: "📝",
    },
    {
      title: "Read Notes",
      desc: "View your ideas in a neatly organized and distraction-free layout.",
      icon: "📖",
    },
    {
      title: "Update Notes",
      desc: "Edit any note effortlessly whenever you want to refine your ideas.",
      icon: "✏️",
    },
    {
      title: "Delete Notes",
      desc: "Remove outdated or unnecessary notes in a single click.",
      icon: "🗑",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-6 py-12 flex flex-col items-center">

      {/* 🎨 60% — Title Section */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-center text-primary drop-shadow-[0_4px_20px_rgba(140,0,255,0.25)]">
        Manage Your Notes<br />With Style & Ease
      </h1>

      <p className="max-w-2xl text-center text-muted-foreground text-lg mb-10 leading-relaxed">
        A beautifully crafted workspace built to help you capture, manage, and refine your ideas — all in one elegant purple-themed interface.
      </p>

      {/* 🎨 30% — Feature Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl w-full">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="
              bg-card border border-border backdrop-blur-xl rounded-2xl 
              p-6 flex flex-col items-center text-center shadow-lg
              hover:shadow-primary/30 hover:-translate-y-2 transition-all duration-300
            "
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold text-primary mb-1">{feature.title}</h2>
            <p className="text-muted-foreground text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* 🎨 10% — Highlighted How-To Section */}
      <div className="
        mt-16 max-w-3xl w-full bg-card border border-border 
        rounded-2xl p-8 shadow-xl backdrop-blur-xl 
        hover:shadow-primary/20 transition-all duration-300
      ">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          📌 How to Use
        </h2>

        <ul className="list-disc list-inside text-muted-foreground space-y-2 text-base leading-relaxed">
          <li>
            Click <span className="font-semibold text-primary">"Add Note"</span> to create a new entry.
          </li>
          <li>Type your content using the clean and minimalist editor.</li>
          <li>Click any note card to edit or update its content.</li>
          <li>Use the delete option to remove notes instantly.</li>
          <li>Keep your ideas organized inside a beautiful purple UI.</li>
        </ul>
      </div>

     

    </div>
  );
};

export default About;
