import { useEffect, useState } from "react";
import { fetchRecentBookings } from "../services/api";

const RecentBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      const data = await fetchRecentBookings();
      setBookings(data);
    };

    getBookings();
  }, []);

  return (
    <div className="recent-bookings">
      <h2>Recent Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Room Type</th>
            <th>Rooms</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.user_name}</td>
              <td>{booking.room_type}</td>
              <td>{booking.num_rooms}</td>
              <td>{booking.checkin_date}</td>
              <td>{booking.checkout_date}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookings;
