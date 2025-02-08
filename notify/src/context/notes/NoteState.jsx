import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3NmI1ZmM4OGQ1MjRmNDUzY2YxNTQzIn0sImlhdCI6MTczNjQyNzE5N30.F3zXsZ-KUtlvKTDLVwpEPdqRScjXFeQyvZFM25Gcu84",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3NmI1ZmM4OGQ1MjRmNDUzY2YxNTQzIn0sImlhdCI6MTczNjQyNzE5N30.F3zXsZ-KUtlvKTDLVwpEPdqRScjXFeQyvZFM25Gcu84",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);
    setNotes([...notes, json]);
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3NmI1ZmM4OGQ1MjRmNDUzY2YxNTQzIn0sImlhdCI6MTczNjQyNzE5N30.F3zXsZ-KUtlvKTDLVwpEPdqRScjXFeQyvZFM25Gcu84",
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(notes.filter((note) => note._id !== id));
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3NmI1ZmM4OGQ1MjRmNDUzY2YxNTQzIn0sImlhdCI6MTczNjQyNzE5N30.F3zXsZ-KUtlvKTDLVwpEPdqRScjXFeQyvZFM25Gcu84",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);

    // Update notes state
    const updatedNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
