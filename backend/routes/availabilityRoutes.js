const express = require("express");
const router = express.Router();
const {
  getAvailability,
  updateAvailability,
} = require("../controllers/adminController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getAvailability); // protect if admin-only
router.post("/", verifyToken, updateAvailability); // ← Change to POST to match frontend

module.exports = router;
