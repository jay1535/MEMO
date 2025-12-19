import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = ({ children }) => {
  const host = import.meta.env.VITE_BACKEND_URL;
  const [notes, setNotes] = useState([]);

  const sortNotes = (data) =>
    data.sort((a, b) => b.isFavorite - a.isFavorite);

  const getNotes = async () => {
    const res = await fetch(`${host}/api/notes/fetchallnotes`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await res.json();
    setNotes(sortNotes(json));
  };

  const addNote = async (title, description, tag, color) => {
    const res = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag, color }),
    });
    const json = await res.json();
    setNotes(sortNotes([json, ...notes]));
  };

  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: { "auth-token": localStorage.getItem("token") },
    });
    setNotes(notes.filter((n) => n._id !== id));
  };

  const editNote = async (id, title, description, tag, color) => {
    const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag, color }),
    });
    const updated = await res.json();
    setNotes(
      sortNotes(notes.map((n) => (n._id === id ? updated : n)))
    );
  };

  const toggleFavorite = async (id) => {
    const res = await fetch(`${host}/api/notes/togglefavorite/${id}`, {
      method: "PUT",
      headers: { "auth-token": localStorage.getItem("token") },
    });
    const updated = await res.json();
    setNotes(
      sortNotes(notes.map((n) => (n._id === id ? updated : n)))
    );
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        getNotes,
        addNote,
        deleteNote,
        editNote,
        toggleFavorite,
      }}
    >
      {children}
    </noteContext.Provider>
  );
};

export default NoteState;
