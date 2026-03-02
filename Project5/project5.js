import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { createShape } from './createShape.js';
import { updateMesh } from './updateMesh.js';

export const scene= new THREE.Scene();
// const camera= new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth/window.innerHeight,
//     0.01,
//     10000000
// );
// camera.position.z=200;

const aspect = window.innerWidth / window.innerHeight;
const viewSize = 200; 

const camera = new THREE.OrthographicCamera(
    -viewSize * aspect, 
     viewSize * aspect, 
     viewSize,          
    -viewSize,          
     0.01,              
     10000000         
);

camera.position.z = 200;

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls= new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

const ambientLight= new THREE.AmbientLight(0xffffff,1.5);
scene.add(ambientLight);
const dirLight= new THREE.DirectionalLight(0xffffff,2);
scene.add(dirLight);

const width = 150;
const height=130;
const h1 =75;
const w1 = 25;
const depth = 10;
const holeRadius=8;

const arc=5;
const r=w1/2;

const shape= createShape(width,height,h1,w1);
addHoles(holeRadius);
export function addHoles(holeRadius=8){
    const hole1= new THREE.Path();
    hole1.absarc(width-r,h1-w1/2, holeRadius, 0 , Math.PI*2, false);
    shape.holes.push(hole1)

    const hole2= new THREE.Path();
    hole2.absarc(w1+w1+r, height-2*w1, holeRadius, 0 , Math.PI*2, false);
    shape.holes.push(hole2);

    return hole1,hole2;
}

const extrudeSettings={
    depth: depth,
    bevelEnabled: false,
    curveSegments:200
}

const geometry= new THREE.ExtrudeGeometry(shape,extrudeSettings);
geometry.center()
const material= new THREE.MeshPhysicalMaterial({
    color:'#73C2FB',
    metalness:0.4,
    clearcoat:0.8
})

let mesh= new THREE.Mesh(geometry,material);
scene.add(mesh);

const edges= new THREE.EdgesGeometry(geometry);
const lineMaterial= new THREE.LineBasicMaterial({color:'black'});
const line=new THREE.LineSegments(edges,lineMaterial);
mesh.add(line)

const meshRef = { current: mesh };

const shapeControls = {

    width: document.getElementById("width"),
    height: document.getElementById("height"),
    h1: document.getElementById("h1"),
    w1: document.getElementById("w1"),
    depth: document.getElementById("depth"),
    holeRadius: document.getElementById("holeRadius")

};

Object.values(shapeControls).forEach(control => {
    control.addEventListener("input", () => {
        updateMesh(scene, meshRef, shapeControls);
    });
});

function animate()
{
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();



window.addEventListener('resize', ()=> {
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})

