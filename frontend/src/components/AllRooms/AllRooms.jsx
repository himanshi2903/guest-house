import React, { useState, useEffect } from "react";
import "./AllRooms.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllRooms = () => {
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleBookNow = (roomType) => {
    if (!isAuthenticated) {
      alert("Login required to book a room!");
      navigate("/login");
    } else {
      setFormData((prev) => ({
        ...prev,
        room_type: roomType,
      }));
      setShowForm(true);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedForm = { ...prev, [name]: value };

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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to proceed.");
      navigate("/login");
      return;
    }

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

    console.log("📤 Sending booking data:", bookingData);

    try {
      const response = await axios.post("http://localhost:5000/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(" Booking Response:", response.data);
      alert("✅ Booking successful!");

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
    } catch (error) {
      console.error("Booking Error:", error.response?.data || error.message);
      alert("❌ Booking failed. Please try again.");
    }
  };

  return (
    <div className="all-rooms">
      <Header />
      <h2 className="room-heading">OUR ROOMS</h2>
      <p className="room-subtitle">Experience comfort and luxury at SGSITS Guest House.</p>

      <div className="room-container">
        <div className="room-card">
          <img src="/Non-AC-Room.png" alt="Single Room" className="room-image" />
          <h3 className="room-title">Single Bed Room</h3>
          <p className="room-price">INR 1500 / Night</p>
          <button className="book-btn" onClick={() => handleBookNow("Single")}>Book Now</button>
        </div>

        <div className="room-card">
          <img src="/AC-Room.png" alt="Double Room" className="room-image" />
          <h3 className="room-title">Double Bed Room</h3>
          <p className="room-price">INR 2000 / Night</p>
          <button className="book-btn" onClick={() => handleBookNow("Double")}>Book Now</button>
        </div>

        <div className="room-card">
          <img src="/hall.png" alt="Hall" className="room-image" />
          <h3 className="room-title">Hall (Per Bed)</h3>
          <p className="room-price">INR 300 / Bed</p>
          <button className="book-btn" onClick={() => handleBookNow("Hall")}>Book Now</button>
        </div>
      </div>

      {showForm && (
        <div className="booking-form-container">
          <div className="booking-form">
            <h2 className="booking-title">Book Your Stay</h2>
            <form onSubmit={handleBookingSubmit}>
              <label>Booking Name:</label>
              <input type="text" name="booking_name" value={formData.booking_name} onChange={handleChange} required />

              <label>Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required minLength="10" maxLength="10"  title="Mobile number must be 10 digits" />

              <label>Aadhar Number:</label>
              <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} required maxLength="12" pattern="[0-9]{12}" title="Aadhar number must be 12 digits" />

              <label>Check-in Date:</label>
              <input
                type="date"
                name="checkin_date"
                value={formData.checkin_date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} 
                required
              />

              <label>Check-in Time:</label>
              <input type="time" name="checkin_time" value={formData.checkin_time} onChange={handleChange} required />

              <label>Check-out Date:</label>
              <input
                type="date"
                name="checkout_date"
                value={formData.checkout_date}
                onChange={handleChange}
                min={formData.checkin_date ? new Date(new Date(formData.checkin_date).getTime() + 86400000).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                required
              />

              <label>Guests:</label>
              <input type="number" name="guests" value={formData.guests} min="1" onChange={handleChange} required />

              <label>Room Type:</label>
              <input type="text" value={formData.room_type} readOnly />

              <button type="submit" className="book-btn">Confirm Booking</button>
              <button type="button" className="close-btn" onClick={handleCloseForm}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRooms;
