import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
)
camera.position.set(0, 0, 500)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(5, 10, 10)
scene.add(directionalLight);

// const axesHelper= new THREE.AxesHelper(8);
// scene.add(axesHelper);

const width=500
const height=100;
const depth=100;
const angle1=Math.PI/4;
const angle2=Math.PI/4;


const w=width/2;
const d= depth/2;
const h=height/2;
const x= height/Math.tan(angle1);
const y=height/Math.tan(angle2);

const geometry= new THREE.BufferGeometry();
const vertices= new Float32Array(
[
  -w, -h, d,
  w, -h, d,
  w-y, h, d,
  -w+x, h, d,

  -w, -h, -d,
  w, -h, -d,
  w-y, h, -d,
  -w+x, h, -d,
]);

const indices= [
  0,1,2,
  0,2,3,

  5,4,7,
  5,7,6,

  4,5,1,
  4,1,0,

  3,2,6,
  3,6,7,

  4,0,3,
  4,3,7,

  1,5,6,
  1,6,2  
]

geometry.setAttribute('position', new THREE.BufferAttribute(vertices,3));
geometry.setIndex(indices);

const edges= new THREE.EdgesGeometry(geometry);
const line= new THREE.LineSegments(edges);
scene.add(line)

const material= new THREE.MeshStandardMaterial({
  color:"green",
  metalness:0.4,
  side:THREE.DoubleSide
})

const mesh= new THREE.Mesh(geometry,material);
scene.add(mesh);

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

