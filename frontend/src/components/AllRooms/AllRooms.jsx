import React, { useState, useEffect } from "react";
import "./AllRooms.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllRooms = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [availability, setAvailability] = useState({});

  const [formData, setFormData] = useState({
    booking_name: "",
    phone: "",
    checkin_date: "",
    checkin_time: "",
    checkout_date: "",
    guests: 1,
    room_type: "",
    aadhar: "",
  });

  const [transactionData, setTransactionData] = useState({
    transaction_id: "",
    sender_account_name: "",
    amount: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);

    const fetchAvailability = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/availability", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("📥 Raw Availability Response:", res.data); 

        const data = res.data;

        if (data && typeof data === "object" && !Array.isArray(data)) {
          console.log("✅ Setting availability:", data);
          setAvailability(data);
        } else if (Array.isArray(data)) {
          const mapped = {};
          data.forEach((row) => {
            mapped[row.type] = {
              total: row.total,
              occupied: row.occupied,
            };
          });
          console.log("✅ Mapped availability:", mapped);
          setAvailability(mapped);
        } else {
          throw new Error("Invalid availability format");
        }
      } catch (error) {
        console.error("❌ Failed to fetch availability:", error);
        
      }
    };

    fetchAvailability();
  }, []);

  const handleBookNow = (roomType) => {
    if (!isAuthenticated) {
      alert("Login required to book a room!");
      navigate("/login");
      return;
    }

    console.log("🟡 Room Type Clicked:", roomType);
    console.log("📦 Current Availability:", availability);

    let available = 0;
    if (roomType === "Single") {
      available = availability.single_total - availability.single_occupied;
    } else if (roomType === "Double") {
      available = availability.double_total - availability.double_occupied;
    } else if (roomType === "Hall") {
      available = availability.hall_total - availability.hall_occupied;
    }

    if (available <= 0) {
      alert(`❌ No ${roomType === "Hall" ? "beds" : "rooms"} available at the moment.`);
      return;
    }

    setFormData((prev) => ({ ...prev, room_type: roomType }));
    setShowForm(true);
  };



  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
      if (name === "checkin_date") {
        const checkinDate = new Date(value);
        const minCheckoutDate = new Date(checkinDate);
        minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
        if (prev.checkout_date && new Date(prev.checkout_date) <= checkinDate) {
          updatedForm.checkout_date = "";
        }
      }
      return updatedForm;
    });
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const bookingData = {
      user_id: localStorage.getItem("user_id"),
      booking_name: formData.booking_name,
      room_type: formData.room_type,
      num_rooms: formData.room_type === "Hall" ? 0 : formData.guests,
      num_beds: formData.room_type === "Hall" ? formData.guests : 0,
      checkin_date: formData.checkin_date,
      checkin_time: formData.checkin_time,
      checkout_date: formData.checkout_date,
      aadhar: formData.aadhar,
      phone_booking: formData.phone,
    };

    try {
      const response = await axios.post("http://localhost:5000/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("✅ Booking successful!");
      setBookingId(response.data.booking_id);
      setFormData({
        booking_name: "",
        phone: "",
        checkin_date: "",
        checkin_time: "",
        checkout_date: "",
        guests: 1,
        room_type: "",
        aadhar: "",
      });
      setShowForm(false);
      setShowTransactionForm(true);
    } catch (error) {
      console.error("Booking Error:", error.response?.data || error.message);
      alert("❌ Booking failed. Please try again.");
    }
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const transactionDetails = {
      booking_id: bookingId,
      transaction_id: transactionData.transaction_id,
      sender_account_name: transactionData.sender_account_name,
      amount: transactionData.amount,
    };

    try {
      await axios.post("http://localhost:5000/transactions", transactionDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("✅ Transaction submitted successfully!");
      setTransactionData({
        transaction_id: "",
        sender_account_name: "",
        amount: "",
      });
      setShowTransactionForm(false);
    } catch (error) {
      console.error("Transaction Error:", error.response?.data || error.message);
      alert("❌ Transaction failed. Please try again.");
    }
  };

  return (
    <div className="all-rooms">
      <Header />
      <h2 className="room-heading">OUR ROOMS</h2>
      <p className="room-subtitle">Experience comfort and luxury at SGSITS Guest House.</p>

      <div className="room-container">
        {["Single", "Double", "Hall"].map((type, index) => (
          <div className="room-card" key={index}>
            <img
              src={`/${type === "Single" ? "Non-AC-Room" : type === "Double" ? "AC-Room" : "hall"}.png`}
              alt={type}
              className="room-image"
            />
            <h3 className="room-title">{type} {type === "Hall" ? "(Per Bed)" : "Bed Room"}</h3>
            <p className="room-price">
              {type === "Single" ? "INR 1500 / Night" : type === "Double" ? "INR 2000 / Night" : "INR 300 / Bed"}
            </p>
            <button className="book-btn" onClick={() => handleBookNow(type)}>
              Book Now
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="booking-form-container">
          <div className="booking-form">
            <h2 className="booking-title">Book Your Stay</h2>
            <form onSubmit={handleBookingSubmit}>
              <label>Booking Name:</label>
              <input type="text" name="booking_name" value={formData.booking_name} onChange={handleChange} required />

              <label>Phone:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} requiredminLength="10" maxLength="10" pattern="[0-9]{10}" title="Phone number must be exactly 10 digits" />
              <label>Aadhar:</label>
              <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} required pattern="[0-9]{12}" maxLength="12" title="Aadhar must be exactly 12 digits" />

              <label>Check-in Date:</label>
              <input
                type="date"
                name="checkin_date"
                value={formData.checkin_date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
              <label>Check-in Time:</label>
              <input type="time" name="checkin_time" value={formData.checkin_time} onChange={handleChange} required />

              <label>Check-out Date:</label>
              <input
                type="date"
                name="checkout_date"
                value={formData.checkout_date}
                onChange={handleChange}
                required
                min={formData.checkin_date || new Date().toISOString().split("T")[0]}
              />

              <label>
                {formData.room_type === "Hall" ? "Number of Guests:" : "Number of Rooms:"}
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                min="1"
                onChange={handleChange}
                required
              />

              <label>Room Type:</label>
              <input type="text" value={formData.room_type} readOnly />

              <button type="submit" className="book-btn">Confirm Booking</button>
              <button type="button" className="close-btn" onClick={handleCloseForm}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showTransactionForm && (
        <div className="transaction-form-container">
          <div className="transaction-form">
            <h2 className="transaction-title">Transaction Details</h2>
            <div className="qr-payment-section">
              <h4>Scan QR to Pay</h4>
              <img src="/qr-code.jpg" alt="QR Code for Payment" className="qr-image" />
              <div className="bank-details">
                <p><strong>Bank Name:</strong> State Bank of India</p>
                <p><strong>Account Name:</strong> SGSITS Guest House</p>
                <p><strong>Account No:</strong> 1234567890</p>
                <p><strong>IFSC Code:</strong> SBIN0001234</p>
              </div>
            </div>
            <form onSubmit={handleTransactionSubmit}>
              <label>Transaction ID:</label>
              <input type="text" name="transaction_id" value={transactionData.transaction_id} onChange={handleTransactionChange} required />

              <label>Sender's Bank Account Name:</label>
              <input type="text" name="sender_account_name" value={transactionData.sender_account_name} onChange={handleTransactionChange} required />

              <label>Amount:</label>
              <input type="number" name="amount" value={transactionData.amount} onChange={handleTransactionChange} required />

              <button type="submit" className="book-btn">Submit Transaction</button>
              <button type="button" className="close-btn" onClick={() => setShowTransactionForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRooms;
