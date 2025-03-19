const Booking = require("../models/Booking");

const bookRoom = async (req, res) => {
  try {
    const { room_type, check_in, check_out, name, mobile, aadhar } = req.body;
    const user_id = req.user?.id;

    if (
      !user_id ||
      !room_type ||
      !check_in ||
      !check_out ||
      !name ||
      !mobile ||
      !aadhar
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await Booking.bookRoom(
      user_id,
      room_type,
      check_in,
      check_out,
      name,
      mobile,
      aadhar
    );
    res.json({ message: "Booking successful!" });
  } catch (error) {
    console.error("Booking Error: ", error);
    res.status(500).json({ error: "Booking failed. Please try again" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings!" });
  }
};

module.exports = { bookRoom, getAllBookings };
