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

      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-[#b68aff] mb-1 tracking-wide">
        Create a New Note
      </h2>
      <p className="text-muted-foreground mb-4 text-sm">
        Capture your thoughts and save them for later.
      </p>

      {/* Add Note Box */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="
              w-[330px] h-40
              border-2 border-dashed border-[#b68aff]
              rounded-2xl
              flex flex-col items-center justify-center
              text-[#b68aff]
              hover:border-[#d7b4ff]
              hover:bg-[#b68aff]/10 
              hover:scale-[1.02]
              transition-all duration-300
              cursor-pointer
              group
            "
          >
            <PlusCircle className="
              w-12 h-12 mb-2 
              transition-all duration-300 
              group-hover:scale-110 
              group-hover:rotate-180
            " />
            <span className="text-lg font-medium">Add Note</span>
            <span className="text-xs text-[#b68aff]/70 mt-1">
              Tap to begin writing
            </span>
          </button>
        </DialogTrigger>

        {/* Add Note Modal */}
        <DialogContent
          className="
            bg-[#10041a] text-white 
            border border-[#2b1840] 
            shadow-[0_0_25px_rgba(182,136,255,0.25)]
            rounded-3xl
            max-w-lg 
            backdrop-blur-2xl
            p-6
            animate-in fade-in slide-in-from-bottom-5 duration-300
          "
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#b68aff] font-semibold">
              Add New Note
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-4">

            {/* Title */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-[#d5caff]">Title</Label>
              <Input
                id="title"
                placeholder="Enter note title"
                value={note.title}
                onChange={onChange}
                className="
                  bg-[#1c0f2e] 
                  border border-[#392450] 
                  text-white
                  placeholder:text-gray-400
                  rounded-xl
                  focus-visible:ring-[#b68aff]
                "
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-[#d5caff]">Description</Label>
              <Input
                id="description"
                placeholder="Enter description"
                value={note.description}
                onChange={onChange}
                className="
                  bg-[#1c0f2e]
                  border border-[#392450] 
                  text-white
                  placeholder:text-gray-400
                  rounded-xl
                  focus-visible:ring-[#b68aff]
                "
              />
            </div>

            {/* Tag */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="tag" className="text-[#d5caff]">Tag (optional)</Label>
              <Input
                id="tag"
                placeholder="e.g. work, ideas"
                value={note.tag}
                onChange={onChange}
                className="
                  bg-[#1c0f2e] 
                  border border-[#392450] 
                  text-white
                  placeholder:text-gray-400
                  rounded-xl
                  focus-visible:ring-[#b68aff]
                "
              />
            </div>

          </div>

          {/* Add Button */}
          <DialogFooter>
            <Button
              onClick={handleAdd}
              className="
                w-full py-3 text-md rounded-xl font-semibold
                bg-gradient-to-r from-[#8f5bff] to-[#b68aff]
                text-white
                shadow-[0_0_12px_rgba(182,136,255,0.5)]
                hover:shadow-[0_0_20px_rgba(182,136,255,0.7)]
                hover:scale-[1.02]
                transition-all
              "
              disabled={!note.title || !note.description}
            >
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer text */}
      <p className="text-muted-foreground text-xs mt-4 text-center max-w-sm">
        Every great idea begins with a small note — start writing!
      </p>
    </div>
  );
};

export default AddNote;
