import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Facilities.css";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Slideshow from "../Slideshow/Slideshow";

const facilities = [
  {
    name: "Spacious Rooms",
    description:
      "Well-furnished, spacious rooms designed for a comfortable stay. Guests can choose between air-conditioned (AC) and non-air-conditioned (Non-AC) rooms, each equipped with cozy double beds and attached washrooms for convenience. Additionally, we provide spacious halls for group stays or events. However, please note that hall accommodations may be shared with other guests opting for the same facility. Whether you prefer a private room or a shared space, we ensure a clean, peaceful, and relaxing environment for all our visitors..",
    image: "AC-Room.png",
    pricing: [
      { service: "AC Rooms", price: "Rs. 1500/night" },
      { service: "Non-AC Rooms", price: "Rs. 1500/night" },
      { service: "Hall", price: "Rs. 300/bed" },
    ],
    slideshowImages: [
      { src: "AC-Room.png" },
      { src: "Non-AC-Room.png" },
      { src: "hall.png" },
    ],
  },
  {
    name: "Dining Hall",
    description:
      "Warm and nutritious meals are served daily at minimal rates from the hostel mess. Our dining hall provides a clean and comfortable space for guests to enjoy wholesome food, ensuring a healthy and satisfying experience during their stay.",
    image: "dining1.png",
    pricing: [{ service: "Lunch/Dinner", price: "Rs. 50/plate" }],
    slideshowImages: [
      { src: "dining.png" },
      { src: "dining1.png" },
    ],
  },
  {
    name: "Wi-Fi Connectivity",
    description:
      "Enjoy seamless high-speed internet access throughout the guest house. Whether for work, studies, or leisure, our reliable Wi-Fi ensures uninterrupted connectivity, allowing guests to stay connected at all times.",
    image: "corridor.png",
    slideshowImages: [
      { src: "corridor.png" },
    ],
  },
  {
    name: "Living Room",
    description:
      "A spacious and well-furnished living room equipped with plush sofas and a large TV, creating a warm and inviting space for relaxation. Whether you want to unwind after a long day, catch up on your favorite shows, or socialize with fellow guests, this common area offers a comfortable and homely environment for all.",
    image: "living2.png",
    slideshowImages: [
      { src: "living.png" },
      { src: "living2.png" },
    ],
  },
  {
    name: "Fitness & Outdoor Space",
    description:
      "Our guest house provides a peaceful outdoor space perfect for morning walks, light exercises, and relaxation. While a treadmill is available for basic fitness needs, the beautifully maintained outdoor area allows guests to enjoy fresh air and scenic surroundings, making it an ideal spot for unwinding and staying active.",
    image: "gym.png",
    slideshowImages: [
      { src: "gym.png" },
      { src: "out3.png" },
      { src: "out.png" },
      { src: "out2.png" },
    ],
  },
  {
    name: "Housekeeping",
    description:
      "Our dedicated housekeeping team ensures a clean and well-maintained environment throughout the guest house. Rooms and common areas are cleaned regularly, with fresh linens provided to maintain hygiene standards. Guests can enjoy a comfortable and tidy stay, with prompt assistance available for any housekeeping requests.",
    image: "hall1.png",
    slideshowImages: [
      { src: "hall-w.png" },
      { src: "hall3.png" },
      { src: "hall2.png" },
    ],
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
              

              {/* Render pricing table only if pricing exists */}
              {facility.pricing && (
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facility.pricing.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.service}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <br/>
              <h3>GLIMPSES:</h3>
              {facility.slideshowImages && (
                <Slideshow images={facility.slideshowImages} />
              )}
              <br/>
              <hr/>
            </div>
            
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Facilities;
