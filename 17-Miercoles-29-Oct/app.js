// Seleccionar el elemento de texto
const hoverText = document.getElementById('hoverText');

// Seleccionar todas las cards
const cards = document.querySelectorAll('.card');

// Agregar eventos a cada card
cards.forEach(card => {
    // Cuando el mouse entra
    card.addEventListener('mouseenter', function() {
        const text = this.getAttribute('data-text');
        hoverText.textContent = text;
        hoverText.classList.add('show');
    });
    
    // Cuando el mouse sale
    card.addEventListener('mouseleave', function() {
        hoverText.classList.remove('show');
    });
});

// Animación de entrada para las cards
window.addEventListener('load', () => {
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Efecto parallax suave en las cards
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});