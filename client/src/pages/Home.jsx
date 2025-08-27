import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1>
              <span className="title-line-1">Welcome to</span>
              <span className="title-line-2">KK Ministries Church</span>
            </h1>
            <p>Empowering lives through faith, fostering community, and serving humanity with divine purpose</p>
            <div className="hero-buttons">
              <a href="#contact" className="cta-button primary with-icon">
                <i className="fa-solid fa-users" aria-hidden="true"></i>
                <span>Join Community</span>
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-image">
              <img 
                src="https://images.pexels.com/photos/1343325/pexels-photo-1343325.jpeg?_gl=1*1z714u*_ga*NTM3Njg3NzI3LjE3NTMxMjE2NTY.*_ga_8JE65Q40S6*czE3NTU3NzAyNzgkbzQkZzEkdDE3NTU3NzA3NzgkajU5JGwwJGgw" 
                alt="KK Ministries Church Sanctuary" 
              />
            </div>
          </div>
        </div>
      </header>

      <section className="welcome-section">
        <div className="container">
          <div className="welcome-content">
            <div className="welcome-text welcome-card">
              <h2>About Our Ministry</h2>
              <p className="welcome-description">
                KK Ministries Church stands as a beacon of hope and spiritual guidance in our community. We are committed to delivering biblically-sound teachings, fostering meaningful relationships, and extending God's love through comprehensive ministry programs designed to meet the diverse needs of our congregation and community.
              </p>
              <div className="welcome-features">
                <div className="welcome-feature">
                  <span className="feature-icon"><i className="fa-solid fa-book" aria-hidden="true"></i></span>
                  <span>Scripture-Based Ministry</span>
                </div>
                <div className="welcome-feature">
                  <span className="feature-icon"><i className="fa-solid fa-people-group" aria-hidden="true"></i></span>
                  <span>Community Engagement</span>
                </div>
                <div className="welcome-feature">
                  <span className="feature-icon"><i className="fa-solid fa-music" aria-hidden="true"></i></span>
                  <span>Contemporary Worship Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Join Our Congregation</h2>
          <p>Experience the transformative power of faith in a welcoming community dedicated to spiritual growth, meaningful relationships, and service to others</p>
          <div className="cta-buttons">
            <a href="#contact" className="cta-button primary with-icon">
              <i className="fa-solid fa-users" aria-hidden="true"></i>
              <span>Join Community</span>
            </a>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="contact-item">
                <span className="contact-icon"><i className="fa-solid fa-location-dot" aria-hidden="true"></i></span>
                <div>
                  <strong>Church Address</strong>
                  <p>123 Church Street, City, State 12345</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><i className="fa-solid fa-phone" aria-hidden="true"></i></span>
                <div>
                  <strong>Office Phone</strong>
                  <p>(555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><i className="fa-solid fa-envelope" aria-hidden="true"></i></span>
                <div>
                  <strong>Email Address</strong>
                  <p>info@kkministrieschurch.com</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <form className="message-form">
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email Address" />
                <textarea placeholder="Your Message" rows="4"></textarea>
                <button type="submit" className="submit-button">Submit Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/+919381965746?text=hi"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
      </a>
    </div>
  );
};

export default Home;