import * as THREE from "three";
import image from "./texture.jpg";

let camera, scene, renderer, geometry, material, mesh;

const init = () => {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  scene = new THREE.Scene();

  // load a texture, set wrap mode to repeat
  var texture = new THREE.TextureLoader().load(image);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  console.log(texture);

  geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  material = new THREE.MeshPhongMaterial({ map: texture });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //Light
  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  // White directional light at half intensity shining from the top.
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};

const animate = () => {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
};

// Go
init();
animate();
