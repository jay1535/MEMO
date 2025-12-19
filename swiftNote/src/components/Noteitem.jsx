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
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SketchPicker } from "react-color";

const DEFAULT_NOTE_COLOR = "#0F172A";

const NoteItem = ({ note, updateNote, showAlert }) => {
  const { deleteNote, toggleFavorite, editNote } =
    useContext(noteContext);

  const [showPicker, setShowPicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tempColor, setTempColor] = useState(
    note.color || DEFAULT_NOTE_COLOR
  );

  /* 🔒 ESC closes overlays */
  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") {
        setShowPicker(false);
        setShowPreview(false);
      }
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, []);

  /* 🎨 Apply color */
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

  /* ================= PREVIEW CARD ================= */
  const PreviewCard = () => (
    <Card
      style={{ backgroundColor: note.color || DEFAULT_NOTE_COLOR }}
      className="
        w-[520px] rounded-3xl
        border border-white/10
        shadow-[0_20px_80px_rgba(0,0,0,0.6)]
        backdrop-blur-xl
      "
    >
      <div className="p-6">
        <CardTitle className="text-xl text-white mb-4">
          {note.title}
        </CardTitle>

        <p className="text-gray-200 leading-relaxed text-[15px]">
          {note.description}
        </p>

        <div className="mt-5 flex justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            {note.tag}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {new Date(note.date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <>
      {/* ================= NOTE CARD ================= */}
      <Card
        style={{ backgroundColor: note.color || DEFAULT_NOTE_COLOR }}
        className="
          relative rounded-3xl
          border border-white/10
          backdrop-blur-xl
          transition-all duration-300
          hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]
          hover:-translate-y-1
        "
      >
        <div className="p-4 h-[240px] flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-lg text-white line-clamp-1">
              {note.title}
            </CardTitle>

            {/* ❤️ Favorite */}
            <Button
              size="icon"
              variant="ghost"
              className="
                rounded-full
                hover:bg-white/15
                transition-all duration-300
                hover:scale-110
                active:scale-95
                group
              "
              onClick={() => toggleFavorite(note._id)}
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  note.isFavorite
                    ? "fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                    : "text-gray-400 group-hover:text-red-400"
                }`}
              />
            </Button>
          </div>

          {/* DESCRIPTION */}
          <CardContent className="px-2 py-2 flex-1">
            <div
              onMouseEnter={() => setShowPreview(true)}
              className="
                h-[70px]
                rounded-xl
                border border-white/10
                px-3 py-2
                cursor-pointer
                transition-all duration-300
                hover:border-white/30
                hover:bg-black/30
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]
              "
            >
              <p className="text-sm text-gray-300 line-clamp-3">
                {note.description}
              </p>
            </div>
          </CardContent>

          {/* ACTION BAR */}
          <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
            <div className="flex gap-2">
              {/* 🎨 Color */}
              <Button
                size="icon"
                className="
                  rounded-full
                  bg-white/10 backdrop-blur
                  border border-white/10
                  text-white
                  transition-all duration-300
                  hover:bg-white/20
                  hover:scale-110
                  hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]
                  active:scale-95
                "
                onClick={() => {
                  setTempColor(note.color || DEFAULT_NOTE_COLOR);
                  setShowPicker(true);
                }}
              >
                <Palette className="w-4 h-4" />
              </Button>

              {/* ✏️ Edit */}
              <Button
                size="icon"
                className="
                  rounded-full
                  bg-white/10 backdrop-blur
                  border border-white/10
                  text-white
                  transition-all duration-300
                  hover:bg-white/20
                  hover:scale-110
                  hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]
                  active:scale-95
                "
                onClick={() => updateNote(note)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>

            {/* 🗑 Delete */}
            <Button
              size="icon"
              className="
                rounded-full
                bg-red-500/10
                border border-red-500/20
                text-red-500
                transition-all duration-300
                hover:bg-red-500/20
                hover:scale-110
                hover:shadow-[0_0_18px_rgba(239,68,68,0.6)]
                active:scale-95
              "
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

      {/* ================= HOVER PREVIEW ================= */}
      {showPreview && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          onMouseLeave={() => setShowPreview(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <PreviewCard />
        </div>
      )}

      {/* ================= COLOR PICKER ================= */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowPicker(false)}
          />
          <div className="relative bg-background rounded-2xl shadow-2xl p-4 w-[280px]">
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

            <Button className="w-full mt-4" onClick={applyColor}>
              Apply Color
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteItem;
