import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene= new THREE.Scene();
scene.background= new THREE.Color('#ffffff');

const camera= new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.01,
    10000
);

camera.position.z= 300;

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls= new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(50, 50, 100);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambient);

const axesHelper= new THREE.AxesHelper(100);
scene.add(axesHelper);

const h=200;
const w=80;
const x=10;
const depth=10;
const D=15;
const d=10;
const h1=h/8-x/2;





function createParent(){
    const shape=new THREE.Shape();
    shape.moveTo(w,0);
    shape.absarc(w,0,w,3*Math.PI/2,Math.PI,true);
    shape.lineTo(x,0);
    shape.lineTo(x,3*h/4);
    shape.lineTo((w-x)/2+x,h/2);
    shape.lineTo(w,3*h/4);
    shape.lineTo(w,0);

    shape.holes.push(createHole((w-x)/2+x,-h/8,D/2));
    shape.holes.push(createHole((w-x)/4+x, 3*h/8,d/2));
    shape.holes.push(createHole(3*(w-x)/4+x, 3*h/8,d/2));
    return shape;
}

function createFirstChild(){
    const shape=new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(w-x,0);
    shape.lineTo(w-x,h/4-h/16);
    shape.lineTo(0,h/4-h/16);
    shape.lineTo(0,0);

    shape.holes.push(createHole((w-x)/4, h1, d/2));
    shape.holes.push(createHole(3*(w-x)/4, h1, d/2));

    return shape;
}

function createSecondChild(){

    const w1 = w/2;
    const shape = new THREE.Shape();

    shape.moveTo(w1/2,0);
    shape.absarc(w1/2,0,w1/2,Math.PI,0,false);
    shape.lineTo(w1,h/2);
    shape.lineTo(-0.4*w1,h/2);
    shape.lineTo(0,h/2 - h*0.05);
    shape.lineTo(0,0);

    shape.holes.push(createHole(w1/2,0,D/2));

    return shape;

}

function createHole(x,y,radius){
    const hole= new THREE.Path();
    hole.absarc(x, y, radius, 0, Math.PI*2, true);
    return hole;
}

const shape1=createParent();
const shape2=createFirstChild();
const shape3= createSecondChild();
let extrudedSettings={
    depth:depth,
    bevelEnabled:false
}
const geometry1= new THREE.ExtrudeGeometry(shape1,extrudedSettings);
const geometry2= new THREE.ExtrudeGeometry(shape2,extrudedSettings);
const geometry3= new THREE.ExtrudeGeometry(shape3,extrudedSettings);

// console.log(geometry);

const material1= new THREE.MeshStandardMaterial({
    color:'#D8BBA9',
    metalness:0.2
})
const material2= new THREE.MeshStandardMaterial({
    color:'black',
    metalness:0.6,
    roughness:0.4,
})
const material3= new THREE.MeshStandardMaterial({
    color:'red',
    metalness:0.6,
    roughness:0.4,

}) 

const parent= new THREE.Mesh(geometry1,material1);
const child1= new THREE.Mesh(geometry2,material2);
const child2= new THREE.Mesh(geometry3,material3);

child1.position.set(x, h/4 + x/2, depth);

child2.rotation.z = -50 * Math.PI / 180;
child2.position.set(
    w/4 + x/2,
    -3*h/16,
    depth
);

scene.add(parent);
parent.add(child1);
parent.add(child2);

function animate()
{
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', ()=> {
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})
