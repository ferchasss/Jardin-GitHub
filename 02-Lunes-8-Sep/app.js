console.log("Jardin 02 - Lunes 8 Sep - Canvas 2D");

// Configurar <canvas>
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Fondo (color exótico)
ctx.fillStyle = "#ff00cc"; // fucsia brillante
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Cabeza (círculo)
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 120, 0, Math.PI * 2);
ctx.fillStyle = "#00ffe7"; // turquesa neón
ctx.fill();
ctx.closePath();

// Ojo izquierdo (círculo)
ctx.beginPath();
ctx.arc(canvas.width / 2 - 40, canvas.height / 2 - 30, 20, 0, Math.PI * 2);
ctx.fillStyle = "#fffb00"; // amarillo neón
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(canvas.width / 2 - 40, canvas.height / 2 - 30, 8, 0, Math.PI * 2);
ctx.fillStyle = "#ff0080"; // rosa neón
ctx.fill();
ctx.closePath();

// Ojo derecho (cuadrado)
ctx.fillStyle = "#fffb00"; // amarillo neón
ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2 - 50, 40, 40);
ctx.fillStyle = "#00ff00"; // verde neón
ctx.fillRect(canvas.width / 2 + 35, canvas.height / 2 - 35, 10, 10);

// Boca (línea curva)
ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 40, canvas.height / 2 + 60);
ctx.quadraticCurveTo(canvas.width / 2, canvas.height / 2 + 100, canvas.width / 2 + 40, canvas.height / 2 + 60);
ctx.strokeStyle = "#ff6600"; // naranja neón
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Cuello (rectángulo)
ctx.fillStyle = "#a020f0"; // púrpura vibrante
ctx.fillRect(canvas.width / 2 - 30, canvas.height / 2 + 120, 60, 40);

// Cuerpo (rectángulo grande)
ctx.fillStyle = "#00ff99"; // verde menta neón
ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 + 160, 160, 200);

// Detalles abstractos (líneas)
ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 120, canvas.height / 2 - 120);
ctx.lineTo(canvas.width / 2 + 120, canvas.height / 2 + 120);
ctx.moveTo(canvas.width / 2 + 120, canvas.height / 2 - 120);
ctx.lineTo(canvas.width / 2 - 120, canvas.height / 2 + 120);
ctx.strokeStyle = "#00bfff"; // azul eléctrico
ctx.lineWidth = 3;
ctx.stroke();
ctx.closePath();