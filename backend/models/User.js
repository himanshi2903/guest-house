const db = require("../config/db");

class User {
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async createUser(name, email, hashedPassword, isAdmin) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, isAdmin],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
}

module.exports = User;