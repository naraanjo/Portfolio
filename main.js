// Animación de cards al hacer scroll :cite[3]
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
},{threshold:0.2});

cards.forEach(card => observer.observe(card));

// Efecto de scroll suave para navegación
document.querySelectorAll('.navbar-right a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Sistema de partículas naranjas para el fondo del hero
function createParticles() {
    const heroSection = document.querySelector('.hero');
    const particlesCount = 20;
    
    // Crear elementos de partículas
    for(let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamaño aleatorio entre 3px y 8px
        const size = Math.random() * 5 + 3;
        
        // Duración de animación aleatoria
        const duration = Math.random() * 20 + 10;
        
        // Estilos de la partícula
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 111, 97, 0.6);
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            pointer-events: none;
            animation: floatParticle ${duration}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 10px rgba(255, 111, 97, 0.5);
        `;
        
        heroSection.appendChild(particle);
    }
    
    // Añadir keyframes para la animación de flotación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar partículas cuando la página cargue
window.addEventListener('load', createParticles);

// Efecto de escritura para el título (mejorado)
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;

function typeWriter() {
    heroTitle.textContent = '';
    let charIndex = 0;
    
    function type() {
        if(charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }
    type();
}

// Iniciar efecto de escritura con retraso
setTimeout(typeWriter, 500);

// Efecto parallax mejorado para el hero
const hero = document.querySelector('.hero');
window.addEventListener('scroll', ()=>{
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Añadir clase active al navbar según scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.navbar-right a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});