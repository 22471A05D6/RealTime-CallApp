import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>CK Ministries Church</h4>
            <div className="social-icons" aria-label="Social links">
              <a
                href="https://instagram.com/"
                className="social-icon instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
              <a
                href="https://wa.me/+9193819965746?text=hi"
                className="social-icon whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
              </a>
              <a
                href="mailto:info@kkministrieschurch.com"
                className="social-icon mail"
                aria-label="Email"
                title="Email"
              >
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              </a>
            </div>
            <p>Empowering lives through faith, fostering community, and serving humanity with divine purpose.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              
            </ul>
          </div>
          <div className="footer-section">
            <h4>Service Times</h4>
            <ul>
              <li>Sunday: 11:00 AM & 1:00 PM</li>
              <li>Wednesday: 7:00 PM</li>
              <li>Friday: 7:00 PM</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="contact-list">
              <li>
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                <span>Ravipadu,Narasaraopeta,AP</span>
              </li>
              <li>
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <span>+91 XXXXXXXXX</span>
              </li>
              <li>
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                <span>info@kkministrieschurch.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 cK Ministries Church. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
