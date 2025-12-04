"use client";

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

const AddNote = ({ showAlert }) => {
  const { addNote } = useContext(noteContext);

  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const onChange = (e) =>
    setNote({ ...note, [e.target.id]: e.target.value });

  const handleAdd = () => {
    if (!note.title || !note.description) return;

    addNote(note.title, note.description, note.tag);
    showAlert("Note added successfully 🎉", "success");

    setNote({ title: "", description: "", tag: "" });
    setOpen(false);
  };

  return (
    <div className="my-6 flex flex-col items-center">

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-purple-400 mb-1">
        Create a New Note
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Write and save your notes quickly.
      </p>

      {/* Add Note Box */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="
              w-64 h-32 border-2 border-dashed border-purple-400 
              rounded-xl text-purple-400
              flex flex-col items-center justify-center
              hover:bg-purple-400/10 transition
            "
          >
            <PlusCircle className="w-8 h-8 mb-1" />
            <span className="text-sm font-medium">Add Note</span>
          </button>
        </DialogTrigger>

        {/* Modal */}
        <DialogContent className="bg-[#010102] text-white rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl text-purple-400">
              Add New Note
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">

            {/* Title */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="title" className="text-purple-200">Title</Label>
              <Input
                id="title"
                value={note.title}
                onChange={onChange}
                placeholder="Enter title"
                className="bg-[#1d1d1d] border-none"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="description" className="text-purple-200">
                Description
              </Label>
              <Input
                id="description"
                value={note.description}
                onChange={onChange}
                placeholder="Enter description"
                className="bg-[#1d1d1d] border-none"
              />
            </div>

            {/* Tag */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="tag" className="text-purple-200">Tag</Label>
              <Input
                id="tag"
                value={note.tag}
                onChange={onChange}
                placeholder="e.g. work, ideas"
                className="bg-[#1d1d1d] border-none"
              />
            </div>

          </div>

          <DialogFooter>
            <Button
              onClick={handleAdd}
              disabled={!note.title || !note.description}
              className="
                w-full bg-purple-500 hover:bg-purple-600 text-white
              "
            >
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Your ideas matter — write them down easily.
      </p>
    </div>
  );
};

export default AddNote;
