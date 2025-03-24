import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Register.css";
import axios from "axios";

const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Register = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    let error = "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) error = "❌ Invalid email format.";
    setErrors((prev) => ({ ...prev, email: error }));
  };

  const validateCaptcha = (value) => {
    let error = value !== captcha ? "❌ Incorrect Captcha!" : "";
    setErrors((prev) => ({ ...prev, captcha: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.email || errors.captcha) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name, // Sending name to backend
        email,
        password,
      });

      alert(response.data.message); // Show success message
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setErrors({ register: error.response?.data?.error || "Registration failed" });
    }
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setEnteredCaptcha(""); 
  };

  return (
    <div className="container">
      <div className="blue-header" onClick={() => navigate("/")}>
      <img src="/sgsits_logo.png" alt="gs-logo" className="clickable-logo"/>
        <span className="gs">
          SHRI GOVINDRAM SEKSARIA INSTITUTE OF TECHNOLOGY & SCIENCE, INDORE
        </span>
      </div>
      <div className="reg-container">
        <div className="reg-box">
          <h3>Register</h3>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="input-group">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Captcha Field */}
            <div className="captcha-box">
              <span className="captcha-text">{captcha}</span>
              <button type="button" className="refresh-btn" onClick={refreshCaptcha}>🔄</button>
            </div>
            <input
              type="text"
              placeholder="Enter Captcha"
              value={enteredCaptcha}
              onChange={(e) => {
                setEnteredCaptcha(e.target.value);
                validateCaptcha(e.target.value);
              }}
              required
            />
            {errors.captcha && <span className="error">{errors.captcha}</span>}
            <br/>

            {/* Register Button */}
            <button type="submit" className="reg-btn">Register</button>
          </form>
          {errors.register && <span className="error">{errors.register}</span>}
          
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
