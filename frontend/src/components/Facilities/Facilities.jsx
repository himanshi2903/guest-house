import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Facilities.css";
import Button from "../Button/Button";
import Header from "../Header/Header";

const facilities = [
  {
    name: "Spacious Rooms",
    description: "Comfortable and well-furnished rooms for a relaxing stay.",
  },
  {
    name: "Dining Hall",
    description: "A well-maintained dining area serving nutritious meals.",
  },
  {
    name: "Wi-Fi Connectivity",
    description: "High-speed internet access throughout the guest house.",
  },
  {
    name: "Conference Room",
    description:
      "A fully equipped conference room for meetings and discussions.",
  },
  {
    name: "24/7 Security",
    description: "Round-the-clock security to ensure guest safety.",
  },
  {
    name: "Housekeeping",
    description:
      "Daily housekeeping services to maintain hygiene and cleanliness.",
  },
];

const Facilities = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  const handleNavigation = (facilityName) => {
    const formattedId = facilityName.replace(/\s+/g, "-").toLowerCase();
    navigate(`/facilities#${formattedId}`);
    setTimeout(() => {
      const element = document.getElementById(formattedId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Ensures navigation updates before scrolling
  };

  return (
    <div>
      <Header />
      <div className="facilities-container">
        <h1 className="title">Guest House Facilities</h1>
        <div className="facilities-grid">
          {facilities.map((facility, index) => (
            <div key={index} className="facility-card">
              <h2 className="facility-title">{facility.name}</h2>
              <p className="facility-description">{facility.description}</p>
              <Button
                text="KNOW MORE"
                onClick={() => handleNavigation(facility.name)}
                className="dropdown-button"
              />
            </div>
          ))}
        </div>

        <div className="facilities-details">
          {facilities.map((facility, index) => (
            <div
              key={index}
              id={facility.name.replace(/\s+/g, "-").toLowerCase()}
              className="facility-detail"
            >
              <h2>{facility.name}</h2>
              <p>{facility.description}</p>
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Standard</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>Deluxe</td>
                    <td>$80</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
