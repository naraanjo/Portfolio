document.addEventListener('DOMContentLoaded', () => {

  // --- Animación de cards al hacer scroll (Mejorada) ---
  const animatedElements = document.querySelectorAll('.card, .tech-item');
  // Convertir NodeList a Array para obtener un índice estable
  const allTechItems = Array.from(document.querySelectorAll('.tech-item'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        if (target.classList.contains('tech-item')) {
          // Obtener índice estable para el delay escalonado
          const techIndex = allTechItems.indexOf(target);
          setTimeout(() => {
            target.classList.add('visible');
          }, techIndex * 100); // Delay basado en la posición en el DOM
        } else {
          // Es una 'card', mostrarla inmediatamente
          target.classList.add('visible');
        }
        observer.unobserve(target); // Dejar de observar una vez visible
      }
    });
  }, { threshold: 0.1 }); // Umbral bajo para activación temprana

  animatedElements.forEach(el => observer.observe(el));


  // --- Menú hamburguesa móvil ---
  const menuToggle = document.getElementById('menuToggle');
  const navbarRight = document.getElementById('navbarRight');

  menuToggle.addEventListener('click', () => {
    navbarRight.classList.toggle('show');
    menuToggle.classList.toggle('open');
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
            top: targetSection.offsetTop - 80, // Offset del navbar
            behavior: 'smooth'
          });
        }
      }
      if (navbarRight.classList.contains('show')) {
        navbarRight.classList.remove('show');
        menuToggle.classList.remove('open');
      }
    });
  });

  // --- Resaltar enlace de nav activo en scroll ---
  const sections = document.querySelectorAll('section[id]'); // Seleccionar solo secciones con ID
  const navLinks = document.querySelectorAll('.navbar-right a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= (sectionTop - 90)) { // 90px de offset
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Efecto Máquina de Escribir (Typewriter) MODIFICADO ---
  const typewriterElement = document.getElementById('typewriter');
  const textToType = "Hola, soy Álvaro Naranjo";
  let charIndex = 0;

  function typeWriterOnce() {
    if (charIndex < textToType.length) {
      // Escribiendo
      typewriterElement.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriterOnce, 100); // Velocidad de escritura
    } else {
      // Animación terminada: quitar el cursor parpadeante
      if (typewriterElement) {
        typewriterElement.style.borderRight = 'none';
      }
    }
  }

  if (typewriterElement) {
    typewriterElement.textContent = ''; // Limpiar contenido inicial
    setTimeout(typeWriterOnce, 500); // Iniciar después de medio segundo
  }


  // --- Interruptor de Tema (Light/Dark Mode) ---
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.remove('bi-moon-fill');
    themeIcon.classList.add('bi-sun-fill');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    let theme = 'dark';
    if (document.body.classList.contains('light-mode')) {
      theme = 'light';
      themeIcon.classList.remove('bi-moon-fill');
      themeIcon.classList.add('bi-sun-fill');
    } else {
      themeIcon.classList.remove('bi-sun-fill');
      themeIcon.classList.add('bi-moon-fill');
    }
    localStorage.setItem('theme', theme);
  });

  // --- Cursor Personalizado (ELIMINADO) ---
  // Se ha eliminado el listener 'mousemove' y los listeners 'mouseover'/'mouseout'


  // --- Botón "Volver Arriba" ---
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // --- Gestión de Formulario de Contacto (Mejorado) ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitButton = contactForm.querySelector('.submit-btn');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Validación de campos requeridos
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
      formStatus.textContent = 'Por favor, rellena todos los campos.';
      formStatus.className = 'error';
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      formStatus.textContent = 'Por favor, introduce un email válido.';
      formStatus.className = 'error';
      return;
    }

    const data = new FormData(contactForm);
    const action = contactForm.action;
    
    // Estado "Enviando"
    formStatus.textContent = 'Enviando...';
    formStatus.className = 'sending';
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.textContent = '¡Mensaje enviado con éxito! Gracias.';
        formStatus.className = 'success';
        contactForm.reset();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.errors?.map(err => err.message).join(', ') || 'Hubo un problema al enviar el formulario.';
        formStatus.textContent = errorMessage;
        formStatus.className = 'error';
      }
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
      formStatus.textContent = 'Error de red. Por favor, inténtalo de nuevo.';
      formStatus.className = 'error';
    } finally {
      // Restaurar botón
      submitButton.disabled = false;
      submitButton.textContent = 'Enviar Mensaje';
    }
  });
});