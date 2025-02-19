import React from "react";
import "./Policy.css";
import Header from "../Header/Header";

const policies = [
  {
    title: "Check-in & Check-out",
    description:
      "Check-in time: 12:00 PM | Check-out time: 10:00 AM. Early check-in and late check-out are subject to availability and may incur additional charges.",
  },
  {
    title: "Booking & Cancellation",
    description:
      "Reservations must be confirmed at least 48 hours in advance. Cancellations made within 24 hours of check-in will incur a charge equivalent to one night's stay.",
  },
  {
    title: "Guest Conduct",
    description:
      "All guests are expected to maintain decorum and adhere to college rules. Loud noise and disruptive behavior are strictly prohibited.",
  },
  {
    title: "Smoking & Alcohol",
    description:
      "Smoking and consumption of alcohol are strictly prohibited within the guest house premises.",
  },
  {
    title: "Security & Safety",
    description:
      "Guests are responsible for their belongings. The guest house management will not be liable for any loss or theft. Security personnel are available 24/7.",
  },
  {
    title: "Visitors & Extra Guests",
    description:
      "Visitors are allowed only in common areas. Staying overnight without prior approval is not permitted.",
  },
];

const PolicyPage = () => {
  return (
    <div>
      <Header />
      <div className="policy-container">
        <h1 className="policy-title">Guest House Policies</h1>
        <div className="policy-list">
          {policies.map((policy, index) => (
            <div key={index} className="policy-card">
              <h2 className="policy-heading">{policy.title}</h2>
              <p className="policy-description">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
