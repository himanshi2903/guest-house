const express = require("express");
const { bookRoom, getAllBookings } = require("../controllers/bookingController");
const bookingAuth = require("../middleware/bookingAuth");

const router = express.Router();

router.post("/book-room", bookingAuth, bookRoom);
router.get("/all-bookings", bookingAuth, getAllBookings);

module.exports = router;