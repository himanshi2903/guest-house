import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import AllRooms from "./components/AllRooms/AllRooms";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Facilities from "./components/Facilities/Facilities";
import Policy from "./components/Policy/Policy";
import Contact from "./components/Contact/Contact";

import AdminLogin from "./admin/AdminLogin";
import AdminFooter from "./admin/AdminFooter";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allrooms" element={<AllRooms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-footer" element={<AdminFooter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
