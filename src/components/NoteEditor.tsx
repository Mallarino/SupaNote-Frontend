import { useEffect, useRef, useState } from "react";
import { Note } from "../types/Note";
import '../styles/index.css';
import React from "react";

export const NoteEditor: React.FC<{ note: Note }> = ({ note }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    // Función para ajustar la altura dinámica de los textarea
    const adjustHeight = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
        const element = ref.current;
        if (element) {
            element.style.height = "auto";
            element.style.height = `${element.scrollHeight}px`;
        }
    };

    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        adjustHeight(titleRef);
        adjustHeight(contentRef);
    }, []);

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
                display: "block", 
            }}
        >
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
                readOnly
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
                readOnly
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                    adjustHeight(contentRef);
                }}
            />
        </div>
    );
};
