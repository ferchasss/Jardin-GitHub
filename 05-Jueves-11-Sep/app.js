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

// Paleta op art (blanco y negro, y algunos acentos pastel)
const colores = [0xffffff, 0x222222, 0xe57399, 0x7fd8be, 0xf7e967, 0xb39ddb];

// Crear grupo de anillos
const grupo = new THREE.Group();
const numAnillos = 18;
for (let i = 0; i < numAnillos; i++) {
  const radio = 5 + i * 1.1;
  const grosor = 0.3 + Math.sin(i) * 0.15;
  const color = colores[i % colores.length];
  const geometry = new THREE.TorusGeometry(radio, grosor, 16, 100);
  const material = new THREE.MeshBasicMaterial({color: color});
  const torus = new THREE.Mesh(geometry, material);
  torus.rotation.x = Math.PI / 2;
  grupo.add(torus);
}
scene.add(grupo);

// Luz suave para acentos
const light = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(light);

// Animación op art
function animateOpArt() {
  requestAnimationFrame(animateOpArt);
  grupo.rotation.z += 0.005;
  grupo.rotation.x = Math.sin(Date.now() * 0.001) * 0.3;
  grupo.children.forEach((torus, idx) => {
    torus.rotation.y += 0.01 + idx * 0.001;
    torus.material.color.setHex(colores[(idx + Math.floor(Date.now() * 0.002)) % colores.length]);
  });
  renderer.render(scene, camera);
}
animateOpArt();