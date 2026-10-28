
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fs-footer">
      <div className="fs-footer-main">
        {/* Brand */}
        <div className="fs-footer-brand">

          <Link to="/" className="fs-footer-logo">
            <img
              src="/logo.png"
              alt="foodieSerendipity Cafe Logo"
              className="fs-footer-logo-image"
            />
            <span>
              Foodie<span className="fs-logo-highlight">Serendipity</span>
            </span>
          </Link>


          <p className="fs-footer-description">
            Good food, warm moments, and flavours worth coming back for.
            Discover your next favourite dish with us.
          </p>

          <div className="fs-footer-socials">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              ▶
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="fs-footer-column">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/menu">Our Menu</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="fs-footer-column">
          <h3>Get in Touch</h3>
          <ul className="fs-contact-list">
            <li>
              <span aria-hidden="true">📍</span>
              <span>Visit us for your favourite bites</span>
            </li>
            <li>
              <span aria-hidden="true">✉️</span>
              <a href="mailto:hello@foodieserendipity.com">
                hello@foodieserendipity.com
              </a>
            </li>
            <li>
              <span aria-hidden="true">🕒</span>
              <span>Fresh flavours, served with love</span>
            </li>
          </ul>
        </div>

        {/* Call to action */}
        <div className="fs-footer-cta">
          <span className="fs-footer-eyebrow">GOOD FOOD, GOOD MOOD</span>
          <h3>Something delicious is waiting for you.</h3>
          <Link to="/menu" className="fs-footer-button">
            Explore Menu <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="fs-footer-bottom">
        <p>
          © {currentYear} FoodieSerendipity. All rights reserved.
        </p>

        <a href="#top" className="fs-back-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
