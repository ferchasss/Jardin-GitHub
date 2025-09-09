console.log("Jardin 02 - Lunes 8 Sep - Canvas 2D");

// Configurar <canvas>
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Fondo
ctx.fillStyle = "#f5e1da";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Cabeza (círculo)
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 120, 0, Math.PI * 2);
ctx.fillStyle = "#f7c59f";
ctx.fill();
ctx.closePath();

// Ojo izquierdo (círculo)
ctx.beginPath();
ctx.arc(canvas.width / 2 - 40, canvas.height / 2 - 30, 20, 0, Math.PI * 2);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(canvas.width / 2 - 40, canvas.height / 2 - 30, 8, 0, Math.PI * 2);
ctx.fillStyle = "#222";
ctx.fill();
ctx.closePath();

// Ojo derecho (cuadrado)
ctx.fillStyle = "#fff";
ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2 - 50, 40, 40);
ctx.fillStyle = "#222";
ctx.fillRect(canvas.width / 2 + 35, canvas.height / 2 - 35, 10, 10);

// Boca (línea curva)
ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 40, canvas.height / 2 + 60);
ctx.quadraticCurveTo(canvas.width / 2, canvas.height / 2 + 100, canvas.width / 2 + 40, canvas.height / 2 + 60);
ctx.strokeStyle = "#c1440e";
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Cuello (rectángulo)
ctx.fillStyle = "#e2a76f";
ctx.fillRect(canvas.width / 2 - 30, canvas.height / 2 + 120, 60, 40);

// Cuerpo (rectángulo grande)
ctx.fillStyle = "#6a8caf";
ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 + 160, 160, 200);

// Detalles abstractos (líneas)
ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 120, canvas.height / 2 - 120);
ctx.lineTo(canvas.width / 2 + 120, canvas.height / 2 + 120);
ctx.moveTo(canvas.width / 2 + 120, canvas.height / 2 - 120);
ctx.lineTo(canvas.width / 2 - 120, canvas.height / 2 + 120);
ctx.strokeStyle = "#a23e48";
ctx.lineWidth = 3;
ctx.stroke();
ctx.closePath();