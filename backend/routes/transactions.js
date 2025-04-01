const express = require("express");
const router = express.Router();
const {
  createTransaction,
  updateTransaction,
  getTransactionByBookingId
} = require("../controllers/transactionController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, createTransaction);
router.put("/:id", verifyToken, updateTransaction);
router.get("/booking/:booking_id", verifyToken, getTransactionByBookingId);

module.exports = router;
