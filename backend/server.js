require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "laxita82", 
    database: "guesthouse",
  });

  db.connect((err) => {
    if(err) throw err;
    console.log("MySQL Connected...");
  });

  // Register User
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(400).json({ error: "User already exists" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });

  // Login User
app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err || results.length === 0)
        return res.status(400).json({ error: "Invalid email or password" });
  
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  
      const token = jwt.sign({ id: user.id, role: user.role }, "secretkey", { expiresIn: "1h" });
      res.json({ message: "Login successful", token });
    });
  });

  // Get All Rooms
app.get("/allrooms", (req, res) => {
    db.query("SELECT * FROM rooms", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  // Admin: Add Room
app.post("/addrooms", (req, res) => {
    const { name, room_type, short_description, full_description, images } = req.body;
    const sql = "INSERT INTO rooms (name, room_type, short_description, full_description, images) VALUES (?, ?, ?, ?, ?)";
  
    db.query(sql, [name, room_type, short_description, full_description, JSON.stringify(images)], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Room added successfully" });
    });
  });
  
  app.listen(5000, () => console.log("Server running on port 5000"));