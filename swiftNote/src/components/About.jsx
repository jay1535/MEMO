import React from "react";

const About = () => {
  const features = [
    {
      title: "Add Notes",
      desc: "Create new notes instantly with a simple and distraction-free creation flow.",
      icon: "📝",
    },
    {
      title: "Read Notes",
      desc: "Browse your thoughts in a clean, organized, and easy-to-scan layout.",
      icon: "📖",
    },
    {
      title: "Update Notes",
      desc: "Modify any note effortlessly whenever you need to refine or expand your ideas.",
      icon: "✏️",
    },
    {
      title: "Delete Notes",
      desc: "Remove notes you no longer need with a single, smooth action.",
      icon: "🗑",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-6 py-12 flex flex-col items-center">

      {/* Title Section */}
      <h1
        className="
          text-5xl md:text-6xl font-extrabold mb-5 text-center text-primary 
          drop-shadow-[0_0_30px_rgba(155,0,255,0.6)]
        "
      >
        Organize Your Notes<br />Effortlessly & Clearly
      </h1>

      <p className="max-w-2xl text-center text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed">
        A thoughtfully designed workspace built to help you capture ideas, stay organized, 
        and manage your notes with clarity and comfort.
      </p>

      {/* Feature Cards */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl w-full">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="
              bg-card border border-border backdrop-blur-xl rounded-2xl 
              p-8 flex flex-col items-center text-center shadow-lg
              hover:shadow-primary/40 hover:-translate-y-2 transition-all duration-300
            "
          >
            <div className="text-6xl mb-5">{feature.icon}</div>

            <h2
              className="
                text-2xl font-semibold text-primary mb-2 
                drop-shadow-[0_0_15px_rgba(155,0,255,0.55)]
              "
            >
              {feature.title}
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* How-To Section */}
      <div
        className="
          mt-20 max-w-3xl w-full bg-card border border-border 
          rounded-2xl p-10 shadow-xl backdrop-blur-xl 
          hover:shadow-primary/20 transition-all duration-300
        "
      >
        <h2
          className="
            text-3xl font-bold text-center text-primary mb-6 
            drop-shadow-[0_0_20px_rgba(155,0,255,0.6)]
          "
        >
          📌 How to Use
        </h2>

        <ul className="list-disc list-inside text-muted-foreground space-y-3 text-lg md:text-xl leading-relaxed">
          <li>
            Click <span className="font-semibold text-primary">"Add Note"</span> to create a new entry.
          </li>
          <li>Enter your content using the clean, minimal editor.</li>
          <li>Select any note card to edit or update its details.</li>
          <li>Use the delete option to remove notes instantly.</li>
          <li>Stay organized with a smooth, intuitive interface designed for productivity.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
