console.log("Jardin 01 - Lunes 5 Sep - Canvas 2D");   
console.log(THREE);

//configurar <canvas>
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//escena
const scene = new THREE.Scene();
// Cambia el color de fondo de la escena
scene.background = new THREE.Color(0xf5e1da); // color pastel

//camara
const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);

//geometria
const geometry = new THREE.CylinderGeometry(1, 1, 3, 60, 60);

//material con color personalizado
const material = new THREE.MeshPhongMaterial({ color: 0x6a8caf, flatShading: true, shininess: 100 });

//mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.z = -5;

// Luz para que se vea el color
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

//render
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(canvas.width, canvas.height);

//renderizar
renderer.render(scene, camera);

//animación
function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();