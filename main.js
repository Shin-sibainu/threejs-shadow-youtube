import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

//size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000
);
camera.position.set(0, 3, 65);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

//material
const material = new THREE.MeshStandardMaterial({
  color: "gray",
});

//plane
const planeGeometry = new THREE.PlaneGeometry(70, 70);
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x = -Math.PI * 0.5;
plane.receiveShadow = true;
scene.add(plane);

//box
const boxGeometry = new THREE.BoxGeometry(7, 7, 7);
const box = new THREE.Mesh(boxGeometry, material);
box.position.y = 3.5;
box.castShadow = true;

scene.add(box);

//light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
// directionalLight.position.set(3, 3, 0);
// scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 150, Math.PI * 0.3);
pointLight.position.x = 5;
pointLight.position.y = 15;
pointLight.position.z = -5;
// pointLight.lookAt(0, 0, 0);
pointLight.castShadow = true;

pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

pointLight.shadow.camera.near = 7;
pointLight.shadow.camera.far = 16;

scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 3);
// scene.add(pointLightHelper);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);

// //fog
// const fog = new THREE.Fog("#262837", 50, 7);
// scene.fog = fog;

//Control
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

const clock = new THREE.Clock();

//animation
function animate() {
  const elapsedTime = clock.getElapsedTime();

  control.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  // Update sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();
