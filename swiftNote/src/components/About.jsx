import React from "react";

const About = () => {
  const features = [
    {
      title: "Add Notes",
      desc: "Create new notes instantly with a clean and distraction-free flow.",
      icon: "📝",
    },
    {
      title: "Read Notes",
      desc: "Browse your ideas in a neatly organized and easy-to-scan layout.",
      icon: "📖",
    },
    {
      title: "Update Notes",
      desc: "Refine or expand your thoughts anytime with effortless editing.",
      icon: "✏️",
    },
    {
      title: "Delete Notes",
      desc: "Remove notes you no longer need — quick and smooth.",
      icon: "🗑",
    },

    // ⭐️ New Todo Features Below
    {
      title: "Add Tasks",
      desc: "Create to-do items quickly and stay on top of your daily goals.",
      icon: "🗂️",
    },
    {
      title: "Set Reminders",
      desc: "Pick a date and time to get reminded of important tasks.",
      icon: "⏰",
    },
    {
      title: "Track Progress",
      desc: "Mark tasks as completed and keep your productivity in check.",
      icon: "✔️",
    },
    {
      title: "Manage Tasks",
      desc: "Update, edit, or delete tasks anytime with a single action.",
      icon: "🧹",
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
        Organize Notes & Tasks<br />Effortlessly & Clearly
      </h1>

      <p className="max-w-2xl text-center text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed">
        A beautifully designed space to manage both your thoughts and daily tasks — 
        helping you stay organized, productive, and focused.
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
            Click <span className="font-semibold text-primary">"Add Note"</span> to create a new note.
          </li>
          <li>Write and save your ideas using the minimal and clean editor.</li>
          <li>Modify or update any note anytime.</li>
          <li>Delete notes you no longer need.</li>

          <hr className="my-4 border-border" />

          <li>
            Go to <span className="font-semibold text-primary">"Add Task"</span> to create a to-do item.
          </li>
          <li>
            Set a reminder by choosing a <span className="font-semibold text-primary">date & time</span>.
          </li>
          <li>Check off completed items to track your daily progress.</li>
          <li>Edit or delete tasks anytime to stay organized.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
