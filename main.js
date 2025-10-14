const messages = [
  "¡Vaya! Un junior💻✨",
  "Pero, con muchisimas ganas de aprender🚀",
  "Curiosioso, creativo y disciplinado 🔥",
  "¡Bienvenido a mi portfolio! 🎉"
];

const container = document.getElementById("welcome-container");
const minDistance = 25; // MUCHÍSIMA más distancia entre pop-ups (en vh/vw)

function getRandomPosition(existingPositions) {
  let top, left;
  let safe = false;

  while (!safe) {
    top = Math.random() * 50 + 10;  // 10% a 60% vertical
    left = Math.random() * 50 + 10; // 10% a 60% horizontal

    safe = true;
    for (const pos of existingPositions) {
      const dx = Math.abs(left - pos.left);
      const dy = Math.abs(top - pos.top);
      if (dx < minDistance && dy < minDistance) {
        safe = false; // demasiado cerca, generar otra posición
        break;
      }
    }
  }

  return { top, left };
}

window.addEventListener("load", () => {
  let delay = 0;
  const positions = []; // posiciones de pop-ups ya creados

  messages.forEach(msg => {
    setTimeout(() => {
      const popup = document.createElement("div");
      popup.className = "welcome-popup";
      popup.textContent = msg;

      // Generar posición segura con más distancia
      const pos = getRandomPosition(positions);
      popup.style.top = `${pos.top}vh`;
      popup.style.left = `${pos.left}vw`;

      container.appendChild(popup);
      positions.push(pos); // guardar posición

      // Animación de entrada
      requestAnimationFrame(() => {
        popup.classList.add("show");
      });

      // Desaparecer después de 5 segundos
      setTimeout(() => {
        popup.classList.remove("show");
        popup.classList.add("hide");

        setTimeout(() => {
          container.removeChild(popup);
        }, 800);
      }, 5000);

    }, delay);

    delay += 2500; // más intervalo para que no aparezcan juntos
  });
});
