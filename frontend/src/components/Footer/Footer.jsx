import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
        <div className="about">
          <h3>About Us</h3>
          <p>
          Narmada Guest House at SGSITS Indore offers a warm and comfortable stay for visitors, faculty, and guests. Nestled within the campus, we provide well-equipped rooms, modern amenities, and a peaceful environment to ensure a pleasant experience. Whether you're here for academic purposes or a short visit, our hospitality ensures a home-like comfort.
          </p>
        </div>

        <div className="links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/allrooms">Rooms</a></li>
            <li><a href="/facilities">Facilities</a></li>
            <li><a href="/contact">Contact</a></li>
            {/* <li><a href="/facilities">Facilities</a></li> */}
          </ul>
        </div>

        <div className="contact">
          <h3>Contact Us</h3>
          <p>Email: info@guesthouse.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Location: Indore, India</p>
        </div>
        </div>
        
      </div>

      <div className="footer-bottom">
        <p>Built by: Aaditya Deharia, Himanshi Mandloi, Laxita Thakur</p>
        <p>Batch 2026</p>
      </div>
    </footer>
  );
};

export default Footer;
