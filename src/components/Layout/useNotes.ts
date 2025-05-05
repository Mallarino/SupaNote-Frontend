import { useEffect, useState } from "react";
import { getNotes, createNote } from "../../api/noteService"; 
import { Note } from "../../types/Note";
import axios from "axios";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError("Sesión expirada, por favor inicia sesión de nuevo.");
      } else {
        setError("No se pudieron cargar las notas.");
      }
    }
  };

  const handleNewNote = async (color: string, title: string, content: string) => {
    try {
      const newNote = { noteColor: color, title, content };
      const savedNote = await createNote(newNote);
      setNotes((prev) => [...prev, savedNote]);
    } catch (e) {
      console.error("Error al crear la nota:", e);
      setError("No se pudo crear la nota.");
    }
  };

  const handleColorSelected = (color: string) => {
    setSelectedColor(color);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedColor(null);
    setShowModal(false);
  };

  const updateNote = (updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, error, showModal, selectedColor, handleNewNote, updateNote, deleteNote, handleColorSelected, closeModal };
};