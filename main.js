document.addEventListener("DOMContentLoaded", () => {
  // --- Animación de elementos al hacer scroll ---
  const animatedElements = document.querySelectorAll(
    ".card, .tech-item, .timeline-item"
  );
  const allTechItems = Array.from(document.querySelectorAll(".tech-item"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          if (target.classList.contains("tech-item")) {
            const techIndex = allTechItems.indexOf(target);
            setTimeout(() => {
              target.classList.add("visible");
            }, techIndex * 100);
          } else {
            target.classList.add("visible");
          }
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => observer.observe(el));

  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Menú hamburguesa móvil ---
  const menuToggle = document.getElementById("menuToggle");
  const navbarRight = document.getElementById("navbarRight");

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    navbarRight.classList.toggle("show");
    menuToggle.classList.toggle("open");
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // --- Scroll suave y cierre de menú ---
  document.querySelectorAll('.navbar-right a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
      if (navbarRight.classList.contains('show')) {
        navbarRight.classList.remove('show');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --- Resaltar enlace de nav activo en scroll ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.navbar-right a[href^="#"]');

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 90) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // --- Efecto Máquina de Escribir (Typewriter) ---
  const typewriterElement = document.getElementById("typewriter");
  const textToType = "Álvaro Naranjo";
  let charIndex = 0;

  function typeWriterOnce() {
    if (charIndex < textToType.length) {
      typewriterElement.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriterOnce, 100);
    } else {
      if (typewriterElement) {
        typewriterElement.style.borderRight = "none";
      }
    }
  }

  if (typewriterElement) {
    typewriterElement.textContent = "";
    setTimeout(typeWriterOnce, 500);
  }

  // --- Interruptor de Tema (Light/Dark Mode) ---
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.classList.remove("bi-moon-fill");
    themeIcon.classList.add("bi-sun-fill");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    let theme = "dark";
    if (document.body.classList.contains("light-mode")) {
      theme = "light";
      themeIcon.classList.remove("bi-moon-fill");
      themeIcon.classList.add("bi-sun-fill");
    } else {
      themeIcon.classList.remove("bi-sun-fill");
      themeIcon.classList.add("bi-moon-fill");
    }
    localStorage.setItem("theme", theme);
  });

  // --- Botón "Volver Arriba" ---
  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // --- Gestión de Formulario de Contacto ---
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const submitButton = contactForm.querySelector(".submit-btn");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Validación de campos requeridos
    if (
      nameInput.value.trim() === "" ||
      emailInput.value.trim() === "" ||
      messageInput.value.trim() === ""
    ) {
      formStatus.textContent = "Por favor, rellena todos los campos.";
      formStatus.className = "error";
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      formStatus.textContent = "Por favor, introduce un email válido.";
      formStatus.className = "error";
      return;
    }

    const data = new FormData(contactForm);
    const action = contactForm.action;

    // Estado "Enviando"
    formStatus.textContent = "Enviando...";
    formStatus.className = "sending";
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    try {
      const response = await fetch(action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.textContent = "¡Mensaje enviado con éxito! Gracias.";
        formStatus.className = "success";
        contactForm.reset();
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.errors?.map((err) => err.message).join(", ") ||
          "Hubo un problema al enviar el formulario.";
        formStatus.textContent = errorMessage;
        formStatus.className = "error";
      }
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
      formStatus.textContent = "Error de red. Por favor, inténtalo de nuevo.";
      formStatus.className = "error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar Mensaje";
    }
  });
});