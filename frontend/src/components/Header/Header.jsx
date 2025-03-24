import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaFilter,  FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResult] = useState([]);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    setIsLoggedIn(false); 
    alert("✅ Logout successful!");
    navigate("/");
  };

  const keywordToPageMap = [
    { keywords: ["home"], name: "Home", path: "/" },
    { keywords: ["room", "rooms", "guest", "stay"], name: "All Rooms", path: "/allrooms" },
    { keywords: ["dining", "food", "meal", "restaurant"], name: "Facilities - Dining", path: "/facilities" },
    { keywords: ["gym", "fitness", "workout"], name: "Facilities - Gym", path: "/facilities" },
    { keywords: ["policy", "rules", "terms"], name: "View Policy", path: "/policy" },
    { keywords: ["contact", "help", "support"], name: "Contact", path: "/contact" },
    { keywords: ["dashboard", "account", "profile"], name: "Dashboard", path: "/dashboard" },
  ];

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResult([]);
      return;
    }

    const filteredResults = keywordToPageMap.filter((item) =>
      item.keywords.some((keyword) => keyword.includes(query))
    );

    setSearchResult(filteredResults);
  };

  const handleSearchClick = (path) => {
    navigate(path);
    setSearchQuery(""); 
    setSearchResult([]); 
  };

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
      <div className="blue-header" onClick={() => navigate("/")}>
        <img src="/sgsits_logo.png" alt="gs-logo" className="clickable-logo"/>
        <span className="gs">
          SHRI GOVINDRAM SEKSARIA INSTITUTE OF TECHNOLOGY & SCIENCE, INDORE
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
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
            value={searchQuery}
            onChange={handleSearch}
          />
          <FaFilter className="filter-icon icon" />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((item, index) => (
                <p key={index} onClick={() => handleSearchClick(item.path)}>
                  {item.name}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="right">
          
          <div className="user-menu-container" ref={userMenuRef}>
            <FaUserCircle className="icon" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} />
            {isUserMenuOpen && (
              <div className="dropdown-menu-user">
                <ul>
                  {isLoggedIn ? (
                    <>
                      <li onClick={handleLogout}>Logout</li>
                      <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    </>
                  ) : (
                    <li onClick={() => navigate("/login")}>Login</li>
                  )}
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
