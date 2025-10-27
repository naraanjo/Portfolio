// src/scripts/gsap-animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function setupGsapAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // --- 1. Animación suave del Hero al hacer scroll ---
  gsap.to(".hero-content", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true, // Vincula la animación al scroll
    },
    y: 250,
    opacity: 0,
    ease: "power1.out",
  });

  // --- 2. Animar Títulos de Sección ---
  const sectionTitles = gsap.utils.toArray(".section-title");
  sectionTitles.forEach((title) => {
    // Animate the title itself
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 90%", // Start animation slightly earlier
        toggleActions: "play none none none", // Play once on enter
      },
      opacity: 0,
      y: 30, // Animate upwards
      duration: 0.6,
      ease: "power2.out",
    });

    // Attempt to animate the ::after pseudo-element's line
    // This requires the line to be an actual element or careful handling
    // For simplicity, let's assume the ::after is styled directly
    // If you created a separate element (e.g., <span class="title-line"></span>)
    // you would target that element instead.
    // Example targeting ::after (might need CSS adjustments):
    gsap.from(title, { // Targeting the title and animating its pseudo-element
      '--after-scaleX': 0, // Assuming you use a CSS variable for scaleX in ::after
       scrollTrigger: {
        trigger: title,
        start: "top 85%", // Slightly after the title starts animating
        toggleActions: "play none none none",
      },
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2, // Delay slightly after title animation starts
      onStart: () => { // Ensure the variable is set initially if needed
          if (title instanceof HTMLElement) {
              title.style.setProperty('--after-scaleX', '0');
          }
      },
      onComplete: () => { // Set to final state
          if (title instanceof HTMLElement) {
              title.style.setProperty('--after-scaleX', '1');
          }
      }
    });
    // Add this to your .section-title::after CSS:
    // transform: scaleX(var(--after-scaleX, 1)); /* Default to 1 */
    // transform-origin: left;
    // transition: transform 0.8s var(--power3-out-ease); /* Optional: CSS transition fallback */

  });


  // --- 3. Animar Cards Individualmente ---
  const cards = gsap.utils.toArray(".card");
  cards.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // --- 4. Animar Tech Items Individualmente ---
  const techItems = gsap.utils.toArray(".tech-item");
  techItems.forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  });

  // --- 5. Efecto Parallax en Fondos de Sección ---
  // Ensure the target elements exist before animating
  const techSection = document.querySelector(".tech-section");
  if (techSection) {
    gsap.to(techSection, {
      scrollTrigger: {
        trigger: techSection,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      backgroundPositionY: "-30%", // Adjust value as needed
      ease: "none",
    });
  }

  const contactSection = document.querySelector(".contact-section");
  if (contactSection){
    gsap.to(contactSection, {
      scrollTrigger: {
        trigger: contactSection,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      backgroundPositionY: "-30%", // Adjust value as needed
      ease: "none",
    });
  }
}

// Ensure the DOM is fully loaded before running animations
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupGsapAnimations);
} else {
  setupGsapAnimations();
}