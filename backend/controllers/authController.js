const bcrypt = require("bcryptjs");
const db = require("../config/db");
const generateToken = require("../utils/generateTokens");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(400).json({ error: "User already exists" });
      res.status(201).json({ message: "User registered successfully" });
    }
  );
};
