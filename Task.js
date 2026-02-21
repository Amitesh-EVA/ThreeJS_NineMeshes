import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/Addons.js';
// import {scene } from'./CameraAndRenderer/camera.js'
// import { activeCamera } from './CameraAndRenderer/activeCamera.js';
// import {canvas, renderer } from './CameraAndRenderer/renderer.js';
// import { ambientLight,directionalLight,pointLight,spotLight} from './Lights/lights.js';
// import { geometries } from './Geometry/geometries.js';
// import { materials } from './Materials/materials.js';


// const planeGeometry = new THREE.PlaneGeometry(30,30);
// const planeMaterial = new THREE.MeshStandardMaterial({
//     color:'gray',
//     side: THREE.DoubleSide
// });
// const plane = new THREE.Mesh(planeGeometry,planeMaterial);
// plane.rotation.x = -Math.PI / 2;
// plane.position.y = -3;
// plane.receiveShadow = true;
// scene.add(plane);

// let geometry=new THREE.BoxGeometry(4,4,4);
// let material= new THREE.MeshStandardMaterial({
//         color:'green',
//         metalness:0.5,
//     });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 2;
// mesh.castShadow = true;
// scene.add(mesh);

// // const helper = new THREE.SpotLightHelper(spotLight);
// // scene.add(helper);

// export const controls = new OrbitControls(activeCamera, canvas);
// controls.enableDamping = true;
// controls.dampingFactor=0.05;

// spotLight.visible=true;
// pointLight.visible=true;

// let line;
//     function updateMesh({ geometry, material, positionY = 2, rotationZ = 0 }) {

//         if (line) {
//             scene.remove(line);
//             line = null;
//         }

//             mesh.geometry.dispose();
//             mesh.material.dispose();

//             mesh.geometry = geometries[geometry]();
//             mesh.material = materials[material]();

//             mesh.position.y = positionY;
//             mesh.rotation.set(0, 0, rotationZ);
//         }

//     const dynamicGeometry = document.getElementById('extraGeometry');
//     const dynamicMaterial = document.getElementById('extraMaterial');

//     if (dynamicGeometry && dynamicMaterial) {
//     const keys = Object.keys(geometries);
//     for (let i = 0; i < keys.length; i++) {

//         const option = document.createElement('option');
//         option.value = keys[i];
//         option.innerText = keys[i];
//         dynamicGeometry.appendChild(option);
//     }

//     const materialKeys = Object.keys(materials);
//     for (let i = 0; i < materialKeys.length; i++) {

//         const option = document.createElement('option');
//         option.value = materialKeys[i];
//         option.innerText = materialKeys[i];
//         dynamicMaterial.appendChild(option);
//     }
// }

// dynamicGeometry.addEventListener('change', () => {

//     const selectedGeometry = dynamicGeometry.value;
//     console.log(dynamicGeometry);
//     // if(geometries[selectedGeometry])

//     if (geometries[selectedGeometry]) {
//         mesh.geometry.dispose();
//         mesh.geometry = geometries[selectedGeometry]();
//     }

// });
// dynamicMaterial.addEventListener('change', () => {

//     const selectedMaterial = dynamicMaterial.value;

//     if (materials[selectedMaterial]) {
//         mesh.material.dispose();
//         mesh.material = materials[selectedMaterial]();
//     }
// });

// window.addEventListener('keydown', (event) => {

//     switch(event.key){
//         case '1':
//             updateMesh({
//                 geometry: 'box',
//                 material: 'standard',
//                 positionY: 2,
//                 spotLight: false,
//             });
//             dynamicGeometry.value = 'box';
//             dynamicMaterial.value = 'standard';
//             break;

//         case '2':
//             updateMesh({
//                 geometry: 'sphere',
//                 material: 'phong',
//                 positionY: 4,
//             });
//             dynamicGeometry.value= 'sphere';
//             dynamicMaterial.value="phong";
//             break;

//         case '3':
//             updateMesh({
//                 geometry: 'cone',
//                 material: 'lambert'
//             });
//             dynamicGeometry.value= 'cone';
//             dynamicMaterial.value="lambert";
//             break;

//         case '4':
//             updateMesh({
//                 geometry: 'edge',
//                 material: 'lineBasic'
//             });
//             // const edges = new THREE.EdgesGeometry(mesh.geometry);
//             console.log(geometries.edge);
//             line = new THREE.LineSegments(geometries.edge,materials.lineBasic);
//             line.position.y = 2;
//             scene.add(line);

//             dynamicGeometry.value= 'edge';
//             dynamicMaterial.value="lineBasic";   
//             break;

