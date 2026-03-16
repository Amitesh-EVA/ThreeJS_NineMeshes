import * as THREE from 'three'
import { createFigure } from './Figures/createFigure';
import { createDashedLines } from './Design/createDashedLines';
import { createProfileBox } from './createProfileBox';
import { createRightInfoPart } from './createRightInfoPart';
import { positionProfileInputs, positionRightInfoInputs } from './createInputs';
import { createDesign } from './Design/createDesign';
import { createText, font } from './addWindowDimension';
import { createHandleCAD } from './createCadHandle';



const scene= new THREE.Scene();
scene.background= new THREE.Color(0xffffff)

const width = 1500;
const height =1500;
const h1=0.05*(Math.max(width,height));
const beadH=3
const originX=0;
const originY=0;

const boardW= width*4;
const boardH= height*2;

const boardGeometry = new THREE.PlaneGeometry(boardW,boardH);
const boardMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
const board = new THREE.Mesh(boardGeometry,boardMaterial);
scene.add(board);

const edges = new THREE.EdgesGeometry(boardGeometry);
const border = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: "red" })
);
board.add(border);

const aspect = window.innerWidth / window.innerHeight;
const viewSize = Math.max(boardW / aspect, boardH) * 0.6;

export const camera = new THREE.OrthographicCamera(
    -viewSize * aspect,
     viewSize * aspect,
     viewSize,          
    -viewSize,          
     0.01,              
     100        
);
camera.position.z=50;

export const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const controls=new OrbitControls(camera,renderer.domElement);

const design=createDesign(originX,originY,width,height,h1,beadH);
// board.add(design);

const centerDashedLines= createDashedLines(0,0,width,height);
// board.add(centerDashedLines);

//Window Dimensions
const widthText = createText(`${width} mm`, font );
widthText.position.set(originX,originY+height/2,0);
board.add(widthText);
console.log("Print", board)

//Left Top Box
const profileW = boardW/6;
const profileH = boardW/6;
let profileMargin = 50;

if(profileMargin >= profileW || profileMargin >= profileH){
    profileMargin=0;
}
const profileDetails= createProfileBox(originX,originY,profileW,profileH);
const profileX = -boardW/2+profileMargin;
const profileY = boardH/2 - profileH- profileMargin;
profileDetails.position.set(profileX, profileY,0);
board.add(profileDetails);

//Bottom Figure Box
const figureMargin=0;
const figure=createFigure(originX,originY,boardW,boardH);
figure.position.set(-boardW/2+figureMargin,-boardH/2+figureMargin);
board.add(figure);

//right Info Box
const rightInfoWidth= (boardW/2-width/2)/1.5;
const rightInfoPart= createRightInfoPart(originX,originY,rightInfoWidth,boardH);
rightInfoPart.position.set(originX+boardW/4,-boardH/2);
board.add(rightInfoPart);


const handle = createHandleCAD(50,250);
board.add(handle);

function animate()
{
    requestAnimationFrame(animate);
    positionProfileInputs(profileW,profileH,profileX,profileY,camera,renderer);
    positionRightInfoInputs(originX+boardW/4,-boardH/2,rightInfoWidth,boardH,camera,renderer);
    // controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = -viewSize * aspect;
    camera.right = viewSize * aspect;
    camera.top = viewSize;
    camera.bottom = -viewSize;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
