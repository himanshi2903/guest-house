import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { fetchAllBookings, updateBookingStatus } from "../services/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      const data = await fetchAllBookings();
      if (data) {
        setBookings(data);
      }
    };

    getBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateBookingStatus(id, newStatus);
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <h1>All Bookings</h1>
        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Room Type</th>
                <th>Rooms</th>
                <th>Beds</th>
                <th>Check-in</th>
                <th>Check-out</th>
                
                <th>Phone</th>
                <th>Booking Name</th>
                <th>Aadhar ID</th>
                <th>Transaction Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.user_id}</td>
                    <td>{booking.room_type}</td>
                    <td>{booking.num_rooms}</td>
                    <td>{booking.num_beds}</td>
                    <td>{formatDate(booking.checkin_date)} {booking.checkin_time}</td>
                    <td>{formatDate(booking.checkout_date)}</td>
                    
                    <td>{booking.phone_booking}</td>
                    <td>{booking.booking_name}</td>
                    <td>{booking.aadhar}</td>
                    <td>
                      {booking.transaction_id ? (
                        <>
                          <strong>ID:</strong> {booking.transaction_id}<br />
                          <strong>Name:</strong> {booking.sender_account_name}<br />
                          <strong>Amount:</strong> ₹{booking.amount}
                        </>
                      ) : (
                        <em>No transaction</em>
                      )}
                    </td>
                    <td>
                      <select value={booking.status} onChange={(e) => handleStatusChange(booking.id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12">No bookings found.</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
