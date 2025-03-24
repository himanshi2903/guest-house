const db = require("../config/db");

const createBooking = async (req, res) => {
  try {
    const { user_id, room_type, num_rooms, num_beds, checkin_date, checkin_time, checkout_date, aadhar, phone_booking, booking_name } = req.body;

    if (!user_id || !room_type || !checkin_date || !checkout_date || !aadhar || !phone_booking || !booking_name) {
      return res.status(400).json({ message: "All required fields must be provided, including Aadhar and phone number." });
    }

    const query = `
      INSERT INTO bookings (user_id, room_type, num_rooms, num_beds, checkin_date, checkin_time, checkout_date, aadhar, phone_booking, booking_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    await db.execute(query, [user_id, room_type, num_rooms, num_beds, checkin_date, checkin_time, checkout_date, aadhar, phone_booking, booking_name]);

    res.status(201).json({ message: "✅ Booking successful!" });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const query = `
      SELECT id, user_id, room_type, num_rooms, num_beds, 
             DATE_FORMAT(checkin_date, '%Y-%m-%d') AS checkin_date, 
             TIME_FORMAT(checkin_time, '%h:%i %p') AS checkin_time, 
             DATE_FORMAT(checkout_date, '%Y-%m-%d') AS checkout_date,
             status,phone_booking,booking_name
      FROM bookings WHERE user_id = ?
    `;

    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { createBooking, getUserBookings };
