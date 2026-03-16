import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { beadParts, createDesign, frameParts } from './createDesign';
import { highlightFrame } from './highlightFrame';
import { highlightBead } from './highlightBead';
import { createGlass } from './createGlass';

const scene= new THREE.Scene();
scene.background=new THREE.Color('white')

//used Perspective Camera
export const camera= new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.01,
    10000
);

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls= new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.dampingFactor=0.05;

const light = new THREE.DirectionalLight(0xffffff,1.5 );
scene.add(light)
const ambient = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambient);
// const axesHelper=new THREE.AxesHelper(100);
// scene.add(axesHelper);


//All Dimensions
const originX=0;
const originY=0;
const designHeight=500; 
const designWidth=500;
const outerWidth=40;
const outerHeight=60;
const outerH1=0.7*outerHeight;
const beadH=outerHeight-outerH1; //beadProfile height
const beadW=0.4*outerWidth; //beadProfile Width
const GVA=10 //glass Vertical Adjustment
const GHA=10; //glass Horizontal Adjustment
const legW=10;
const glassHeight=designHeight-2*outerH1-GVA;
const glassWidth=designWidth-2*outerH1-GHA;
const glassThickness=outerWidth-(legW+beadW)-GVA/2;

camera.position.z= Math.max(designHeight,designWidth);

const design=createDesign(originX,originY,outerH1,outerWidth,outerHeight,designWidth,designHeight,beadW,beadH);
design.position.set(originX-designWidth/2,originY-designHeight/2,0)

const glass=createGlass(glassWidth,glassHeight,glassThickness);
glass.position.set(0,0,-1.5*beadW);

const designGroup= new THREE.Group();
designGroup.add(design);
designGroup.add(glass);

// designGroup.position.z+=100;

scene.add(designGroup);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("dblclick", onMouseClick);

function onMouseClick(event){

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const objects = [...frameParts, ...beadParts];
    const intersects = raycaster.intersectObjects(objects);

    if(intersects.length > 0){

        const clicked = intersects[0].object;
        console.log(clicked);

        if(clicked.userData === "frame"){
            highlightFrame(clicked);
        }

        if(clicked.userData === "bead"){
            highlightBead(clicked);
        }

    }
    else{
        resetAllPartsColor();
    }
    }

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
