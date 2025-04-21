import { useEffect, useRef, useState } from "react";
import { Note } from "../types/Note";
import '../styles/index.css';
import React from "react";
import { Dropdown } from "react-bootstrap";
import { deleteNote, updateNote } from "../services/noteService";


type NoteEditorProps = {
    note: Note;
    token: string;
    onUpdate: (updatedNote: Note) => void;
    onDelete: (deletedNoteId: number) => void;
  };
  
  export const NoteEditor: React.FC<NoteEditorProps> = ({ note, token, onUpdate, onDelete }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [isEditing, setIsEditing] = useState(false);
  
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
  
    const adjustHeight = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
        const element = ref.current;
        if (element) {
          element.style.height = "auto";
          element.style.height = `${element.scrollHeight}px`;
        }
      };
  
    useEffect(() => {
      adjustHeight(titleRef);
      adjustHeight(contentRef);
    }, [title, content]);
  
    const handleEditClick = async () => {
      if (isEditing) {
        contentRef.current?.focus();
        try {
            const updated = await updateNote(note.id, {
                title,
                content,
                noteColor: note.noteColor,
              }, token);
          onUpdate(updated);
        } catch (err) {
          console.error("Error al actualizar la nota:", err);
        }
      }
      setIsEditing(!isEditing);
    };
  
    const handleDelete = async () => {
      try {
        await deleteNote(note.id, token);
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
          boxSizing: "border-box",
          width: "30%",
          minHeight: "40vh",
          height: "auto",
          alignSelf: "flex-start",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          {isEditing ? (
            <i
              className="bi bi-check-circle-fill"
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={handleEditClick}
              title="Guardar"
            ></i>
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant="link" style={{ padding: 0 }}>
                <i className="bi bi-three-dots-vertical text-dark" style={{ fontSize: "20px" }}></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditClick}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
  
        <textarea
          ref={titleRef}
          className="form-control"
          style={{
            resize: "none",
            overflow: "hidden",
            backgroundColor: note.noteColor,
            border: "none",
            fontWeight: "bold",
            width: "100%",
            minHeight: "50px",
          }}
          placeholder="Title"
          readOnly={!isEditing}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            adjustHeight(titleRef);
          }}
        />
  
        <div
          style={{
            height: "1px",
            backgroundColor: "#aea2a2",
            marginTop: "12px",
            marginBottom: "12px",
          }}
        ></div>
  
        <textarea
          ref={contentRef}
          className="form-control custom-placeholder"
          style={{
            resize: "none",
            overflow: "auto",
            backgroundColor: note.noteColor,
            border: "none",
            width: "100%",
            minHeight: "50px",
          }}
          placeholder="Write something"
          readOnly={!isEditing}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            adjustHeight(contentRef);
          }}
        />
      </div>
    );
  };