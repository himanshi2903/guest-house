import React from "react";
import "./Contact.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const Contact = () => {

  return (
    <div>
      <Header />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-content">
          <div className="contact-form">
            <h2>Bank Details</h2>
            
  <div className="bank-details">
    <p><strong>Bank Name:</strong> State Bank of India</p>
    <p><strong>Account Name:</strong> SGSITS Guest House</p>
    <p><strong>Account No:</strong> 1234567890</p>
    <p><strong>IFSC Code:</strong> SBIN0001234</p>
    <img src="/qr-code.jpg" alt="QR Code for Payment" className="qr-image" />
  </div>
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
