import { useEffect, useRef, useState } from "react";
import { Note } from "../../types/Note";
import '../../styles/index.css';
import React from "react";
import { Dropdown } from "react-bootstrap";
import { deleteNote, updateNote } from "../../api/noteService";
import NoteActions from "./NoteActions";
import NoteTextarea from "./NoteTextArea";
import { adjustHeight } from "../../utils/ui";


type NoteEditorProps = {
  note: Note;
  onUpdate: (updatedNote: Note) => void;
  onDelete: (deletedNoteId: number) => void;
};

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isEditing, setIsEditing] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustHeight(titleRef);
    adjustHeight(contentRef);
  }, [title, content]);

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const updated = await updateNote(note.id, { title, content, noteColor: note.noteColor });
        onUpdate(updated);
      } catch (err) {
        console.error("Error al actualizar la nota:", err);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    try {
      await deleteNote(note.id);
      onDelete(note.id);
    } catch (err) {
      console.error("Error al eliminar la nota:", err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: note.noteColor,
        padding: "1rem",
        margin: "10px",
        borderRadius: "10px",
        width: "30%",
        minHeight: "40vh",
        alignSelf: "flex-start",
        position: "relative",
      }}
    >
      <NoteActions isEditing={isEditing} onEdit={handleEditClick} onDelete={handleDelete} />

      <NoteTextarea
        value={title}
        readOnly={!isEditing}
        placeholder="Title"
        onChange={(val) => {
          setTitle(val);
          adjustHeight(titleRef);
        }}
        ref={titleRef}
        bold
        noteColor={note.noteColor}
      />

      <div style={{ height: "1px", backgroundColor: "#aea2a2", margin: "12px 0" }} />

      <NoteTextarea
        value={content}
        readOnly={!isEditing}
        placeholder="Write something"
        onChange={(val) => {
          setContent(val);
          adjustHeight(contentRef);
        }}
        ref={contentRef}
        noteColor={note.noteColor}
      />
    </div>
  );
};

export default NoteEditor;