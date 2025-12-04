"use client";

import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

import { Pencil, Trash2, Tag, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NoteItem = ({ note, updateNote, showAlert }) => {
  const { deleteNote } = useContext(noteContext);

  return (
    <Card
      className="
        p-5 rounded-2xl
        bg-card/60 backdrop-blur-xl
        border-3 border-border shadow-sm
        hover:shadow-md 
        transition-all duration-300
         gap-3

        h-[270px] flex flex-col justify-between
      "
    >
      {/* Title */}
      <CardHeader className="p-0 ">
        <CardTitle
          className="
            text-2xl font-bold leading-snug tracking-tight 
            bg-linear-to-r from-purple-500 via-fuchsia-500 to-purple-600
            bg-clip-text text-transparent
            line-clamp-1 select-none
          "
        >
          {note.title}
        </CardTitle>
      </CardHeader>

      {/* Description */}
      <CardContent className="p-0 mt-2">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {note.description}
        </p>

        {/* Metadata */}
        <div className="mt-4 flex items-center justify-between text-xs">

          {/* Tag */}
          <div
            className="
              flex items-center gap-1 
              px-2 py-[3px]
              rounded-full 
              bg-primary/10 text-primary
              border border-primary/20 
              font-medium text-[11px]
              w-fit
            "
          >
            <Tag className="w-3 h-3" />
            {note.tag || "General"}
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            {new Date(note.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        {/* Buttons: Left & Right */}
        <div
          className="
            mt-5 pt-3 
            border-t border-border/40 
            flex items-center justify-between
          "
        >
          {/* Edit */}
          <Button
            variant="outline"
            onClick={() => updateNote(note)}
            className="
              flex items-center gap-2 
              border-primary text-primary
              hover:bg-primary hover:text-white
              transition-all
            "
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>

          {/* Delete */}
          <Button
            variant="outline"
            onClick={() => {
              deleteNote(note._id);
              showAlert('Note deleted successfully', 'success');
            }}
            className="
              flex items-center gap-2 
              border-red-500 text-red-500
              hover:bg-red-600 hover:text-white
              transition-all
            "
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteItem;
