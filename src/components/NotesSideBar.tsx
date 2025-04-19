import { useRef, useState } from "react";

interface NotesSideBarProps {
  onCreateNote: (color: string, title: string, content: string) => void;
}

export const NotesSideBar: React.FC<NotesSideBarProps> = ({ onCreateNote }) => {
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleColorMenu = () => {
    setShowColorMenu(!showColorMenu);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false);
    setTitle("");
    setContent(""); 
  };

  // Ajustar la altura de los textarea cuando el contenido cambia
  const adjustHeight = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    if (ref.current) {  // Verificación de null
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  return (
    <div
      style={{
        width: "250px",
        height: "80vh",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        top: 80,
        left: 0,
        padding: "1rem",
      }}
    >
      <button
        type="button"
        className="btn btn-light w-30 text-black rounded-pill"
        style={{ backgroundColor: "#D9D9D9", color: "#000", border: "none", padding: "10px" }}
        onClick={toggleColorMenu}
      >
        New Note +
      </button>

      {showColorMenu && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          {["#3D7F8E", "#CF6565", "#C5B853"].map((color) => (
            <div
              key={color}
              onClick={() => handleColorClick(color)} 
              style={{
                width: "30px",
                height: "30px",
                margin: "5px",
                borderRadius: "50%",
                backgroundColor: color,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedColor && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            maxWidth: "600px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              backgroundColor: selectedColor,
              padding: "1rem",
              margin: "10px",
              borderRadius: "10px",
              marginBottom: "1rem",
              boxSizing: "border-box",
              display: "inline-block",
              maxWidth: "100%",
            }}
          >
            <textarea
              ref={titleRef}
              className="form-control"
              style={{
                resize: "none",
                overflow: "auto",
                backgroundColor: selectedColor,
                border: "none",
                fontWeight: "bold",
                width: "100%",
                minHeight: "50px",
              }}
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
              className="form-control custom-placeholder"
              style={{
                resize: "none",
                overflow: "auto",
                backgroundColor: selectedColor,
                border: "none",
                width: "100%",
                minHeight: "50px",
              }}
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
                onCreateNote(selectedColor, title, content);
                closeModal();
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "10px",
              }}
            >
              Save Note
            </button>
            <button
              onClick={closeModal}
              style={{
                padding: "10px 20px",
                backgroundColor: "#DC3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};