import React, { useState, useEffect, useRef } from "react";
import "./contact.css";

const Contact = () => {
  const contactRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "Table Reservation",
    message: "",
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.15,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elements = contactRef.current?.querySelectorAll(".scroll-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page" ref={contactRef}>
      {/* CONTACT HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-kicker">GET IN TOUCH</span>
          <h1 className="contact-title">We'd Love to Save You a Seat</h1>
          <p className="contact-subtitle">
            Got a query about our daily seasonal bakes, private gatherings, or dietary requests?
            Send us a note or drop by in person.
          </p>
        </div>
      </section>

      {/* QUICK INFO BUBBLES */}
      <section className="info-bubbles-section">
        <div className="contact-container info-bubbles-grid">
          <div className="info-bubble scroll-reveal drop-card" style={{ "--delay": "1" }}>
            <span className="bubble-icon">📍</span>
            <h3>Our Hearth</h3>
            <p>B3 Devratna nagar, Sion, Mumbai</p>
            <span className="bubble-note">Complimentary patio parking</span>
          </div>

          <div className="info-bubble scroll-reveal drop-card" style={{ "--delay": "2" }}>
            <span className="bubble-icon">⏰</span>
            <h3>Hours of Brew</h3>
            <p>Mon – Fri: 10:30 AM – 8:00 PM</p>
            <p>Sat – Sun: 11:00 AM – 9:30 PM</p>
          </div>

          <div className="info-bubble scroll-reveal drop-card" style={{ "--delay": "3" }}>
            <span className="bubble-icon">💌</span>
            <h3>Say Hello</h3>
            <p>hello@foodieserendipity.com</p>
            <p>+91 12234-89012</p>
          </div>
        </div>
      </section>

      {/* FORM & FAQ GRID */}
      <section className="contact-main-section">
        <div className="contact-container contact-split">
          {/* INTERACTIVE FORM */}
          <div className="form-card scroll-reveal drop-card">
            <span className="section-label">SEND A NOTE</span>
            <h2>Leave a message for our kitchen</h2>

            {submitted ? (
              <div className="form-success-banner">
                <span className="success-icon">☕✨</span>
                <h3>Thank you, {formData.name || "friend"}!</h3>
                <p>
                  Your message has reached our team. We will get back to you within a few hours.
                </p>
                <button
                  type="button"
                  className="reset-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="kitchen-form">
                <div className="input-row">
                  <div className="field-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="e.g. Maya Chen"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="e.g. maya@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="field-group">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="e.g. (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="occasion">Inquiry Type</label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                    >
                      <option>Table Reservation</option>
                      <option>Private Event / Party</option>
                      <option>Dietary & Allergen Question</option>
                      <option>Wholesale / Bakery Pre-order</option>
                      <option>Just Saying Hi!</option>
                    </select>
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us about the day, time, party size, or anything special we can prepare for you..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="submit-form-btn">
                  Send to Kitchen →
                </button>
              </form>
            )}
          </div>

          {/* FAQ & HELPFUL DETAILS */}
          <div className="faq-side scroll-reveal slide-right">
            <span className="section-label">FAQS & DETAILS</span>
            <h2>Helpful Things to Know</h2>

            <div className="faq-item">
              <h4>🐾 Are furry companions welcome?</h4>
              <p>
                Yes! Our garden patio is 100% pet-friendly, complete with fresh water bowls and
                our homemade peanut butter dog biscuits.
              </p>
            </div>

            <div className="faq-item">
              <h4>🌱 Do you cater to vegan or gluten-free diets?</h4>
              <p>
                Absolutely. Half our menu is plant-forward, and we always feature freshly baked
                almond-flour and oat-flour pastries labeled every morning.
              </p>
            </div>

            <div className="faq-item">
              <h4>🎂 Can I pre-order whole cakes or sourdough loaves?</h4>
              <p>
                We bake full artisanal cakes and sandwich loaves with a 48-hour heads-up. Mention
                it in the message box or give our counter a quick ring!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;