import React, { useState } from 'react'
import logo from '../assets/SupaNoteIcon.jpeg'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



export const NotesNavbar: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Ajusta la ruta según tu app
  };



  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <nav className="navbar navbar-expand-lg px-3 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo y marca */}
        <div className="d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" width={50} height={50} />
          <span className="navbar-brand mb-0 h1">My Notes</span>
        </div>

        {/* Barra de búsqueda */}
        <form className="d-none d-md-flex mx-auto w-50">
          <input
            className="form-control rounded-pill px-3 text-black"
            style={{ backgroundColor: "#D9D9D9", width: 400 }}
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
          />
        </form>

        <div className="d-flex align-items-center gap-3">
          <span className="fw-semibold">{user.username || "Username"}</span>
          <div className="rounded-circle bg-secondary" style={{ width: 32, height: 32 }} />

          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              <i className="bi bi-list" style={{ cursor: "pointer", fontSize: "20px", color: "black" }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout} href="#">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );

}
