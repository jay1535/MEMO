"use client";

import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

import { Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NoteItem = ({ note, updateNote, showAlert }) => {
  const { deleteNote } = useContext(noteContext);

  return (
    <Card
      className="
        p-6
        rounded-2xl
        bg-card/40
        backdrop-blur-xl
        border border-border
        shadow-sm
        hover:shadow-md
        transition-all duration-300
        hover:-translate-y-1
        text-foreground

        h-[250px]
        flex flex-col justify-between
      "
    >
      {/* Title */}
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-semibold text-primary truncate">
          {note.title}
        </CardTitle>
      </CardHeader>

      {/* Description */}
      <CardContent className="p-0 mt-3 flex flex-col justify-between h-full">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
          {note.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          {/* Edit Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateNote(note)}
            className="
              border-primary text-primary
              hover:bg-primary hover:text-primary-foreground
              transition-all duration-300
            "
          >
            <Pencil className="w-5 h-5" />
          </Button>

          {/* Delete Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              deleteNote(note._id);
              showAlert("Note deleted successfully", "success");
            }}
            className="
              border-red-500 text-red-500 
              hover:bg-red-600 hover:text-white 
              transition-all duration-300
            "
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteItem;
