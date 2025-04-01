const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getDashboardStats, getAllBookings, updateBookingStatus, getAllUsers, updateUser, deleteUser,getBookingReports } = require("../controllers/adminController"); // ✅ Make sure these exist


const router = express.Router();

router.get("/dashboard", authMiddleware.verifyToken, getDashboardStats);

router.get("/bookings", authMiddleware.verifyToken, getAllBookings); 

router.put("/bookings/:id", authMiddleware.verifyToken, updateBookingStatus);

router.get("/users", authMiddleware.verifyToken, getAllUsers);
router.put("/users/:id", authMiddleware.verifyToken, updateUser);
router.delete("/users/:id", authMiddleware.verifyToken, deleteUser);

module.exports = router;
