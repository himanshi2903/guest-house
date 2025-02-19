import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Register.css";

const Login = () => {
  return (
    <div className="container">
      <div className="blue-header">
        <img src="/sgsits_logo.png" alt="gs-logo" />
        <span className="gs">
          SHRI GOVINDERAM SEKSARIA INSTITUTE OF TECHNOLOGY & SCIENCE, INDORE
        </span>
      </div>
      <div className="reg-container">
        <div className="reg-box">
          <h3>Register</h3>
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
          <button className="reg-btn">Register</button>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
