import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { createFrameShape } from './createFrameShape';
import { createBeadShape } from './createBeadShape';
import { createDesign } from './createDesign';


const scene= new THREE.Scene();
scene.background=new THREE.Color('white')

//used Perspective Camera
const camera= new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.01,
    10000
);
camera.position.z= 1200;

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls= new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.dampingFactor=0.05;

const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light)
const ambient = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambient);

const axesHelper= new THREE.AxesHelper(500);
scene.add(axesHelper);


const originX=0;
const originY=0;
const outerH1=30;
const outerWidth=40;
const outerHeight=50
const beadH=15;
const beadW=10;
const designHeight=1000;
const designWidth=1000;

// const frameShape= createFrameShape(originX,originY,outerH1,outerWidth,outerHeight);
// scene.add(frameShape);
// const beadShape=createBeadShape(originX,originY,beadW,beadH);
// scene.add(beadShape);

const design=createDesign(originX,originY,outerH1,outerWidth,outerHeight,designWidth,designHeight,beadW,beadH);
design.position.set(originX-designWidth/2,originY-designHeight/2,0)
scene.add(design)


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
