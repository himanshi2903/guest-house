import React from "react";
import "./AdminDashboard";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const AdminDashboard = () => {
    return (
        <div className="dashboard-container">
            <AdminNavbar />

            <AdminFooter />
        </div>
    );
};

export default AdminDashboard;