console.log("Jardin 01 - Lunes 5- Sep - Canvas 2D");   
console.log(THREE);

//configurar <canvas>
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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