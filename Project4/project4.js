import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene=new THREE.Scene();

const camera= new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    100000
)
camera.position.z=35;


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

let width=20;
let height=10;
let depth=6;
let w1=3;
let h1=5;
let w2=3;
let h2=5;

function createShape(w,h){
    const shape= new THREE.Shape();
    // shape.moveTo(0,0);
    // shape.lineTo(w,0);
    // shape.lineTo(w,h);
    // shape.lineTo(0,h);
    // shape.lineTo(0,0);
    shape.moveTo(0,0);
    shape.lineTo(width,0);
    shape.lineTo(width,h2);
    shape.lineTo(width,height);
    shape.lineTo(0,height);
    shape.lineTo(0,h1);
    shape.lineTo(0,0);

    return shape;
} 

function cutGeometry(geometry,w1,h1,w2,h2){
    let oldVertices=geometry.attributes.position;
    console.log(oldVertices.count)
    let newVertices= new Float32Array(oldVertices.count*3+3);

    newVertices.set(oldVertices.array);

    let newIndex = oldVertices.count * 3;
    newVertices[newIndex] = 0
    newVertices[newIndex + 1] = h1;
    newVertices[newIndex + 2] = 0; 

    geometry.setAttribute('position', new THREE.BufferAttribute(newVertices, 3));
    geometry.attributes.position.needsUpdate = true;


    oldVertices=geometry.attributes.position;
    console.log(oldVertices.array)
    console.log(oldVertices.count)
    newVertices= new Float32Array(oldVertices.count*3+3);

    newVertices.set(oldVertices.array);

    newIndex = oldVertices.count * 3;
    newVertices[newIndex] = 0
    newVertices[newIndex + 1] = h2;
    newVertices[newIndex + 2] = 0; 

    geometry.setAttribute('position', new THREE.BufferAttribute(newVertices, 3));
    geometry.attributes.position.needsUpdate = true;
    // console.log(geometry.attributes.position.array)
    console.log(geometry)

    // shape.moveTo(0,0);
    // shape.lineTo(width,0);
    // shape.lineTo(width,h2);
    // shape.lineTo(width,height);
    // shape.lineTo(0,height);
    // shape.lineTo(0,h1);
    // shape.lineTo(0,0);
    geometry= new THREE.ExtrudeGeometry(shape,extrudedSettings);

    const arr= geometry.attributes.position.array;
    for(let i=0; i< arr.length; i+=3){
        let x=arr[i];
        let y=arr[i+1];

        if(y==0){
            if(x==0){
                arr[i]=x+w1;
            }
            if(x==width){
                arr[i]=x-w2;    
            }
        }
       if(y== height){
        if(x==0){
            arr[i]=x+w1;
        }
        if(x==width){
            arr[i]=x-w2;
        }
       }

    }
    return geometry;
}  

let extrudedSettings={
    depth:depth,
    bevelEnabled:false
}
const shape= createShape(width,height);
let geometry= new THREE.ExtrudeGeometry(shape,extrudedSettings);
geometry= cutGeometry(geometry,w1,h1,w2,h2);

const material= new THREE.MeshStandardMaterial({
    color:'#049ef4',
    metalness:0.6,
    roughness:0.4,


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








   