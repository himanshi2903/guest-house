import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Login.css";
import axios from "axios";

const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Login = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [errors, setErrors] = useState({});

  const validateCaptcha = (value) => {
    let error = value !== captcha ? "❌ Incorrect Captcha!" : "";
    setErrors((prev) => ({ ...prev, captcha: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id); 
        localStorage.setItem("name", response.data.name);
        
        console.log("Stored user_id:", localStorage.getItem("user_id")); 
  
        alert("✅ Login successful!"); 
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.error || "❌ Login failed! Please try again."); 
      console.error("Login failed:", error.response?.data?.error || error.message);
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
      <div className="login-container">
        <div className="login-box">
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            {/* Captcha Field */}
            <div className="captcha-box">
              <span className="captcha-text">{captcha}</span>
              <button
                type="button"
                className="refresh-btn"
                onClick={refreshCaptcha}
              >
                🔄
              </button>
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
            <br />

            {/* Login Button */}
            <button type="submit" className="login-btn">Login</button>
          </form>

          {errors.login && <span className="error">{errors.login}</span>}

          <p className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
