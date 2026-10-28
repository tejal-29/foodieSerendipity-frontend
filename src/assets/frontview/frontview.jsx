import React, { useEffect, useState, useRef } from "react";
import "./frontview.css";

// Keep the same hero images from the existing project.
import Bg from "../frontview/images/bg1.jpg";
import Image1 from "../frontview/images/cafe1.jpg";
import Image2 from "../frontview/images/cafe2.jpg";
import Image3 from "../frontview/images/cafe3.jpg";
import Image4 from "../frontview/images/cafe4.jpg";
import Image5 from "../frontview/images/cafe5.jpg";
import Image6 from "../frontview/images/cafe6.jpg";

const Frontview = () => {
  const images = [
    { src: Bg, alt: "FoodieSerendipity café food and dining experience." },
    { src: Image1, alt: "Freshly prepared food at FoodieSerendipity." },
    { src: Image2, alt: "A delicious dish served at FoodieSerendipity." },
    { src: Image3, alt: "A colourful café food presentation." },
    { src: Image4, alt: "A freshly prepared meal at FoodieSerendipity." },
    { src: Image5, alt: "A warm and enjoyable café dining experience." },
    { src: Image6, alt: "Food and people enjoying the FoodieSerendipity experience." },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const pageRef = useRef(null);

  // Background slider and hero entrance
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    const introTimeout = setTimeout(() => {
      setHeroVisible(true);
    }, 100);

    return () => {
      clearInterval(intervalId);
      clearTimeout(introTimeout);
    };
  }, [images.length]);

  // Scroll reveal observer for elements under hero
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.15,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); // Trigger once smoothly
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const revealElements = pageRef.current?.querySelectorAll(".scroll-reveal");

    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      number: "01",
      title: "Farmer's Market Harvest",
      description:
        "Every morning starts with crisp organic greens, heritage heirloom grains, and honest pantry essentials sourced right from local growers.",
    },
    {
      number: "02",
      title: "Slow-Crafted Kitchen",
      description:
        "No shortcuts or premade batches. Our sourdough proofs for 36 hours, sauces simmer low, and dressings are whisked to order.",
    },
    {
      number: "03",
      title: "Your Cozy Neighborhood Nook",
      description:
        "Whether you're tucked in with a novel, catching up over brunch, or grabbing your afternoon flat white, our table is always yours.",
    },
  ];

  return (
    <main className="foodie-page" ref={pageRef}>
      {/* HERO SECTION (Original unchanged layout & styles) */}
      <section className="fullscreen-container">
        <div
          className="background-slider"
          style={{ backgroundImage: `url(${images[currentImageIndex].src})` }}
          role="img"
          aria-label={images[currentImageIndex].alt}
        />

        <div className={`hero-content ${heroVisible ? "visible" : ""}`}>
          <span className="hero-kicker">WELCOME TO</span>

          <h1 className="intro-title">FoodieSerendipity</h1>

          <p className="hero-subtitle">
            Good food, warm moments and flavours worth discovering.
          </p>

          <div className="hero-actions">
            <a href="menu" className="hero-button primary">
              Explore Our Menu
            </a>
            <a href="#about" className="hero-button secondary">
              Our Story
            </a>
          </div>

          <div className="hero-indicators" aria-label="Hero image slider">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`hero-dot ${
                  currentImageIndex === index ? "active" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="intro-section" id="about">
        <div className="section-container intro-grid">
          <div className="section-heading scroll-reveal drop-fade">
            <span className="section-label">OUR KITCHEN PHILOSOPHY</span>
            <h2>Honest food. Slow mornings. Real comfort.</h2>
          </div>

          <div className="intro-copy scroll-reveal slide-in-right">
            <p>
              At <strong>FoodieSerendipity</strong>, we believe the best meals aren't
              the most complicated ones. They're the ones made with butter at room temperature,
              herbs snipped fresh at dawn, and conversations that stretch well past the last crumb.
            </p>
            <p>
              Born from a quiet craving for good company and simple perfection, our café is 
              built for lazy Sunday brunches, spontaneous coffee walk-ins, and that comforting feeling 
              of finding a little culinary haven right around the corner.
            </p>
          </div>
        </div>
      </section>

      {/* MENU SECTION WITH DROP-DOWN CARDS */}
      <section className="menu-section" id="menu">
        <div className="section-container">
          <div className="center-heading scroll-reveal drop-fade">
            <span className="section-label">DAILY SPECIALS & TASTES</span>
            <h2>Crafted with love, served with a smile</h2>
            <p>
              From sunlit mornings with freshly pulled espresso to nourishing bowls and 
              warm evening bakes, find what hits the spot today.
            </p>
          </div>

          <div className="menu-grid">
            <article className="menu-card scroll-reveal drop-card" style={{ "--delay": "1" }}>
              <span className="menu-number">01</span>
              <div className="menu-icon-wrapper">
                <span className="menu-icon">🍽️</span>
              </div>
              <h3>Artisan Plates & Bowls</h3>
              <p>
                Toasted sourdough tartines, seasonal grain bowls, and comforting plates balanced 
                with vibrant dressings and freshly gathered garden herbs.
              </p>
              <a href="menu" className="menu-link">View Plates →</a>
            </article>

            <article className="menu-card featured scroll-reveal drop-card" style={{ "--delay": "2" }}>
              <span className="menu-number">02</span>
              <div className="menu-icon-wrapper">
                <span className="menu-icon">☕</span>
              </div>
              <h3>Brew Bar & Tonics</h3>
              <p>
                Single-origin Ethiopian roasts, creamy oat flat whites, velvety ceremonial matchas, 
                and chilled botanical tonics infused with citrus & mint.
              </p>
              <a href="menu" className="menu-link">View Brews →</a>
            </article>

            <article className="menu-card scroll-reveal drop-card" style={{ "--delay": "3" }}>
              <span className="menu-number">03</span>
              <div className="menu-icon-wrapper">
                <span className="menu-icon">🍰</span>
              </div>
              <h3>Pantry Bakes & Sweets</h3>
              <p>
                Buttery hand-laminated croissants, warm cardamom buns, and berry galettes pulled straight 
                from the oven while the coffee is still brewing.
              </p>
              <a href="menu" className="menu-link">View Sweets →</a>
            </article>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="highlights-section">
        <div className="section-container">
          <div className="center-heading light-heading scroll-reveal drop-fade">
            <span className="section-label">THE KITCHEN PROMISE</span>
            <h2>Why each table feels like coming home</h2>
          </div>

          <div className="highlights-grid">
            {highlights.map((item, index) => (
              <article
                className="highlight-item scroll-reveal drop-card"
                key={item.number}
                style={{ "--delay": (index + 1).toString() }}
              >
                <span className="highlight-number">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE / CTA SECTION */}
      <section className="experience-section">
        <div className="experience-content scroll-reveal pop-scale">
          <span className="section-label">A TASTE OF SERENDIPITY</span>
          <h2>Pull up a chair. Stay a while.</h2>
          <p>
            No rush, no pretension—just steaming cups, golden crusts, and warm banter. 
            Drop in anytime today for a quick break or make it a full afternoon affair.
          </p>

          <a href="menu" className="dark-button">
            Explore Today's Menu
          </a>
        </div>
      </section>
    </main>
  );
};

export default Frontview;