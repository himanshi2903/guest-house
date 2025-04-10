import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { fetchDashboardStats } from "../services/api"; 
import "./admin.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const getStats = async () => {
      const data = await fetchDashboardStats();
      if (data) {
        setStats({
          totalBookings: data.totalBookings,
          pendingBookings: data.pendingBookings,
          totalUsers: data.totalUsers,
        });
      }
    };

    getStats();
  }, []);

  return (
    <div className="admin-container">
      <Sidebar className="sidebar"/>
      <div className="main-content">
        <Navbar />
        <h1>Welcome to Admin Dashboard</h1>
        <div className="dashboard-stats">
          <div className="card">Total Bookings: {stats.totalBookings}</div>
          <div className="card">Pending Bookings: {stats.pendingBookings}</div>
          <div className="card">Users Registered: {stats.totalUsers}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
