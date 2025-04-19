import React, { ReactNode, useState } from "react";
import { NotesSideBar } from "./NotesSideBar";
import { NotesNavbar } from "./NotesNavbar";
import { Note } from "../types/Note";
import { NoteEditor } from "./NoteEditor";




const Layout: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Manejar la creación de una nueva nota
  const handleNewNote = (color: string, title: string, content: string) => {
    const newNote: Note = {
      id: Date.now(),
      noteColor: color,
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [...prev, newNote]);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NotesNavbar />

      <div className="d-flex flex-grow-1">
        <NotesSideBar onCreateNote={handleNewNote} />

        <main
          className="p-3 w-100"
          style={{
            marginLeft: "250px",
            backgroundColor: "#D9D9D9",
            borderRadius: 10,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {notes.map((note) => (
            <NoteEditor key={note.id} note={note} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Layout;