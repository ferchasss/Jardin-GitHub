console.log("martes 21 octubre - mesh flotante THREE.js");
console.log(THREE);

// Configurar canvas
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x090028);

// Cámara
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50); // cámara alejada mirando al centro (0,0,0)

// Render
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// **LUCES**
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // luz ambiental
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // luz direccional
directionalLight.position.set(100, 100, 100);
scene.add(directionalLight);

// MATERIAL (se mantiene el mismo material para todos los meshes)
const material = new THREE.MeshPhongMaterial({
   flatShading: true,
   specular: 0xffffff,
   shininess: 100,
   color: "#030303"
});

// Lista de "otras" geometrías disponibles (factory functions)
const geometryFactories = [
  // Esfera
  () => new THREE.SphereGeometry(1.8, 32, 32),
  // Caja
  () => new THREE.BoxGeometry(3, 3, 3),
  // Cono
  () => new THREE.ConeGeometry(2, 4, 32),
  // Toro (dona)
  () => new THREE.TorusGeometry(2.2, 0.6, 16, 100),
  // Icosaedro (poliedro)
  () => new THREE.IcosahedronGeometry(2, 0)
];

// índice de geometría seleccionada (puedes cambiarlo)
let selectedGeometryIndex = 0;

// función para crear las geometrías/meshes en círculo usando la geometría seleccionada
function crearObjetosEnCirculo(cantidad, radio) {
    // si ya hay meshes previos, los limpiamos
    if (window.meshFlotante && window.meshFlotante.length) {
      window.meshFlotante.forEach(m => scene.remove(m));
    }

    const objetos = [];
    // crear una sola geometría (misma instancia) para todos los meshes como pediste
    const geometry = geometryFactories[selectedGeometryIndex]();

    for(let i = 0; i < cantidad; i++) {
        const angulo = (i / cantidad) * Math.PI * 2; // disposición circular
        const x = Math.cos(angulo) * radio; 
        const y = Math.random() * 10 - 8; // altura aleatoria para dinamismo
        const z = Math.sin(angulo) * radio;
        
        // Crear nuevo mesh para cada objeto (reutilizando la misma geometry y el mismo material)
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);

        // Orientación y escala aleatoria para variedad
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;
        const scale = 0.8 + Math.random() * 1.2;
        mesh.scale.set(scale, scale, scale);

        objetos.push(mesh);
        scene.add(mesh);
    }
    
    return objetos;
}

// Crear objetos iniciales
window.meshFlotante = crearObjetosEnCirculo(12, 20);

let time = 0;
const amplitude = 2; // Qué tanto suben y bajan (altura maxima)
const frequency = 0.002; // Velocidad

// Animación
function animate() {
    requestAnimationFrame(animate);
    
    time += 1;
    window.meshFlotante.forEach(objeto => {
        objeto.position.y = amplitude * Math.sin(time * frequency + objeto.position.x); // Movimiento oscilatorio
        objeto.rotation.y += 0.01; // rotación ligera para más dinamismo
    });
    
    renderer.render(scene, camera);
}

animate();

// Función para cambiar geometría (recrea los meshes usando la nueva geometría)
function switchGeometry(index) {
  if (index < 0 || index >= geometryFactories.length) return;
  selectedGeometryIndex = index;
  window.meshFlotante.forEach(m => scene.remove(m));
  window.meshFlotante = crearObjetosEnCirculo(12, 20);
}

// Atajos de teclado 1-5 para probar distintas geometrías
window.addEventListener('keydown', (e) => {
  if (e.key >= '1' && e.key <= String(geometryFactories.length)) {
    const idx = Number(e.key) - 1;
    switchGeometry(idx);
  }
});

// Manejar el resize de la ventana
window.addEventListener('resize', () => {
   // Cambiar color aleatorio del material (opcional)
   const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
   material.color.set(newColor);

   // Ajustar tamaño del canvas y render
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight; 
   renderer.setSize(window.innerWidth, window.innerHeight);

   // Actualizar cámara
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
});
