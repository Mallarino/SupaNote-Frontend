import { useEffect, useState } from "react";
import { getNotes, createNote } from "../../api/noteService"; 
import { Note } from "../../types/Note";
import axios from "axios";
import { toast } from "react-toastify";


export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError("Sesión expirada, por favor inicia sesión de nuevo.");
      } else {
        toast.error("Error al cargar las notas")
      }
    }
  };

  const handleNewNote = async (color: string, title: string, content: string) => {
    try {
      const newNote = { noteColor: color, title, content };
      const savedNote = await createNote(newNote);
      setNotes((prev) => [...prev, savedNote]);
      toast.success("Note created")
    } catch (e) {
      console.error("Error al crear la nota:", e);
      toast.error("Error creating note")
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