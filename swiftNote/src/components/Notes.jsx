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
    showAlert("Note updated successfully 🎉", "success");
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start px-6 py-12">

      {/* Outer Notes Card */}
      <Card
        className="
          w-full max-w-[1400px] 
          bg-card/60 border border-border 
          backdrop-blur-xl rounded-3xl 
          shadow-[0_0_35px_rgba(140,0,255,0.25)]
          transition-all duration-300
        "
      >

        {/* Heading */}
        <CardHeader>
          <CardTitle
            className="
              text-4xl font-bold text-center
              drop-shadow-[0_0_20px_rgba(140,0,255,0.55)]
              bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600 
              bg-clip-text text-transparent
            "
          >
            Your Personal Notes Hub ✨
          </CardTitle>

          <p className="text-center text-muted-foreground mt-3">
            Keep your ideas safe, organized, and always within reach.
          </p>
        </CardHeader>

        {/* Notes Grid */}
        <CardContent className="h-[65vh] overflow-y-auto pr-3 custom-scroll mt-2">

          {notes.length === 0 ? (
            <div className="w-full text-center py-20">
              <h3
                className="
                  text-2xl font-semibold 
                  bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600 
                  bg-clip-text text-transparent
                  drop-shadow-[0_0_10px_rgba(140,0,255,0.4)]
                "
              >
                No Notes Yet 📭
              </h3>

              <p className="mt-2 text-muted-foreground text-base">
                Start by creating your first note —  
                <span className="text-primary font-medium">your ideas are waiting!</span>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
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

      {/* EDIT DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            bg-card/80 border border-border text-card-foreground
            backdrop-blur-2xl rounded-3xl shadow-2xl
            transition-all duration-500
          "
        >
          <DialogHeader>
            <DialogTitle
              className="
                text-xl font-bold
                bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600 
                bg-clip-text text-transparent
                drop-shadow-[0_0_10px_rgba(140,0,255,0.4)]
              "
            >
              Edit Your Note ✏️
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

          <DialogFooter className="flex justify-between mt-3">

            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="
                border-primary text-primary 
                hover:bg-primary/20 hover:text-primary 
                transition-all
              "
            >
              Cancel
            </Button>

            <Button
              onClick={handleClick}
              disabled={!note.etitle || !note.edescription}
              className="
                bg-primary text-primary-foreground 
                hover:bg-primary/80 
                shadow-[0_0_10px_rgba(140,0,255,0.5)]
                transition-all
              "
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
