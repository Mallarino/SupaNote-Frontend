import { useState } from "react";
import { ColorMenu } from "./ColorMenu";

interface NotesSideBarProps {
  onCreateNote: (color: string, title: string, content: string, token: string) => void;
  onColorSelected: (color: string) => void; 
}

export const NotesSideBar: React.FC<NotesSideBarProps> = ({ onColorSelected }) => {
  const [showColorMenu, setShowColorMenu] = useState(false);

  const toggleColorMenu = () => setShowColorMenu(!showColorMenu);

  const handleColorSelected = (color: string) => {
    setShowColorMenu(false);    
    onColorSelected(color);      
  };

  return (
    <div
      style={{
        width: "250px",
        height: "80vh",
        position: "fixed",
        top: 80,
        left: 0,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <button
        type="button"
        className="btn btn-light text-dark rounded-pill w-20 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#D9D9D9",
          border: "none",
          height: "50px",
          fontWeight: "bold",
        }}
        onClick={toggleColorMenu}
      >
        <i className="bi bi-plus-circle" style={{ fontSize: "20px", marginRight: "8px" }} />
        New Note
      </button>

      {showColorMenu && <ColorMenu onColorSelect={handleColorSelected} />}
    </div>
  );
};