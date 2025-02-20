import React from "react";
import "./Admin.css";

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-content">
        <div className="footer-section rights">
          <p>© {new Date().getFullYear()} All Rights Reserved. SGSITS, Indore.</p>
        </div>
        <div className="footer-section credits">
          <p>Built by Aaditya Deharia, Himanshi Mandloi, Laxita Thakur</p>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
