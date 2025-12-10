// Efecto parallax 3D en el personaje con el mouse
const character = document.querySelector('.character-main');
const characterContainer = document.querySelector('.character-container');

if (characterContainer && character) {
    characterContainer.addEventListener('mousemove', (e) => {
        const rect = characterContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        character.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    characterContainer.addEventListener('mouseleave', () => {
        character.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Paginación interactiva
const dots = document.querySelectorAll('.dot');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        // Aquí puedes agregar lógica para cambiar de slide
        console.log(`Slide ${index + 1} selected`);
    });
});

// Animación de entrada
window.addEventListener('load', () => {
    const heroText = document.querySelector('.hero-text');
    const character = document.querySelector('.character-main');
    
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            heroText.style.transition = 'all 1s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateX(0)';
        }, 200);
    }
    
    if (character) {
        character.style.opacity = '0';
        character.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            character.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            character.style.opacity = '1';
            character.style.transform = 'scale(1)';
        }, 400);
    }
});

// Menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}