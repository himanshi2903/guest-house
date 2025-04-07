import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import Header from "../Header/Header";
import TransactionForm from "../TransactionForm/TransactionForm";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [initialTransactionData, setInitialTransactionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setUserName(storedName || "Guest");

    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");

      if (!token || !user_id) {
        alert("You need to log in first!");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/bookings/user/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to load bookings. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleTransactionAction = async (bookingId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:5000/transactions/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInitialTransactionData(response.data); 
    } catch {
      setInitialTransactionData(null); 
    }

    setSelectedBookingId(bookingId);
    setShowTransactionForm(true);
  };

  const closeTransactionForm = () => {
    setShowTransactionForm(false);
    setSelectedBookingId(null);
    setInitialTransactionData(null);
  };

  return (
    <div className="dashboard-container">
      <Header />
      <h2>Welcome {userName}</h2>
      <h2>Your Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Booking Name</th>
              <th>Room Type</th>
              <th>Check-in Date</th>
              <th>Check-in Time</th>
              <th>Check-out Date</th>
              <th>No. of Rooms / Guests</th>
              <th>Transaction Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.booking_name}</td>
                <td>{booking.room_type}</td>
                <td>{booking.checkin_date}</td>
                <td>{booking.checkin_time}</td>
                <td>{booking.checkout_date}</td>
                <td>{booking.num_rooms || booking.num_beds}</td>
                <td>
                  <button
                    className="transaction-btn"
                    onClick={() => handleTransactionAction(booking.id)}
                  >
                    {booking.transaction_id ? "Edit Transaction" : "Add / Edit Transaction"}
                  </button>
                </td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showTransactionForm && (
        <TransactionForm
          bookingId={selectedBookingId}
          initialData={initialTransactionData}
          onClose={closeTransactionForm}
        />
      )}
    </div>
  );
};

export default UserDashboard;
