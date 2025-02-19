import React, { useState, useEffect } from "react";
import "./Contact.css";
import Header from "../Header/Header";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    const existingScript = document.getElementById("google-maps-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.id = "google-maps-script";
      script.onload = () => {
        if (window.google) {
          initMap();
        }
      };
      document.body.appendChild(script);
    } else {
      if (window.google) {
        initMap();
      }
    }
  }, []);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 28.6139, lng: 77.2090 }, // Replace with actual guest house coordinates
      zoom: 15,
    });

    new window.google.maps.Marker({
      position: { lat: 28.6139, lng: 77.2090 }, // Replace with actual coordinates
      map,
      title: "Guest House Location",
    });
  };

  return (
    <div>
      <Header />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-content">
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button text="Send Message"/>
            </form>
          </div>
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p><strong>Address:</strong> Government College Guest House, Main Road, City</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Email:</strong> info@guesthouse.com</p>
          </div>
        </div>
        <div id="map" className="contact-map"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
