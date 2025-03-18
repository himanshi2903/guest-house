import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaFilter, FaBell, FaUserCircle } from "react-icons/fa";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const Header = () => {
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  return (
    <header>
      <div className="blue-header">
        <img src="/sgsits_logo.png" alt="gs-logo" />
        <span className="gs">
          SHRI GOVINDERAM SEKSARIA INSTITUTE OF TECHNOLOGY & SCIENCE, INDORE
        </span>
      </div>

      <div className="main-header">
        <div className="left">
          <div className="menu-container" ref={dropdownRef}>
            <FaBars className="menu-icon icon" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
              <div className="dropdown-menu">
                <ul>
                <li><Button text="VIEW ROOMS" onClick={() => navigate("/allrooms")} className="dropdown-button" /></li>
                  <li onClick={() => navigate("/")}>Home</li>
                  <li onClick={() => navigate("/facilities")}>Facilities</li>
                  <li onClick={() => navigate("/policy")}>View Policy</li>
                  <li onClick={() => navigate("/contact")}>Contact</li>
                </ul>
              </div>
            )}
          </div>
          <span className="guest-house">NARMADA GUEST HOUSE</span>
        </div>

        <div className="center">
          <input type="text" placeholder="Search" className="search-bar" />
          <FaFilter className="filter-icon icon" />
        </div>

        <div className="right">
          <FaBell className="icon" />
          <div className="user-menu-container" ref={userMenuRef}>
            <FaUserCircle className="icon" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} />
            {isUserMenuOpen && (
              <div className="dropdown-menu-user">
                <ul>
                  <li onClick={() => navigate("/login")}>Login</li>
                  <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
