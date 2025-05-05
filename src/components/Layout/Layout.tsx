import React from "react";
import { NotesSideBar } from "../NotesSideBar/NotesSideBar";
import { NotesNavbar } from "../NotesNavbar";
import { useNotes } from "./useNotes";
import NoteEditor from "../NoteEditor/NoteEditor";
import { NoteModal } from "../NotesSideBar/NoteModal";
import { getToken } from "../../utils/auth";


const Layout: React.FC = () => {

  const { notes, error, showModal, selectedColor, handleNewNote, updateNote, deleteNote, handleColorSelected, closeModal } = useNotes();
  
  const token = getToken();

  return (
    <>

      {showModal && selectedColor && (
        <>
          <div
            onClick={closeModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              zIndex: 9998,
            }}
          />
          <NoteModal
            selectedColor={selectedColor}
            onCreateNote={handleNewNote}
            closeModal={closeModal}
            token={token!}
          />
        </>
      )}

      <div className="min-vh-100 d-flex flex-column">
        <NotesNavbar />

        <div className="d-flex flex-grow-1">
          <NotesSideBar
            onCreateNote={handleNewNote}
            onColorSelected={handleColorSelected}
          />

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
              notes.map((note) => (
                <NoteEditor
                  key={note.id}
                  note={note}
                  onUpdate={updateNote}
                  onDelete={deleteNote}
                />
              ))
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;