console.log("Jardin 05 - Jueves 11- Sep - Op Art 3D");

// Configurar <canvas>
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Cámara
const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 40;

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(canvas.width, canvas.height);

// Paleta de colores metalizados
const coloresMetalicos = [
  0xc0c0c0, // plata
  0xd4af37, // oro
  0x8a7f8e, // titanio
  0xb87333, // cobre
  0xaaa9ad, // acero
  0x3a3a3a  // hierro oscuro
];

// Crear grupo de anillos
const grupo = new THREE.Group();
const numAnillos = 18;
for (let i = 0; i < numAnillos; i++) {
  const radio = 5 + i * 1.1;
  const grosor = 0.3 + Math.sin(i) * 0.15;
  const color = coloresMetalicos[i % coloresMetalicos.length];
  const geometry = new THREE.TorusGeometry(radio, grosor, 16, 100);
  // Material metálico
  const material = new THREE.MeshStandardMaterial({
    color: color,
    metalness: 0.8,
    roughness: 0.3
  });
  const torus = new THREE.Mesh(geometry, material);
  torus.rotation.x = Math.PI / 2;
  grupo.add(torus);
}
scene.add(grupo);

// Luz ambiental y direccional para reflejos metálicos
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(20, 20, 40);
scene.add(directionalLight);

// Animación op art
function animateOpArt() {
  requestAnimationFrame(animateOpArt);
  grupo.rotation.z += 0.005;
  grupo.rotation.x = Math.sin(Date.now() * 0.001) * 0.3;
  grupo.children.forEach((torus, idx) => {
    torus.rotation.y += 0.01 + idx * 0.001;
    torus.material.color.setHex(coloresMetalicos[(idx + Math.floor(Date.now() * 0.002)) % coloresMetalicos.length]);
  });
  renderer.render(scene, camera);
}
animateOpArt();