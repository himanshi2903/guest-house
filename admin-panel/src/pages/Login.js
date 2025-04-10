import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css"
import "../components/Footer"
import Footer from "../components/Footer";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (res.data.isAdmin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", true);
        navigate("/dashboard");
      } else {
        setError("Access denied. Admins only.");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="login-container">
      <Header/>
      <div className="login-box">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      </div>
      
    </div>
    <Footer/>
    </div>
    
  );
};

export default Login;
