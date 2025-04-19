import React, { ReactNode, useEffect, useState } from "react";
import { NotesSideBar } from "./NotesSideBar";
import { NotesNavbar } from "./NotesNavbar";
import { Note } from "../types/Note";
import { NoteEditor } from "./NoteEditor";
import { getNotes } from "../services/noteService";
import axios from "axios";




const Layout: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const savedNotes = await getNotes();
        setNotes(savedNotes);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setError("Sesión expirada, por favor inicia sesión de nuevo.");
        } else {
          setError("No se pudieron cargar las notas.");
        }
        console.error("Error al cargar las notas:", error);
      }
    };

    fetchNotes();
  }, []);

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
          {error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            notes.map((note) => <NoteEditor key={note.id} note={note} />)
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;