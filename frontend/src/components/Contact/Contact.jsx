import React, { useState } from "react";
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
            <p><strong>Address:</strong> Shri Govindram Seksaria Institute of Technology and Science, Indore, Madhya Pradesh, India</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Email:</strong> info@guesthouse.com</p>
          </div>
          <div className="map-container">
        <iframe
          title="SGSITS Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.0421068837176!2d75.87362908928299!3d22.72653255059138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd3fcfa30ba1%3A0x9ff9eda278d0d80a!2sSGSITS%20Guest%20House!5e0!3m2!1sen!2sin!4v1742414244267!5m2!1sen!2sin"
          width="600"
          height="400"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
        </div>
        <div id="map" className="contact-map"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
