console.log("Jardin 04 - Miercoles 10- Sep - Canvas 2D");

//configurar <canvas>
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Paleta de colores menos saturados y más suaves
const colores = [
  "#e57399", "#f7b267", "#7fd8be", "#7ec4cf", "#f7e967", "#e59ec9",
  "#f7a072", "#8fd694", "#b39ddb", "#e0aaff", "#f7b7a3", "#a3f7bf"
];

// Definir cuadrado central
const size = Math.min(canvas.width, canvas.height) * 0.8;
const x0 = (canvas.width - size) / 2;
const y0 = (canvas.height - size) / 2;

// Parámetros de barras
const numBarras = 120;

// Estado para interacción
let mouseX = -1;
let mouseY = -1;

// Escuchar movimiento del mouse
canvas.addEventListener("mousemove", function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
canvas.addEventListener("mouseleave", function() {
  mouseX = -1;
  mouseY = -1;
});

// Animación dinámica de barras (base y tope irregulares + interacción mouse)
function drawBarras(time) {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#222";
  ctx.fillRect(x0, y0, size, size);

  for (let i = 0; i < numBarras; i++) {
    const t = time * 0.2;
    const rand = Math.sin(t/900 + i*2) + Math.cos(t/700 + i*3) + Math.sin(t/500 + i*5);
    const anchoBarra = (size / numBarras) * (0.5 + Math.abs(rand) * 1.5);
    ctx.fillStyle = colores[(i + Math.floor(t/200)) % colores.length];

    // Altura base y tope irregulares
    const alturaTotal = size * (0.5 + Math.abs(Math.cos(t/1200 + i*1.7) + Math.sin(t/800 + i*2.3)) * 0.25);
    const baseOffset = Math.sin(t/1000 + i*3.5) * 20 + Math.cos(t/700 + i*2.1) * 15;
    const topOffset = Math.cos(t/1100 + i*2.7) * 20 + Math.sin(t/900 + i*1.3) * 15;

    // Calcula posición y altura para que ambas partes sean irregulares
    const barraX = x0 + i * (size / numBarras);
    const barraY = y0 + size - alturaTotal + baseOffset;
    const barraAltura = alturaTotal - baseOffset - topOffset;

    // Detectar si el mouse está sobre la barra
    let reaccion = 1;
    if (
      mouseX >= barraX &&
      mouseX <= barraX + anchoBarra &&
      mouseY >= barraY &&
      mouseY <= barraY + barraAltura
    ) {
      reaccion = 2.5; // reacción más fuerte
    }

    ctx.fillRect(
      barraX,
      barraY - (reaccion - 1) * 30, // mueve más si hay reacción
      anchoBarra,
      (barraAltura > 0 ? barraAltura : 2) + (reaccion - 1) * 40 // crece si hay reacción
    );

    // Barra delgada encima para contraste y tamaño aleatorio
    const anchoDelgada = anchoBarra * (0.3 + Math.abs(Math.sin(t/600 + i*2.5)) * 0.5);
    ctx.fillStyle = colores[(i + Math.floor(t/80)) % colores.length];
    ctx.fillRect(
      barraX + anchoBarra / 4,
      barraY - (reaccion - 1) * 30,
      anchoDelgada,
      ((barraAltura > 0 ? barraAltura : 2) * (0.5 + Math.abs(Math.sin(t/900 + i*3.1)) * 0.5)) + (reaccion - 1) * 20
    );
  }
  requestAnimationFrame(drawBarras);
}

drawBarras(0);

//creamos nuestros elementos basicos
//escena, camara, mesh, renderer
//escena
const scene = new THREE.Scene();
//camara
//const camera = new THREE.Camera(fov, aspectRadio, near, far);
const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);

//mesh
//geometria//radius, radialSegments, heightSegments
const geometry = new THREE.CylinderGeometry();
(1, 60, 60);
//material
const material = new THREE.MeshNormalMaterial({flatShading: true});

    //configuracion de matcaps
    //inicio
// Material.
const textureLoader = new THREE.TextureLoader();
var matcapMaterial;
var mesh;
var matcapMap = textureLoader.load(
   // Textura URL
   './texture/roca-rosa.png',
   // on Load callback
   function (texture) {
       matcapMaterial = new THREE.MeshMatcapMaterial( { matcap: texture } );
       // Mesh.
       mesh = new THREE.Mesh( geometry, matcapMaterial );
       // 3. Poner objeto en la escena.
       scene.add(mesh);
       mesh.position.z = -5;
       // 4. Activar animación.
       animate();
   },
   // on Progress (no funciona por ahora)
   undefined,
   // on Error callback
   function (error) { console.error("Algo salio mal con la textura,", error); }
);

    //fin

    //render
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(canvas.width, canvas.height);

    //dar instruccion de renderizar o impimir nuestro elemento
    renderer.render(scene, camera);

    //tip para animar nuestro mesh
    function animate(){
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }