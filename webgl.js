import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import image from "./texture.jpg";

let camera,
  scene,
  renderer,
  controls,
  path = [
    [0, 20, 0],
    [0, 15, 0],
    [0, 14, 1],
    [0, 13, 2],
    [0, 12, 3],
    [0, 11, 4],
    [5, 10, 5],
    [6, 9, 4],
    [7, 8, 3],
    [7, 7, 2],
    [6, 6, 1],
    [5, 5, 0],
    [4, 4, 0],
    [3, 3, 0],
    [2, 2, 0],
    [1, 1, 0],
    [0, 0, 0]
  ];

// load a texture, set wrap mode to repeat
var texture = new THREE.TextureLoader().load(image);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

const createCube = (x, y, z) => {
  let geometry = new THREE.BoxGeometry(1, 1, 1),
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
    1000
  );
  camera.position.z = 30;
  camera.position.y = 10;

  scene = new THREE.Scene();

  //Grid
  const grid = new THREE.GridHelper(50, 10, "rgb(47,48,49)", "rgb(57,58,59)");
  scene.add(grid);

  let geometry = new THREE.CylinderGeometry(0.05, 0.05, 20, 32),
    material = new THREE.MeshBasicMaterial({ color: "rgb(47,48,49)" }),
    yline = new THREE.Mesh(geometry, material);
  yline.position.set(0, 10, 0);

  scene.add(yline);

  //Data
  for (let i = 0; i < path.length; i++) {
    let [x, y, z] = path[i],
      c = createCube(x, y, z);
    scene.add(c);
  }

  //Light
  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  // White directional light at half intensity shining from the top.
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("rgb(27,28,29)");
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
