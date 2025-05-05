import { useState, useRef } from "react";
import { adjustHeight } from "../../utils/ui"; 

interface NoteModalProps {
  selectedColor: string;
  onCreateNote: (color: string, title: string, content: string, token: string) => void;
  closeModal: () => void;
  token: string;
}

export const NoteModal: React.FC<NoteModalProps> = ({ selectedColor, onCreateNote, closeModal, token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div
      style={{
        position: "fixed",    
        top: "50%",          
        left: "50%",         
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px", 
        zIndex: 9999,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",  
      }}
    >
      <div style={{ backgroundColor: selectedColor, padding: "1rem", borderRadius: "10px" }}>
        <textarea
          ref={titleRef}
          className="form-control"
          style={{ width: "100%", minHeight: "50px", fontWeight: "bold", backgroundColor: selectedColor, border: "none", overflow: "hidden", resize: "none" }}
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            adjustHeight(titleRef);
          }}
        />

        <hr style={{ margin: "8px", borderTop: "1px solid #D9D9D9" }} />

        <textarea
          ref={contentRef}
          className="form-control"
          style={{ width: "100%", minHeight: "50px", backgroundColor: selectedColor, border: "none", overflow: "hidden", resize: "none" }}
          placeholder="Write something"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            adjustHeight(contentRef);
          }}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button
          onClick={() => {
            onCreateNote(selectedColor, title, content, token);
            closeModal();
          }}
          style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", margin: "10px" }}
        >
          Save Note
        </button>
        <button
          onClick={closeModal}
          style={{ padding: "10px 20px", backgroundColor: "#DC3545", color: "#fff", border: "none", borderRadius: "5px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
