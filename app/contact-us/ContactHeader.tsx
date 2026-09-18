"use client";

import { useEffect, useState } from "react";

export default function ContactHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className={`navStage ${scrolled ? "isScrolled" : ""}`}>
      <header className="nav">
        <a className="brand" href="/" aria-label="OTVERSE home">
          <img className="brandLogo" src="/otverse-logo.svg" alt="" />
        </a>
        <nav aria-label="Main navigation">
          <a href="/#problem-section">Problem</a>
          <a href="/#solution-section">Solution</a>
          <a href="/#how-it-works-section">How It Works</a>
          <a className="active" href="#contact-us" aria-current="page">Contact Us</a>
        </nav>
        <a className="navCta" href="#waitlist">Get Early Access</a>
      </header>
    </div>
  );
}
