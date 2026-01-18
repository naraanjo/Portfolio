document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ANIMACIÓN SCROLL OBSERVER
    // Hace que los elementos con clase 'animate-on-scroll' aparezcan suavemente al bajar
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Se activa al ver el 10% del elemento
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Dejar de observar para que no parpadee
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // 2. CERRAR MENÚ MÓVIL AL CLICK
    // En móviles, el menú no se cierra solo en Bootstrap, esto lo arregla.
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });

    // 3. LOG MENSAJE CONSOLA (Detalle simpático para desarrolladores curiosos)
    console.log(
        "%c ¡Hola! 👋 Si estás viendo esto, probablemente seas dev o recruiter. ¡Hablemos! --> naranjodev06@gmail.com", 
        "background: #3b82f6; color: #fff; padding: 10px; border-radius: 5px; font-weight: bold;"
    );
});