
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene= new THREE.Scene();
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

