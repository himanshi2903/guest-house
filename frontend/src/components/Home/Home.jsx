import React from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../Header/Header";
import Button from "../Button/Button";
import Slideshow from "../Slideshow/Slideshow";
import Footer from "../Footer/Footer";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate(); 

  const images = [
    { src: "AC-Room.png", text: "AC & Non-AC Rooms" },
    { src: "dining.png", text: "Dining Area" },
    { src: "corridor.png", text: "Wi-Fi Connectivity" },
    { src: "living2.png", text: "Spacious Hall" },
    { src: "hall2.png", text: "Housekeeping" },
  ];

  const img = [
    { src: "hall.png", title: "Spacious Rooms" },
    { src: "dining1.png", title: "Dining Hall" },
    { src: "corridor.png", title: "Wi-Fi Connectivity" },
    { src: "living.png", title: "Living Room" },
    { src: "gym.png", title: "Gym Area" },
    { src: "hall-w.png", title: "Housekeeping" },
  ];
  return (
    <div className="home">
      <Header />
      <div className="image-container">
        <img src="out3.png" alt="gsits" />
        <div className="overlay-content">
          <h3>
            Welcome to, <br />
            <span>Narmada Guest House</span>
          </h3>
          <Button text="View Rooms"onClick={() => navigate("/allrooms")} />
        </div>
      </div>

      <div className="slideshow">
        <h3>WHAT WE HAVE TO OFFER</h3>
        <Slideshow images={images} />
      </div>

      <div className="brief">
        <h3>THE GUEST HOUSE</h3>
        <p>
        Narmada Guest House at SGSITS Indore provides a warm, comfortable, and convenient stay for visitors, faculty, and guests.
         Strategically located in the heart of Indore, near the railway station, the guest house is nestled within the lush, green,
          and well-maintained campus of SGSITS. Our well-equipped rooms, modern amenities, and serene surroundings create a peaceful
           environment, ensuring a pleasant and relaxing experience. Whether you're visiting for academic engagements, professional work,
            or a short stay, our hospitality ensures a home-like comfort with exceptional cleanliness and a welcoming atmosphere.
        </p>
      </div>

      <div className="charges-container">
        <h3>CHARGES DETAILS</h3>
        <table>
          <thead>
            <tr>
              <th>S. NO.</th>
              <th>TYPE</th>
              <th>TYPE OF GUEST</th>
              <th>CAPACITY</th>
              <th>CHARGES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Single-Bed Room</td>
              <td>Visitor</td>
              <td>1</td>
              <td>Rs.1500/night</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Double-Bed Room</td>
              <td>Visitor</td>
              <td>2</td>
              <td>Rs.2000/night</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Hall</td>
              <td>Visitor</td>
              <td>2 or more</td>
              <td>Rs.300/bed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="facility-glimpse">
        <h2>GLIMPSES OF GUEST HOUSE FACILITY</h2>
        <div className="facility-images">
          {img.map((img, index) => (
            <div key={index} className="facility-card">
              <img src={img.src} alt={img.title} />
              <div className="overlay">
                <h4>{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="team-section">
        <h3>MEET OUR TEAM</h3>
        <div className="team-members">
          <div className="team-member">
            <div className="team-photo">
              <img src="man.jpeg" alt={img.title} />
            </div>
            <p>
              <strong>Prof. Ravi Jatola</strong>
            </p>
            <p>Professor in-charge</p>
          </div>
          <div className="team-member">
            <div className="team-photo">
              <img src="caretaker.png" alt={img.title}/>
            </div>
            <p>
              <strong>Prakash Pal</strong>
            </p>
            <p>Care Taker</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
