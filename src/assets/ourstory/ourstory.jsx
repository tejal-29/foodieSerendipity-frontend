import React, { useEffect, useRef } from "react";
import "./ourstory.css";

const OurStory = () => {
  const storyRef = useRef(null);

  // Scroll reveal observer for playful drop-down cards and sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.12,
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
    const elements = storyRef.current?.querySelectorAll(".scroll-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const milestones = [
    {
      year: "2019",
      tag: "The Spark",
      title: "One Cast-Iron Skillet & A Dream",
      text: "FoodieSerendipity started as a weekend pop-up table sharing sourdough bakes, small-batch spiced chai, and a tiny basket of warm scones.",
      icon: "🍞",
    },
    {
      year: "2021",
      tag: "Finding Home",
      title: "Opening Our Brick-and-Mortar Nook",
      text: "We stripped old wallpaper, sanded reclaimed timber tables, and hung sunlit ivy pots to welcome our very first neighborhood regulars.",
      icon: "🏡",
    },
    {
      year: "2024",
      tag: "Local Roots",
      title: "Farm-to-Cup Partnerships",
      text: "Teaming up directly with organic herb growers and smallholder coffee family estates to bring transparent, ethical richness to every plate.",
      icon: "🌱",
    },
  ];

  const pillars = [
    {
      icon: "🌾",
      title: "Unrushed Simplicity",
      desc: "Good bread takes days to ferment; good broth takes hours to reduce. We let patience do the seasoning.",
    },
    {
      icon: "☕",
      title: "Soul in the Cup",
      desc: "Every espresso shot is dialed in daily by hand, calibrated to weather and bean age for sweet, balanced nectar.",
    },
    {
      icon: "💛",
      title: "Everyone Fits In",
      desc: "Whether you need a quiet corner to finish a chapter or a bustling table for five, our door is never locked to friends.",
    },
  ];

  return (
    <main className="story-page" ref={storyRef}>
      {/* STORY HERO */}
      <section className="story-hero">
        <div className="story-hero-content">
          <span className="story-kicker">BEHIND THE KITCHEN DOOR</span>
          <h1 className="story-hero-title">A Little Serendipity, A Lot of Heart</h1>
          <p className="story-hero-subtitle">
            How a humble love for slow-cooked mornings and golden butter turned into our
            favorite neighborhood gathering place.
          </p>
        </div>
      </section>

      {/* FOUNDER LETTER / ORIGIN SECTION */}
      <section className="origin-section">
        <div className="story-container origin-grid">
          <div className="origin-badge-wrap scroll-reveal drop-card">
            <div className="origin-polaroid">
              <div className="polaroid-img-placeholder">
                <span className="polaroid-sticker">Established with Love ✨</span>
                <span className="polaroid-icon">🥖☕</span>
              </div>
              <p className="polaroid-caption">Morning bake shift, 5:30 AM</p>
            </div>
          </div>

          <div className="origin-text scroll-reveal slide-right">
            <span className="section-label">HOW WE GOT HERE</span>
            <h2>"Food isn't fuel—it's a shared pause in a hurried day."</h2>
            <p>
              We opened <strong>FoodieSerendipity</strong> on a simple realization: in the
              middle of fast commutes and rush hours, people weren't just hungry for calories.
              They were hungry for a warm seat, steam rising from ceramic mugs, and recipes made
              by hands that actually care.
            </p>
            <p>
              We still remember burning our first batch of citrus financiers, sweeping flour off our
              shoes after midnight, and waiting for the morning delivery truck with fingers crossed.
              Every recipe we serve today carries a sliver of that humble trial and discovery.
            </p>
            <div className="signature-box">
              <span className="signature-name">The FoodieSerendipity Family</span>
              <span className="signature-role">Bakers, Baristas & Dreamers</span>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES / PILLARS */}
      <section className="pillars-section">
        <div className="story-container">
          <div className="story-center-heading scroll-reveal drop-fade">
            <span className="section-label">WHAT WE STAND FOR</span>
            <h2>The values baked into every bite</h2>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar, i) => (
              <div
                className="pillar-card scroll-reveal drop-card"
                key={pillar.title}
                style={{ "--delay": (i + 1).toString() }}
              >
                <div className="pillar-icon">{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE / MILESTONES */}
      <section className="timeline-section">
        <div className="story-container">
          <div className="story-center-heading light-heading scroll-reveal drop-fade">
            <span className="section-label">OUR MILESTONES</span>
            <h2>The stepping stones along the way</h2>
          </div>

          <div className="timeline-grid">
            {milestones.map((item, index) => (
              <article
                className="timeline-card scroll-reveal drop-card"
                key={item.year}
                style={{ "--delay": (index + 1).toString() }}
              >
                <div className="timeline-top">
                  <span className="timeline-year">{item.year}</span>
                  <span className="timeline-icon">{item.icon}</span>
                </div>
                <span className="timeline-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STORY CTA */}
      <section className="story-cta-section">
        <div className="story-container story-cta-inner scroll-reveal pop-scale">
          <h2>Come be a part of our next chapter</h2>
          <p>
            There's always fresh bread in the warmer and an extra chair waiting at our counter.
          </p>
          <div className="story-cta-actions">
            <a href="/menu" className="story-btn primary">
              Browse Menu
            </a>
            <a href="/contact" className="story-btn secondary">
              Say Hello
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OurStory;