import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene=new THREE.Scene();

const camera= new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    100000
)
camera.position.z=50;


const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls= new OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;

const ambientLight= new THREE.AmbientLight(0xffffff, 1.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
scene.add(directionalLight);

// const axesHelper= new THREE.AxesHelper(20)
// scene.add(axesHelper);

let width=30;
let height=20;
let depth=10;
let w1=5;
let h1=10;
let w2=5;
let h2=10;
const segments=5       ;

function createShape(w,h){
    const shape= new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(w,0);
    shape.lineTo(w,h);
    shape.lineTo(0,h);
    shape.lineTo(0,0);
    return shape;
} 

function createSegmentedShape(width, height, segments) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    for (let i = 1; i <= segments; i++) {
      shape.lineTo((i / segments) * width, 0);
    }
    for (let i = 1; i <= segments; i++) {
      shape.lineTo(width, (i / segments) * height);
    }
    for (let i = segments - 1; i >= 0; i--) {
      shape.lineTo((i / segments) * width, height);
    }
    for (let i = segments - 1; i >= 0; i--) {
      shape.lineTo(0, (i / segments) * height);
    }
    return shape;
}

function cutGeometry(geometry,w1,h1,w2,h2){
    console.log(geometry.attributes.position.array)

    const arr= geometry.attributes.position.array;
    for(let i=0; i< arr.length; i+=3){
        let x=arr[i];
        let y=arr[i+1];

        const p= w1/h1;
        const q=w1/(height-h1);

        const m= w2/h2;
        const n=w2/(height-h2);

        if(x===0){
            if(y>=h1){
                arr[i]=(q*(y-h1));
            }
            else{
                arr[i]=(p*(h1-y)); 
            }
        }
        if(x===width){
            if(y>=h2){
                arr[i]=width-(n*(y-h2));
            }
            else{
                arr[i]=width-(m*(h2-y));
            }
        }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
}  

let extrudedSettings={
    depth:depth,
    steps:segments,
    bevelEnabled:false
}
let shape= createShape(width,height);
shape= createSegmentedShape(width,height,segments);
let geometry= new THREE.ExtrudeGeometry(shape,extrudedSettings);
geometry=cutGeometry(geometry,w1,h1,w2,h2);
console.log(geometry);

const material= new THREE.MeshStandardMaterial({
    color:'#049ef4',
    metalness:0.6,
    roughness:0.4,
    // wireframe:true


})
 const mesh= new THREE.Mesh(geometry,material);
 scene.add(mesh);


const edges= new THREE.EdgesGeometry(geometry);
const lineMaterial= new THREE.LineBasicMaterial({color:'red'});
const line= new THREE.LineSegments(edges,lineMaterial);
mesh.add(line);



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








   