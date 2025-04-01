const db = require("../config/db");

const createTransaction = (req, res) => {
  const { user_id } = req.user;
  const { booking_id, transaction_id, sender_account_name, amount } = req.body;

  if (!booking_id || !transaction_id || !sender_account_name || !amount) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query("SELECT * FROM bookings WHERE id = ? AND user_id = ?", [booking_id, user_id], (err, bookingResult) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (bookingResult.length === 0) {
      return res.status(404).json({ error: "Booking not found or unauthorized" });
    }

    db.query("SELECT * FROM transactions WHERE booking_id = ?", [booking_id], (err, existingTransaction) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (existingTransaction.length > 0) {
        return res.status(400).json({ error: "Transaction already exists for this booking" });
      }

      db.query(
        "INSERT INTO transactions (booking_id, transaction_id, sender_account_name, amount) VALUES (?, ?, ?, ?)",
        [booking_id, transaction_id, sender_account_name, amount],
        (err) => {
          if (err) return res.status(500).json({ error: "Failed to insert transaction" });
          res.status(201).json({ message: "✅ Transaction added successfully" });
        }
      );
    });
  });
};


const updateTransaction = (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const { transaction_id, sender_account_name, amount } = req.body;

  if (!transaction_id || !sender_account_name || !amount) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    SELECT transactions.*, bookings.user_id
    FROM transactions
    JOIN bookings ON transactions.booking_id = bookings.id
    WHERE transactions.id = ? AND bookings.user_id = ?
  `;

  db.query(query, [id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found or unauthorized" });
    }

    db.query(
      "UPDATE transactions SET transaction_id = ?, sender_account_name = ?, amount = ? WHERE id = ?",
      [transaction_id, sender_account_name, amount, id],
      (err) => {
        if (err) return res.status(500).json({ error: "Failed to update transaction" });
        res.status(200).json({ message: "✅ Transaction updated successfully" });
      }
    );
  });
};

const getTransactionByBookingId = (req, res) => {
  const { user_id } = req.user;
  const { booking_id } = req.params;

  const query = `
    SELECT transactions.*
    FROM transactions
    JOIN bookings ON transactions.booking_id = bookings.id
    WHERE transactions.booking_id = ? AND bookings.user_id = ?
  `;

  db.query(query, [booking_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found or unauthorized" });
    }

    res.status(200).json(result[0]);
  });
};

module.exports = {
  createTransaction,
  updateTransaction,
  getTransactionByBookingId,
};
