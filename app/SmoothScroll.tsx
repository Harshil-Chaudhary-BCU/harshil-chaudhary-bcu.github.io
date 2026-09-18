"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>([
      ".sectionHead .sectionTag",
      ".sectionHead h2",
      ".sectionHead > p:last-child",
      ".marqueeHead h2",
      ".pageHero .sectionTag",
      ".pageHero h1",
      ".pageHero > p:last-child",
      ".formCard > .sectionTag",
      ".formCard > h2",
      ".formCard > h2 + p",
      ".legal:not(.privacyPolicy) h1",
      ".legal:not(.privacyPolicy) h2",
      ".legal h1 + p",
      ".legal h1 + p + p",
      ".waitlist > p",
      ".waitlist > h2",
    ].join(",")));

    document.documentElement.classList.add("revealEnabled");
    elements.forEach((element) => {
      element.classList.add("sectionReveal");
      if (element.matches("h1, h2")) element.style.setProperty("--reveal-delay", "70ms");
      if (element.matches("p:last-child, h2 + p, h1 + p + p")) element.style.setProperty("--reveal-delay", "170ms");
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("isVisible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("revealEnabled");
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      anchors: { offset: window.matchMedia("(max-width: 760px)").matches ? -110 : -160 },
    });

    let frame = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
