
console.log(gsap);

//Menu inteactivo
document.addEventListener('DOMContentLoaded', function() {
    const menuBoton = document.querySelector('.menu-boton');
    const menuContenido = document.querySelector('.menu-contenido');
    
    menuBoton.addEventListener('click', function() {
        menuContenido.classList.toggle('active');
        menuBoton.classList.toggle('active');
    });

    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('.menu-contenido a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuContenido.classList.remove('active');
            menuBoton.classList.remove('active');
        });
    });
});

