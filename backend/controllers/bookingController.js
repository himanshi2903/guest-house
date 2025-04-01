const db = require("../config/db");

const createBooking = (req, res) => {
  const {
    user_id,
    room_type,
    num_rooms,
    num_beds,
    checkin_date,
    checkin_time,
    checkout_date,
    aadhar,
    phone_booking,
    booking_name
  } = req.body;

  if (
    !user_id ||
    !room_type ||
    !checkin_date ||
    !checkout_date ||
    !aadhar ||
    !phone_booking ||
    !booking_name
  ) {
    return res.status(400).json({
      message: "All required fields must be provided, including Aadhar and phone number."
    });
  }

  const query = `
    INSERT INTO bookings 
    (user_id, room_type, num_rooms, num_beds, checkin_date, checkin_time, checkout_date, aadhar, phone_booking, booking_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,
    room_type,
    num_rooms,
    num_beds,
    checkin_date,
    checkin_time,
    checkout_date,
    aadhar,
    phone_booking,
    booking_name
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("❌ Booking Error:", err.message);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }

    const booking_id = result.insertId; 
    res.status(201).json({
      message: "✅ Booking Successful!",
      booking_id,
    });
  });
};


const getUserBookings = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const query = `
    SELECT id, user_id, room_type, num_rooms, num_beds,
           DATE_FORMAT(checkin_date, '%Y-%m-%d') AS checkin_date,
           TIME_FORMAT(checkin_time, '%h:%i %p') AS checkin_time,
           DATE_FORMAT(checkout_date, '%Y-%m-%d') AS checkout_date,
           status, phone_booking, booking_name
    FROM bookings
    WHERE user_id = ?
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Server error" });
    }

    res.status(200).json(results);
  });
};

module.exports = { createBooking, getUserBookings };
