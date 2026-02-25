import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000000
)
camera.position.set(0, 0, 900)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(600,800,1200)
scene.add(directionalLight);


// const axesHelper= new THREE.AxesHelper(400);
// scene.add(axesHelper);

let width=500;
let height=100;
let depth=300;
let angle1= 0*(Math.PI/180);
let angle2= 45*(Math.PI/180);


const w=width/2;
const d= depth/2;
const h=height/2;
const a= height/Math.tan(angle1);
const b= height/Math.tan(angle2);
const r=100;
const shape= new THREE.Shape();
// shape.moveTo(-w,-h);
// shape.lineTo(-w,-h);
// shape.lineTo(w,-h);
// shape.lineTo(w,h);
// shape.lineTo(-w,h);
// shape.lineTo(-w,-h);

shape.moveTo(0,0).absarc(0,0,r,0,Math.PI*2, false);


const extrudedSettings={
  depth:depth,
  bevelEnabled:false,
}
const geometry=new THREE.ExtrudeGeometry(shape,extrudedSettings);
const arr= geometry.attributes.position.array;
for (let i = 0; i < arr.length; i+=3) {
  let x=arr[i];
  let y=arr[i+1];
  let z=arr[i+2];

  // if(x < 0 && y == h){
  //   arr[i] = x+a;
  // }
  // if( x > 0 && y == h){
  //   arr[i]= x-b;
  // }

  if(z > d){
    arr[i+2]=z-y*Math.tan(angle1);
  }
  
  if(z < d){
    arr[i+2]=z+y*Math.tan(angle2);
  }
  
  if(y*Math.tan(angle1) + y*Math.tan(angle2) > depth){
    console.log(y*Math.tan(angle1)+y*Math.tan(angle2));
    alert("Invalid Input");
    depth=300;
    angle1= 45*Math.PI/180;
    angle2= 45*Math.PI/180;
  }
}
 

// if( a+b > width ||(angle1 < 20 && angle1 > 89) || (angle2 < 20 && angle2 > 89) ){
//   alert('Invalid Input');
//   angle1= 45*(Math.PI/180);
//   angle2= 45*(Math.PI/180);
// }

const edges= new THREE.EdgesGeometry(geometry);
const lineMaterial= new THREE.LineBasicMaterial({color:'blue'})
const line= new THREE.LineSegments(edges,lineMaterial);
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

