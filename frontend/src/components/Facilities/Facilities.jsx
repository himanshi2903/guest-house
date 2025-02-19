import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Facilities.css";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const facilities = [
  {
    name: "Spacious Rooms",
    description: "Comfortable and well-furnished rooms for a relaxing stay.",
    image: "https://plus.unsplash.com/premium_photo-1661963657190-ecdd1ca794f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BhY2lvdXMlMjByb29tc3xlbnwwfHwwfHx8MA%3D%3D", // Update with actual image paths
  },
  {
    name: "Dining Hall",
    description: "A well-maintained dining area serving nutritious meals.",
    image: "https://images.unsplash.com/photo-1602081112620-4da569dda684?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGluaW5nJTIwaGFsbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Wi-Fi Connectivity",
    description: "High-speed internet access throughout the guest house.",
    image: "https://plus.unsplash.com/premium_photo-1687558345854-a07ac0be8cd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lmaXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Conference Room",
    description:
      "A fully equipped conference room for meetings and discussions.",
    image: "https://plus.unsplash.com/premium_photo-1661879435429-a396d927c686?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uZmVyZW5jZSUyMHJvb218ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "24/7 Security",
    description: "Round-the-clock security to ensure guest safety.",
    image: "https://images.unsplash.com/photo-1617897711385-df9c86b7dfe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2N0dnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Housekeeping",
    description:
      "Daily housekeeping services to maintain hygiene and cleanliness.",
    image: "https://plus.unsplash.com/premium_photo-1679920025550-75324e59680f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2VrZWVwaW5nfGVufDB8fDB8fHww",
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
            <div
              key={index}
              className="facility-card"
              style={{
                backgroundImage: `url(${facility.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
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
      <Footer />
    </div>
  );
};

export default Facilities;
