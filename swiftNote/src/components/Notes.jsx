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
  DialogTrigger,
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
    showAlert("Note updated successfully 🎉", "success");
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start px-6 py-10">

      {/* Outer Notes Card */}
      <Card
        className="
          w-full max-w-[1400px] 
          bg-card/80 border border-border 
          backdrop-blur-xl rounded-2xl 
          shadow-[0_0_25px_rgba(140,0,255,0.15)]
        "
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary drop-shadow-[0_0_12px_rgba(140,0,255,0.4)]">
            Your Notes 📖
          </CardTitle>
        </CardHeader>

        {/* Notes Grid */}
        <CardContent className="h-[65vh] overflow-y-auto pr-3 custom-scroll">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length === 0 ? (
              <p className="text-muted-foreground">
                You haven’t created any notes yet.
              </p>
            ) : (
              notes.map((n) => (
                <Noteitem
                  key={n._id}
                  updateNote={updateNote}
                  showAlert={showAlert}
                  note={n}
                />
              ))
            )}
          </div>

        </CardContent>
      </Card>

      {/* EDIT DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            bg-card border border-border text-card-foreground
            backdrop-blur-xl rounded-2xl shadow-xl
          "
        >
          <DialogHeader>
            <DialogTitle className="text-primary">
              Edit Your Note
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">

            {/* Title */}
            <div>
              <Label className="text-sm text-foreground">Title</Label>
              <Input
                type="text"
                name="etitle"
                value={note.etitle}
                onChange={onChange}
                className="bg-popover text-popover-foreground"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm text-foreground">Description</Label>
              <Input
                type="text"
                name="edescription"
                value={note.edescription}
                onChange={onChange}
                className="bg-popover text-popover-foreground"
              />
            </div>

            {/* Tag */}
            <div>
              <Label className="text-sm text-foreground">Tag</Label>
              <Input
                type="text"
                name="etag"
                value={note.etag}
                onChange={onChange}
                className="bg-popover text-popover-foreground"
              />
            </div>

          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-primary text-primary hover:bg-primary/20"
            >
              Close
            </Button>

            <Button
              onClick={handleClick}
              disabled={!note.etitle || !note.edescription}
              className="bg-primary text-primary-foreground hover:bg-primary/80"
            >
              Update
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notes;
