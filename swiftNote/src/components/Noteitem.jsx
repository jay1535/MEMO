"use client";

import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import {
  Pencil,
  Trash2,
  Heart,
  Tag,
  Clock,
  Palette,
  X,
} from "lucide-react";
import {
  Card,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SketchPicker } from "react-color";

/* 🖤 Professional black default */
const DEFAULT_NOTE_COLOR = "#0F172A"; // slate-900

const NoteItem = ({ note, updateNote, showAlert }) => {
  const { deleteNote, toggleFavorite, editNote } =
    useContext(noteContext);

  const [showPicker, setShowPicker] = useState(false);
  const [tempColor, setTempColor] = useState(
    note.color || DEFAULT_NOTE_COLOR
  );

  /* 🔒 Close picker on ESC */
  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") setShowPicker(false);
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, []);

  /* 🎨 Apply selected color */
  const applyColor = () => {
    editNote(
      note._id,
      note.title,
      note.description,
      note.tag,
      tempColor
    );
    setShowPicker(false);
  };

  return (
    <>
      {/* ================= NOTE CARD ================= */}
      <Card
        style={{ backgroundColor: note.color || DEFAULT_NOTE_COLOR }}
        className="
          relative rounded-2xl
          border border-white/10
          shadow-sm
        "
      >
        <div className="p-4 h-[260px] flex flex-col relative">
          {/* ===== HEADER ===== */}
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg font-semibold text-white line-clamp-1">
              {note.title}
            </CardTitle>

            {/* ❤️ FAVORITE */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(note._id)}
              className="relative rounded-full"
            >
              {note.isFavorite && (
                <span
                  className="
                    absolute inset-0 rounded-full
                    bg-gradient-to-r from-pink-400 to-red-500
                    opacity-30 blur-lg
                  "
                />
              )}

              <Heart
                className={`relative z-10 w-5 h-5 ${
                  note.isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400"
                }`}
              />
            </Button>
          </div>

          {/* ===== DESCRIPTION ===== */}
          <CardContent className="px-2 py-3 flex-1">
            <div
              className="
                h-full rounded-xl
                bg-white/5
                border border-white/10
                px-3 py-2
              "
            >
              <p
                className="
                  text-[14.5px]
                  leading-[1.65]
                  text-gray-300
                  line-clamp-5
                  tracking-[0.01em]
                "
              >
                {note.description}
              </p>
            </div>
          </CardContent>

          {/* ===== META ===== */}
          <div className="mt-3 flex justify-between text-xs text-gray-400 px-1">
            <div className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              {note.tag}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {new Date(note.date).toLocaleDateString()}
            </div>
          </div>

          {/* ===== ACTION BAR ===== */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex gap-2">
              {/* 🎨 COLOR */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/20 text-white"
                onClick={() => {
                  setTempColor(note.color || DEFAULT_NOTE_COLOR);
                  setShowPicker(true);
                }}
              >
                <Palette className="w-4 h-4" />
              </Button>

              {/* ✏️ EDIT */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/20 text-white"
                onClick={() => updateNote(note)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>

            {/* 🗑 DELETE */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-red-500 text-red-500"
              onClick={() => {
                deleteNote(note._id);
                showAlert("Note deleted", "success");
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* ================= COLOR PICKER MODAL ================= */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowPicker(false)}
          />

          <div className="relative bg-background rounded-xl shadow-2xl p-4 w-[280px]">
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => setShowPicker(false)}
            >
              <X className="w-4 h-4" />
            </Button>

            <SketchPicker
              color={tempColor}
              onChange={(c) => setTempColor(c.hex)}
              disableAlpha
            />

            <Button
              className="w-full mt-4"
              onClick={applyColor}
            >
              Apply Color
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteItem;
