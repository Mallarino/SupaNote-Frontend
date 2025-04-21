import React, { ReactNode, useEffect, useState } from "react";
import { NotesSideBar } from "./NotesSideBar";
import { NotesNavbar } from "./NotesNavbar";
import { Note } from "../types/Note";
import { NoteEditor } from "./NoteEditor";
import { createNote, getNotes } from "../services/noteService";
import axios from "axios";


const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

const Layout: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const fetchNotes = async () => {
      try {
        const savedNotes = await getNotes(token);
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

  const handleNewNote = async (color: string, title: string, content: string) => {
    try {
      const newNote = {
        noteColor: color,
        title: title,
        content: content,
      };

      const savedNote = await createNote(newNote);
      setNotes((prev) => [...prev, savedNote]);
    } catch (error) {
      console.error("Error al crear la nota:", error);
      setError("No se pudo crear la nota.");
    }
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
            notes.map((note) => <NoteEditor key={note.id} note={note} token={token} onUpdate={(updated) =>
              setNotes((prev) =>
                prev.map((n) => (n.id === updated.id ? updated : n))
              )
            }
              onDelete={(deletedId) =>
                setNotes((prev) => prev.filter((n) => n.id !== deletedId))
              } />)
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;