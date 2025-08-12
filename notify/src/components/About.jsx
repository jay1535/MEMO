import React from "react";

const About = () => {
  const features = [
    {
      title: "Add",
      desc: "Quickly create notes with a minimal, intuitive form.",
      icon: "📝",
    },
    {
      title: "Read",
      desc: "Access your notes instantly with a clean, distraction-free layout.",
      icon: "📖",
    },
    {
      title: "Update",
      desc: "Edit notes seamlessly to keep them relevant and updated.",
      icon: "✏️",
    },
    {
      title: "Delete",
      desc: "Easily remove notes you no longer need with a single click.",
      icon: "🗑",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4 text-center drop-shadow-lg">
        🗒 Manage Your Notes Like a Pro
      </h1>

      <p className="text-center max-w-2xl text-lg mb-8 text-gray-300">
        Your thoughts deserve the best organization. Capture, edit, and manage
        your ideas effortlessly in a sleek, distraction-free workspace.
      </p>

      {/* Card Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl w-full">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 p-6 flex flex-col items-center text-center hover:-translate-y-2"
          >
            <div className="text-5xl mb-3">{feature.icon}</div>
            <h2 className="text-xl font-semibold text-yellow-400">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* How to Use */}
      <div className="mt-12 max-w-3xl w-full bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
          📌 How to Use
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
          <li>
            Click <span className="font-semibold text-yellow-400">"Add Note"</span> to create a new note.
          </li>
          <li>Type your content and save it instantly.</li>
          <li>Click any note to view or edit it.</li>
          <li>Use the delete option to remove unnecessary notes.</li>
          <li>Enjoy a clean and organized digital workspace.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
