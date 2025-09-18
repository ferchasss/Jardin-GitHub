// Asegúrate de tener Three.js importado en tu HTML

// Configurar canvas y escena
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 20;

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(canvas.width, canvas.height);

// Tronco (cilindro)
const troncoGeometry = new THREE.CylinderGeometry(0.7, 0.7, 6, 32);
const troncoMaterial = new THREE.MeshStandardMaterial({color: 0x8d5524});
const tronco = new THREE.Mesh(troncoGeometry, troncoMaterial);
tronco.position.y = -3;
scene.add(tronco);

// Copa (esfera)
const copaGeometry = new THREE.SphereGeometry(3, 32, 32);
const copaMaterial = new THREE.MeshStandardMaterial({color: 0x228b22});
const copa = new THREE.Mesh(copaGeometry, copaMaterial);
copa.position.y = 2;
scene.add(copa);

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 20);
scene.add(light);

// Animación
function animate() {
  requestAnimationFrame(animate);
  copa.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();