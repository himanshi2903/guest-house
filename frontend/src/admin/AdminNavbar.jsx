import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Admin.css";
import Button from "../components/Button/Button";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setIsUserMenuOpen(false);
    }
  };

  return (
    <div className="">
      <div className="blue-header">
        <img src="/sgsits_logo.png" alt="sgsits-logo" />
        <span>
          SHRI GOVINDRAM SEKSARIA INSTITUTE OF TECHNOLOGY & SCIENCE, INDORE
        </span>
      </div>

      <div className="main-header">
        <div className="left">
          <div className="menu-container" ref={dropdownRef}>
            <FaBars
              className="menu-icon icon"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <div className="dropdown-menu">
                <ul>
                  
                  <li onClick={() => navigate("/admin/bookings")}>Bookings</li>
                  <li onClick={() => navigate("/admin/rooms")}>Manage Rooms</li>
                  <li onClick={() => navigate("/admin/users")}>Manage Users</li>
                  <li onClick={() => navigate("/admin/reports")}>Reports</li>
                </ul>
              </div>
            )}
          </div>
          <span className="admin-panel">SGSITS GUEST HOUSE - Admin Panel</span>
        </div>

        <div className="right">
          <FaBell className="icon" />
          <FaUserCircle
            className="icon user-icon"
            onClick={() => navigate("/admin-dashboard")} // Navigate to Admin Dashboard
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
