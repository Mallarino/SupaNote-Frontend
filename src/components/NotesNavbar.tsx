import React, { useState } from 'react'
import logo from '../assets/SupaNoteIcon.jpeg'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { logout } from '../utils/auth';
import { getUser } from '../utils/storage';
import { toast } from 'react-toastify';



export const NotesNavbar: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Session closed") 
  };

  const user = getUser();

  return (
    <nav className="navbar navbar-expand-lg px-3 py-3 shadow-sm bg-white">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo y marca */}
        <div className="d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" width={50} height={50} />
          <span className="navbar-brand mb-0 h1">My Notes</span>
        </div>

        

        {/* Usuario y opciones */}
        <div className="d-flex align-items-center gap-3">
          <span className="fw-semibold text-dark">{`Welcome, ${user.username}!` || "Usuario"}</span>

          <Dropdown align="end">
            <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 bg-transparent">
              <i className="bi bi-list" style={{ fontSize: "20px", color: "black" }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );

}
