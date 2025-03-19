const db = require("../config/db");

class Booking {
  static async bookRoom(
    user_id,
    room_type,
    check_in,
    check_out,
    name,
    mobile,
    aadhar
  ) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO bookings (user_id, room_type, check_in, check_out, name, mobile, aadhar)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

      db.query(sql, [user_id, room_type, check_in, check_out, name, mobile, aadhar], (err, result) => {
        if(err) {
            reject(err);
        } else {
            resolve(result);
        }
      });
    });
  }

  static async getAllBookings() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM bookings", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Booking;