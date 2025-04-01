import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionForm.css";

const TransactionForm = ({ bookingId, onClose, onSuccess }) => {
  const [transaction, setTransaction] = useState({
    transaction_id: "",
    sender_account_name: "",
    amount: "",
  });
  const [existingTransactionId, setExistingTransactionId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/transactions/booking/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setTransaction({
            transaction_id: response.data.transaction_id,
            sender_account_name: response.data.sender_account_name,
            amount: response.data.amount,
          });
          setExistingTransactionId(response.data.id); 
        }
      } catch (err) {
        setExistingTransactionId(null); 
      }
    };

    if (bookingId && token) {
      fetchTransaction();
    }
  }, [bookingId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in.");
      return;
    }

    const payload = {
      ...transaction,
      booking_id: bookingId,
    };

    try {
      let response;
      if (existingTransactionId) {
        
        response = await axios.put(
          `http://localhost:5000/transactions/${existingTransactionId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        
        response = await axios.post(
          "http://localhost:5000/transactions",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      alert(response.data.message || "Transaction submitted successfully");
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Transaction Error:", error.response?.data || error.message);
      alert("Failed to submit transaction");
    }
  };

  return (
    <div className="transaction-form-container">
        

      <div className="transaction-form">
        <h2 className="transaction-title">
          {existingTransactionId ? "Edit Transaction" : "Add / Edit Transaction"}
        </h2>
        <div className="qr-payment-section">
  <h4>Scan QR to Pay</h4>
  <img src="/qr-code.png" alt="QR Code for Payment" className="qr-image" />
  <div className="bank-details">
    <p><strong>Bank Name:</strong> State Bank of India</p>
    <p><strong>Account Name:</strong> SGSITS Guest House</p>
    <p><strong>Account No:</strong> 1234567890</p>
    <p><strong>IFSC Code:</strong> SBIN0001234</p>
  </div>
</div>
        <form onSubmit={handleSubmit}>
          <label>Transaction ID:</label>
          <input
            type="text"
            name="transaction_id"
            value={transaction.transaction_id}
            onChange={handleChange}
            required
          />

          <label>Sender's Bank Account Name:</label>
          <input
            type="text"
            name="sender_account_name"
            value={transaction.sender_account_name}
            onChange={handleChange}
            required
          />

          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            required
          />

          <button type="submit" className="book-btn">
            {existingTransactionId ? "Update" : "Submit"} Transaction
          </button>
          <button type="button" className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
