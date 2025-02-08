import React from 'react'

const About = () => {
 

  return (
   
     <div className="p-6 shadow-lg">
        <h2 className="card-title mb-4">Manage Your Notes Efficiently</h2>
        <p className="card-text mb-2">
          Our Notes App helps you easily organize your thoughts and tasks. With
          simple and intuitive features, you can:
        </p>
        <ul className="list-disc list-inside text-left mx-auto w-3/4">
          <li>
            <strong>Add:</strong> Create new notes instantly with a user-friendly
            interface.
          </li>
          <li>
            <strong>Read:</strong> View your saved notes at any time with a clean
            layout.
          </li>
          <li>
            <strong>Update:</strong> Edit and modify your notes effortlessly.
          </li>
          <li>
            <strong>Delete:</strong> Remove notes that are no longer needed with
            a single click.
          </li>
        </ul>
        <p className="card-text mt-4">
          Our goal is to make note-taking simple and effective, whether for work,
          study, or personal reminders. Enjoy a seamless experience with our
          feature-rich app designed for efficiency and ease of use.
        </p>
        <h2 className="card-title mt-6">How to Use the Notes App</h2>
        <ul className="list-disc list-inside text-left mx-auto w-3/4">
          <li>Click on "Add Note" to create a new note.</li>
          <li>Type in your content and save it.</li>
          <li>Click on any note to read or update it.</li>
          <li>Use the delete button to remove unwanted notes.</li>
          <li>Enjoy an organized and clutter-free note-taking experience!</li>
        </ul>
        
      </div>
   
  )
}

export default About
