import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Welcome to our guest house! We provide a comfortable and relaxing
            stay with top-notch facilities. Experience hospitality at its best.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/allrooms">Rooms</a></li>
            <li><a href="/facilities">Facilities</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/facilities">Facilities</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: info@guesthouse.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Location: Indore, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Built by Aaditya Deharia, Himanshi Mandloi, Laxita Thakur</p>
      </div>
    </footer>
  );
};

export default Footer;
