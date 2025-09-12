console.log("Jardin 05 - Jueves 11- Sep - Op Art 2D");

// Configurar <canvas>
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Fondo rojo
ctx.fillStyle = "#e53935";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Centro y tamaño
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;

// Gradiente azul más notorio y más azul
const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
grad.addColorStop(0, "#0033cc"); // azul intenso
grad.addColorStop(0.5, "#1976d2"); // azul medio
grad.addColorStop(0.8, "#64b5f6"); // azul claro
grad.addColorStop(1, "rgba(0,51,204,0.7)"); // azul translúcido
ctx.beginPath();
ctx.arc(cx, cy, maxRadius, 0, Math.PI * 2);
ctx.fillStyle = grad;
ctx.fill();
ctx.closePath();

// Dibujar círculos concéntricos
const numCircles = 18;
for (let i = 0; i < numCircles; i++) {
  ctx.beginPath();
  ctx.arc(cx, cy, (maxRadius / numCircles) * (i + 1), 0, Math.PI * 2);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}