const rect = document.querySelector('.rectangulo');

rect.addEventListener('click', function(e) {
  const rectWidth = rect.offsetWidth;
  const rectHeight = rect.offsetHeight;
  const padding = 20;

  // Posición del mouse
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Genera posición aleatoria lejos del mouse pero dentro de la pantalla
  let newX, newY;
  do {
    newX = Math.floor(Math.random() * (window.innerWidth - rectWidth - padding));
    newY = Math.floor(Math.random() * (window.innerHeight - rectHeight - padding));
  } while (Math.abs(newX - mouseX) < 120 && Math.abs(newY - mouseY) < 80);

  // Mueve el rectángulo con GSAP
  gsap.to(rect, {
    duration: 0.8,
    left: newX,
    top: newY,
    ease: "power2.inOut"
  });
});