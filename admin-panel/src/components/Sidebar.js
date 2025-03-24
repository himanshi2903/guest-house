import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
