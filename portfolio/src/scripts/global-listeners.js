// src/scripts/global-listeners.js

function setupGlobalListeners() {
  // --- Highlight active nav link on scroll ---
  // Select all section elements that have an ID
  const sections = document.querySelectorAll("section[id]");
  // Select all nav links pointing to an anchor
  const navLinks = document.querySelectorAll(".navbar-right a[href^='/#']"); // Updated selector for /# links

  // Only run if sections and nav links exist
  if (sections.length && navLinks.length) {
    window.addEventListener("scroll", () => {
      let current = ""; // Variable to store the ID of the current section in view
      // Loop through each section
      sections.forEach((section) => {
        const sectionTop = section.offsetTop; // Get the top position of the section
        // Check if the user has scrolled past the top of the section (with an offset for the navbar height)
        if (window.pageYOffset >= sectionTop - 90) { 
          current = section.getAttribute("id") || ""; // Get the section's ID
        }
      });

      // Loop through each nav link
      navLinks.forEach((link) => {
        link.classList.remove("active"); // Remove active class from all links first
        // Check if the link's href matches the current section's ID (prepended with /#)
        if (link.getAttribute("href") === `/#${current}`) { 
          link.classList.add("active"); // Add active class to the matching link
        }
      });
    });
  }

  // --- Smooth scroll for back-to-top and other anchor links ---
  // Select all anchor links starting with # or /#
  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((anchor) => { 
    anchor.addEventListener("click", function (e) {
      // Don't interfere with mobile nav links (handled in Navbar.astro)
      if (this.closest("#navbarRight")) return; 

      const targetIdAttr = this.getAttribute("href");
      // Ensure targetIdAttr is not null and extract the ID part after #
      const targetId = targetIdAttr ? targetIdAttr.substring(targetIdAttr.lastIndexOf('#')) : null; 

      if (!targetId || targetId === "#") return; // Exit if no valid ID after #

      // Check if the element exists on the current page before preventing default
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault(); // Prevent default jump only if the target exists
        
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Scroll to the section top, adjusted for navbar height
          behavior: "smooth", // Animate the scroll
        });
      } 
      // If targetSection is null, the default browser behavior will handle navigation (useful for blog links etc.)
    });
  });
}

// Ensure the DOM is fully loaded before setting up listeners
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupGlobalListeners);
} else {
  setupGlobalListeners();
}