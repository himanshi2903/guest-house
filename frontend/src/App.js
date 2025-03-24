import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import AllRooms from "./components/AllRooms/AllRooms";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Facilities from "./components/Facilities/Facilities";
import Policy from "./components/Policy/Policy";
import Contact from "./components/Contact/Contact";

import UserDashboard from "./components/UserDashboard/UserDashboard"; 


const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

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

          
          <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />

          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
