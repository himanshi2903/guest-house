import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const Availability = () => {
  const [availability, setAvailability] = useState(null); 

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/admin/availability", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
     
      if (res.data && typeof res.data === "object") {
        setAvailability(res.data);
      } else {
        throw new Error("Invalid availability format received");
      }
    } catch (error) {
      console.error("Error loading availability:", error);
      alert("❌ Failed to fetch availability data");
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvailability((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const updates = ["single", "double", "hall"].map((type) => ({
        type,
        total: availability[`${type}_total`],
        occupied: availability[`${type}_occupied`],
      }));

      await axios.post("http://localhost:5000/admin/availability", updates, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Availability updated!");
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Could not update availability");
    }
  };

  const getAvailable = (type) => {
    const total = availability?.[`${type}_total`] || 0;
    const occupied = availability?.[`${type}_occupied`] || 0;
    return Math.max(total - occupied, 0);
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <h2>Update Room and Hall Availability</h2>

        {availability ? (
          <div className="availability-form">
            {["single", "double", "hall"].map((type) => (
              <div key={type} className="availability-section">
                <h3>
                  {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                  {type !== "hall" ? "Room" : "Bed"}
                </h3>
                <label>Total:</label>
                <input
                  type="number"
                  name={`${type}_total`}
                  value={availability[`${type}_total`]}
                  onChange={handleChange}
                />
                <label>Occupied:</label>
                <input
                  type="number"
                  name={`${type}_occupied`}
                  value={availability[`${type}_occupied`]}
                  onChange={handleChange}
                />
                <p>
                  <strong>Available:</strong> {getAvailable(type)}
                </p>
              </div>
            ))}
            <button className="save-btn" onClick={handleSubmit}>
              Save Availability
            </button>
          </div>
        ) : (
          <p>Loading availability...</p>
        )}
      </div>
    </div>
  );
};

export default Availability;