//         case '5':
//             updateMesh({
//                 geometry: 'capsule',
//                 material: 'toon',
//                 positionY: 5,
//                 rotationZ: Math.PI,
//             });
//             plane.position.y = -4;
//             dynamicGeometry.value= 'capsule';
//             dynamicMaterial.value="toon";
//             break;

//         case '6':
//             updateMesh({
//                 geometry: 'cylinder',
//                 material: 'physical',
//                 positionY: 4
//             });
//             dynamicGeometry.value= 'cylinder';
//             dynamicMaterial.value="physical";
//             break;

//         case '7':
//             updateMesh({
//                 geometry: 'shape',
//                 material: 'basic',
//                 pointLight: false,
//                 spotLight: false
//             });
//             dynamicGeometry.value= 'shape';
//             dynamicMaterial.value="basic";
//             break;

//         case '8':
//             updateMesh({
//                 geometry: 'plane',
//                 material: 'shadow'
//             });
//             dynamicGeometry.value= 'plane';
//             dynamicMaterial.value="shadow";
//             break;

//         case '9':
//             updateMesh({
//                 geometry: 'torus',
//                 material: 'normal'
//             });
//             dynamicGeometry.value= 'torus';
//             dynamicMaterial.value="normal";
//             break;

//         default:
//             updateMesh({
//                 geometry: 'box',
//                 material: 'standard',
//                 spotLight: false,
//             });
//             dynamicGeometry.value= 'box';
//             dynamicMaterial.value="standard";
//     }
// });

// function animate(){
//     window.requestAnimationFrame(animate);

//             mesh.rotation.x += 0.02;
//             mesh.rotation.y += 0.02;

//         if(line){
//             line.rotation.x+=0.02;
//             line.rotation.y+=0.02;
//         }
    
//         controls.update();
//         renderer.render(scene,activeCamera);
//     }
//     animate();

// window.addEventListener('resize', () => {
//     activeCamera.aspect=window.innerWidth/window.innerHeight;
//     activeCamera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth,window.innerHeight)
// })



//#region Project2
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(0,2,18);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


const ambientLight= new THREE.AmbientLight({color:0xffffff},2);
scene.add(ambientLight);
const directionalLight=new THREE.DirectionalLight({color:0xffffff},2)
scene.add(directionalLight);
// const axesHelper = new THREE.AxesHelper(7);
// scene.add(axesHelper);

let width = document.getElementById("widthInput").value;
let height = document.getElementById("heightInput").value;
let depth = document.getElementById("depthInput").value;
const updateBtn= document.getElementById("updateBtn")

let radius=Math.min(height,width)*0.25;
document.getElementById("radiusInput").value=radius;




const shape= new THREE.Shape();
shape.moveTo(0,0);
shape.lineTo(width,0);
shape.lineTo(width,height);
shape.lineTo(0,height);
shape.lineTo(0,0);


function createHole(x,y,radius){
    const hole= new THREE.Path();
    hole.absarc(x, y, radius, 0, Math.PI*2, true);
    return hole;
}


shape.holes.push(createHole(width/4, 3*height/4, radius/2));
shape.holes.push(createHole(3*width/4, 3*height/4, radius/2));
shape.holes.push(createHole(width/4, height/4, radius/2));
shape.holes.push(createHole(3*width/4, height/4, radius/2));


let extrudeSettings = {
  depth: depth,
  bevelEnabled: false
};

let geometry= new THREE.ExtrudeGeometry(shape, extrudeSettings);
geometry.center();
const material = new THREE.MeshStandardMaterial({
    color: 'Grey',
    metalness: 0.5,
});

let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const applyChanges= () =>{

    width = document.getElementById("widthInput").value;
    height = document.getElementById("heightInput").value;
    depth = document.getElementById("depthInput").value;
    radius=document.getElementById("radiusInput").value;

    if(radius==width || radius == height){
        alert('Maximum radius reached');
    }

    const shape= new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(width,0);
    shape.lineTo(width,height);
    shape.lineTo(0,height);
    shape.lineTo(0,0);

    shape.holes.push(createHole(width/4, 3*height/4, radius/2));
    shape.holes.push(createHole(3*width/4, 3*height/4, radius/2));
    shape.holes.push(createHole(width/4, height/4, radius/2));
    shape.holes.push(createHole(3*width/4, height/4, radius/2));

    extrudeSettings = {
    depth: depth,
    bevelEnabled: false
    };

    const updatedGeometry= new THREE.ExtrudeGeometry(shape,extrudeSettings);
    updatedGeometry.center();
    mesh.geometry.dispose();
    mesh.geometry=updatedGeometry;
    return mesh;
}

updateBtn.addEventListener("click", applyChanges);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
})

//#endregion