const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
  updateUser,
  deleteUser,
  getAvailability,
  updateAvailability,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", authMiddleware.verifyToken, getDashboardStats);
router.get("/bookings", authMiddleware.verifyToken, getAllBookings);
router.put("/bookings/:id", authMiddleware.verifyToken, updateBookingStatus);
router.get("/users", authMiddleware.verifyToken, getAllUsers);
router.put("/users/:id", authMiddleware.verifyToken, updateUser);
router.delete("/users/:id", authMiddleware.verifyToken, deleteUser);

router.get("/availability", authMiddleware.verifyToken, getAvailability);
router.post("/availability", authMiddleware.verifyToken, updateAvailability); 

module.exports = router;
