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
    booking_name,
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
      message: "All required fields must be provided, including Aadhar and phone number.",
    });
  }

  // Step 1: Check availability (but don't update it)
  db.query("SELECT * FROM availability", (err, results) => {
    if (err) {
      console.error("Error checking availability:", err);
      return res.status(500).json({ message: "Server error checking availability" });
    }

    const availabilityMap = {};
    results.forEach((row) => {
      availabilityMap[row.type] = {
        total: row.total,
        occupied: row.occupied,
      };
    });

    let available;
    if (room_type === "Single") {
      available = availabilityMap.single.total - availabilityMap.single.occupied;
      if (available < num_rooms) {
        return res.status(400).json({ message: "❌ Not enough Single Rooms available" });
      }
    } else if (room_type === "Double") {
      available = availabilityMap.double.total - availabilityMap.double.occupied;
      if (available < num_rooms) {
        return res.status(400).json({ message: "❌ Not enough Double Rooms available" });
      }
    } else if (room_type === "Hall") {
      available = availabilityMap.hall.total - availabilityMap.hall.occupied;
      if (available < num_beds) {
        return res.status(400).json({ message: "❌ Not enough Hall beds available" });
      }
    } else {
      return res.status(400).json({ message: "❌ Invalid room type" });
    }

    // Step 2: Insert booking
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
      booking_name,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("❌ Booking Error:", err.message);
        return res.status(500).json({ message: "Server error. Please try again later." });
      }

      const booking_id = result.insertId;

      // ✅ Step 3: Just respond without updating occupied count
      res.status(201).json({
        message: "✅ Booking Successful!",
        booking_id,
      });
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
