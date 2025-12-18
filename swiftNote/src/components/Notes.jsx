"use client";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Notes = ({ showAlert }) => {
  const { notes, getNotes, editNote } = useContext(noteContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const updateNote = (currentnote) => {
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag || "default",
    });
    setOpen(true);
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setOpen(false);
    showAlert("Note updated successfully", "success");
  };

  const onChange = (e) =>
    setNote({ ...note, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-6 py-12 flex flex-col items-center">

      {/* ================= TITLE SECTION (ABOUT PAGE STYLE) ================= */}
      <h1
        className="
          text-5xl md:text-6xl font-extrabold mb-5 text-center text-primary
          drop-shadow-[0_0_30px_rgba(155,0,255,0.6)]
        "
      >
        Capture Your Ideas<br />Effortlessly & Clearly
      </h1>

      <p className="max-w-2xl text-center text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed">
        A beautifully designed space to write, organize, and revisit your notes —
        keeping your thoughts structured and always accessible.
      </p>

      {/* ================= NOTES SECTION ================= */}
      <div className="w-full max-w-6xl">
        <Card
          className="
            bg-card border border-border backdrop-blur-xl
            rounded-2xl shadow-xl
          "
        >
          <CardHeader>
            <CardTitle
              className="
                text-2xl font-semibold text-primary
                drop-shadow-[0_0_15px_rgba(155,0,255,0.45)]
              "
            >
              Your Notes
            </CardTitle>
          </CardHeader>

          <CardContent className="max-h-[65vh] overflow-y-auto custom-scroll">
            {notes.length === 0 ? (
              <div className="py-20 text-center">
                <h3
                  className="
                    text-2xl font-semibold
                    bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600
                    bg-clip-text text-transparent
                  "
                >
                  No notes yet
                </h3>
                <p className="text-muted-foreground mt-3">
                  Start by creating your first note — your ideas deserve a place.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((n) => (
                  <Noteitem
                    key={n._id}
                    updateNote={updateNote}
                    showAlert={showAlert}
                    note={n}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ================= EDIT NOTE DIALOG ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            bg-card border border-border backdrop-blur-xl
            rounded-2xl shadow-xl
          "
        >
          <DialogHeader>
            <DialogTitle
              className="
                text-xl font-bold text-primary
                drop-shadow-[0_0_15px_rgba(155,0,255,0.45)]
              "
            >
              Edit Your Note
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div>
              <Label className="text-sm text-muted-foreground">Title</Label>
              <Input
                type="text"
                name="etitle"
                value={note.etitle}
                onChange={onChange}
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">
                Description
              </Label>
              <Input
                type="text"
                name="edescription"
                value={note.edescription}
                onChange={onChange}
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Tag</Label>
              <Input
                type="text"
                name="etag"
                value={note.etag}
                onChange={onChange}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleClick}
              disabled={!note.etitle || !note.edescription}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notes;
