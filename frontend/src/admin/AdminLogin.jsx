import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const AdminLogin = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="login-container">
        <div className="login-box">
          <h3>Login</h3>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" placeholder="Enter Username" required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" placeholder="Enter Password" required />
          </div>
          <div className="captcha-box">
            <img src="/captcha.png" alt="Captcha" className="captcha" />
            <button className="refresh-btn">🔄</button>
          </div>
          <input type="text" placeholder="Enter Captcha" required />
          <button className="login-btn">Login</button>
          
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLogin;
