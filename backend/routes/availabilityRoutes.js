const express = require("express");
const router = express.Router();
const {
  getAvailability,
  updateAvailability,
} = require("../controllers/adminController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getAvailability); 
router.post("/", verifyToken, updateAvailability); 

module.exports = router;
