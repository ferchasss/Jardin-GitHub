// Parallax Effect para las figuras flotantes
const shapes = document.querySelectorAll('.shape');
let mouseX = 0;
let mouseY = 0;

// Seguimiento del mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Función de parallax
function parallax() {
    shapes.forEach(shape => {
        const speed = parseFloat(shape.getAttribute('data-speed')) || 2;
        
        // Calcular posición relativa al centro de la pantalla
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calcular desplazamiento
        const deltaX = (mouseX - centerX) / centerX;
        const deltaY = (mouseY - centerY) / centerY;
        
        // Aplicar transformación con parallax
        const moveX = deltaX * speed * 30;
        const moveY = deltaY * speed * 30;
        
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    requestAnimationFrame(parallax);
}

// Iniciar animación
parallax();

// Efecto de hover en las figuras (opcional)
shapes.forEach(shape => {
    shape.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        this.style.transform = `scale(1.2)`;
    });
    
    shape.addEventListener('mouseleave', function() {
        this.style.opacity = '0.7';
        this.style.transform = `scale(1)`;
    });
});

// Animación de entrada para el producto (cara.png)
window.addEventListener('load', () => {
    const product = document.querySelector('.product-image');
    if (product) {
        product.style.opacity = '0';
        product.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            product.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            product.style.opacity = '1';
            product.style.transform = 'scale(1)';
        }, 300);
    }
});