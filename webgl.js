import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import image from "./texture.jpg";

let camera, scene, renderer, controls;

// load a texture, set wrap mode to repeat
var texture = new THREE.TextureLoader().load(image);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

const createCube = (x, y, z) => {
  let geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1),
    material = new THREE.MeshBasicMaterial({ map: texture }),
    mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  return mesh;
};

const init = () => {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  scene = new THREE.Scene();

  let c = createCube(0, 0, 0);
  scene.add(c);

  //Light
  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  // White directional light at half intensity shining from the top.
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  //Camera
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0, 0);

  document.body.appendChild(renderer.domElement);
};

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Go
init();
animate();
