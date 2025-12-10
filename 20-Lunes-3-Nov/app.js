// Canvas para el rastro del mouse
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9999';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array para guardar los trazos con timestamp (cada punto individual)
const strokes = [];

// Configuración del pincel
let lastX = 0;
let lastY = 0;

// Event listeners para rastro
document.addEventListener('mousemove', (e) => {
    // Crear trazo para cada punto
    const stroke = {
        x1: lastX,
        y1: lastY,
        x2: e.clientX,
        y2: e.clientY,
        timestamp: Date.now(),
        color: '#ff6b00',
        width: 3
    };

    strokes.push(stroke);

    lastX = e.clientX;
    lastY = e.clientY;
});

// Función para dibujar y limpiar
function animate() {
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();
    
    // Filtrar trazos que tienen más de 2 segundos
    for (let i = strokes.length - 1; i >= 0; i--) {
        if (now - strokes[i].timestamp > 2000) {
            strokes.splice(i, 1);
        }
    }

    // Dibujar todos los trazos activos con fade out
    strokes.forEach(stroke => {
        const age = now - stroke.timestamp;
        const opacity = 1 - (age / 2000);

        ctx.beginPath();
        ctx.moveTo(stroke.x1, stroke.y1);
        ctx.lineTo(stroke.x2, stroke.y2);
        ctx.strokeStyle = `rgba(255, 107, 0, ${opacity})`;
        ctx.lineWidth = stroke.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    });

    requestAnimationFrame(animate);
}

animate();

// Ajustar canvas al resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==========================================
// SISTEMA DE IMÁGENES APILADAS (solo PNG, no GIF)
// ==========================================

const floatingImages = document.querySelector('.floating-images');
const allImages = document.querySelectorAll('.float-img');

// Separar el GIF de las imágenes PNG
const gifImage = document.querySelector('.img-3'); // El GIF
const pngImages = Array.from(allImages).filter(img => !img.classList.contains('img-3'));

// Posición fija del GIF (arriba a la derecha)
gifImage.style.position = 'fixed';
gifImage.style.top = '15%';
gifImage.style.right = '10%';
gifImage.style.zIndex = '50';

// Posiciones iniciales para PNG (apiladas en el centro)
const stackedPosition = {
    x: window.innerWidth / 2 - 175,
    y: window.innerHeight / 2 - 100
};

// Posiciones cuando se separan (solo las 4 PNG)
const separatedPositions = [
    { x: '28%', y: '15%' },  // img-1
    { x: '8%', y: '55%' },   // img-2
    { x: '15%', y: '35%' },  // img-4
    { x: '60%', y: '50%' }   // img-5
];

// Estado inicial: todas apiladas
let isStacked = true;

// Función para apilar imágenes PNG
function stackImages() {
    pngImages.forEach((img, index) => {
        img.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        img.style.left = `${stackedPosition.x}px`;
        img.style.top = `${stackedPosition.y + (index * 8)}px`;
        img.style.zIndex = index + 10;
        img.style.position = 'absolute';
    });
    isStacked = true;
}

// Función para separar imágenes PNG
function separateImages() {
    pngImages.forEach((img, index) => {
        img.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        img.style.left = separatedPositions[index].x;
        img.style.top = separatedPositions[index].y;
        img.style.zIndex = index + 10;
        img.style.position = 'absolute';
    });
    isStacked = false;
}

// Inicializar en posición apilada
stackImages();

// Hover sobre el contenedor de imágenes
floatingImages.addEventListener('mouseenter', () => {
    if (isStacked) {
        separateImages();
    }
});

floatingImages.addEventListener('mouseleave', () => {
    if (!isStacked) {
        stackImages();
    }
});

// Hover individual en cada imagen PNG (para efecto de escala)
pngImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        if (!isStacked) {
            img.style.transform = 'scale(1.15)';
            img.style.zIndex = '100';
        }
    });
    
    img.addEventListener('mouseleave', () => {
        if (!isStacked) {
            img.style.transform = 'scale(1)';
        }
    });
});

// Hover en el GIF (efecto independiente)
gifImage.addEventListener('mouseenter', () => {
    gifImage.style.transform = 'scale(1.1) rotate(5deg)';
});

gifImage.addEventListener('mouseleave', () => {
    gifImage.style.transform = 'scale(1) rotate(0deg)';
});

// Animación de palabras del hero
const words = document.querySelectorAll('.word');
words.forEach((word, index) => {
    word.style.animationDelay = `${index * 0.1}s`;
});

// Movimiento parallax suave con el mouse (solo para PNG cuando están separadas)
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Parallax solo para PNG cuando están separadas
    if (!isStacked) {
        pngImages.forEach((img, index) => {
            const speed = (index + 1) * 5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            const currentTransform = img.style.transform.includes('scale') 
                ? img.style.transform 
                : 'scale(1)';
            
            img.style.transform = `${currentTransform} translate(${x}px, ${y}px)`;
        });
    }
    
    // Parallax sutil para el GIF (siempre activo)
    const gifX = (mouseX - 0.5) * 15;
    const gifY = (mouseY - 0.5) * 15;
    const currentGifTransform = gifImage.style.transform.includes('scale') 
        ? gifImage.style.transform 
        : 'scale(1) rotate(0deg)';
    
    if (!currentGifTransform.includes('translate')) {
        gifImage.style.transform = `${currentGifTransform} translate(${gifX}px, ${gifY}px)`;
    }
});

// Responsive: ajustar posición apilada en resize
window.addEventListener('resize', () => {
    stackedPosition.x = window.innerWidth / 2 - 175;
    stackedPosition.y = window.innerHeight / 2 - 100;
    
    // Reposicionar GIF
    gifImage.style.top = '15%';
    gifImage.style.right = '10%';
    
    if (isStacked) {
        stackImages();
    }
});