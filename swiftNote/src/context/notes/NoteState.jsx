import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = ({ children }) => {
  const host = import.meta.env.VITE_BACKEND_URL;
  const [notes, setNotes] = useState([]);

  /* ================= SORT NOTES ================= */
  const sortNotes = (data) =>
    [...data].sort((a, b) => b.isFavorite - a.isFavorite);

  /* ================= GET NOTES ================= */
  const getNotes = async () => {
    try {
      const res = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!res.ok) throw new Error("Failed to fetch notes");

      const json = await res.json();
      setNotes(sortNotes(json));
    } catch (error) {
      console.error("❌ Get Notes Error:", error.message);
    }
  };

  /* ================= ADD NOTE ================= */
  const addNote = async (title, description, tag, color) => {
    try {
      const res = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag, color }),
      });

      if (!res.ok) throw new Error("Failed to add note");

      const json = await res.json();
      setNotes((prev) => sortNotes([json, ...prev]));
    } catch (error) {
      console.error("❌ Add Note Error:", error.message);
    }
  };

  /* ================= DELETE NOTE ================= */
  const deleteNote = async (id) => {
    try {
      const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!res.ok) throw new Error("Failed to delete note");

      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("❌ Delete Note Error:", error.message);
    }
  };

  /* ================= EDIT NOTE ================= */
  const editNote = async (id, title, description, tag, color) => {
    try {
      const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag, color }),
      });

      if (!res.ok) throw new Error("Failed to update note");

      const updated = await res.json();
      setNotes((prev) =>
        sortNotes(prev.map((n) => (n._id === id ? updated : n)))
      );
    } catch (error) {
      console.error("❌ Edit Note Error:", error.message);
    }
  };

  /* ================= TOGGLE FAVORITE ================= */
  const toggleFavorite = async (id) => {
    try {
      const res = await fetch(`${host}/api/notes/togglefavorite/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!res.ok) throw new Error("Failed to toggle favorite");

      const updated = await res.json();
      setNotes((prev) =>
        sortNotes(prev.map((n) => (n._id === id ? updated : n)))
      );
    } catch (error) {
      console.error("❌ Toggle Favorite Error:", error.message);
    }
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
