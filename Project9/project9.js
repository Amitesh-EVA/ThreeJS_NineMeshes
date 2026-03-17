import * as THREE from 'three'
import { createFigure } from './Figures/createFigure';
import { createDashedLines } from './Design/createDashedLines';
import { createProfileBox } from './createProfileBox';
import { createRightInfoPart } from './createRightInfoPart';
import { positionProfileInputs, positionRightInfoInputs } from './createInputs';
import { createDesign } from './Design/createDesign';
import { createText, font } from './addWindowDimension';
import { createHandleCAD } from './createCadHandle';
 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
 
const width   = 500;
const height  = 500;
const outerH  = 0.15 * (Math.max(width, height));
const h1      = 0.8  * outerH;
const beadH   = outerH - h1;
const originX = 0;
const originY = 0;
const outerHeight = 70;
 
const boardW = width  * 4;
const boardH = height * 2;
 
const boardGeometry = new THREE.PlaneGeometry(boardW, boardH);
const boardMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
const board = new THREE.Mesh(boardGeometry, boardMaterial);
scene.add(board);
 
const edges  = new THREE.EdgesGeometry(boardGeometry);
const border = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: "red" })
);
board.add(border);
 
const aspect   = window.innerWidth / window.innerHeight;
const viewSize = Math.max(boardW / aspect, boardH) * 0.6;
 
export const camera = new THREE.OrthographicCamera(
    -viewSize * aspect,
     viewSize * aspect,
     viewSize,
    -viewSize,
     0.01,
     100
);
camera.position.z = 50;
 
export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
 
const design = createDesign(originX, originY, width, height, h1, beadH);
// board.add(design);
 
const centerDashedLines = createDashedLines(0, 0, width, height);
// board.add(centerDashedLines);

const handle=createHandleCAD(0,0);
board.add(handle);
 
// Window Dimensions
const widthText = createText(`${width} mm`, font);
widthText.position.set(originX, originY + height / 2, 0);
board.add(widthText);
 
// Left Top Box
const profileW = boardW / 6;
const profileH = boardW / 6;
let profileMargin = 50;
if (profileMargin >= profileW || profileMargin >= profileH) profileMargin = 0;
 
const profileDetails = createProfileBox(originX, originY, profileW, profileH);
const profileX = -boardW / 2 + profileMargin;
const profileY =  boardH / 2 - profileH - profileMargin;
profileDetails.position.set(profileX, profileY, 0);
board.add(profileDetails);
 
// Bottom Figure Box
const figure = createFigure(originX, originY, boardW, boardH);
figure.position.set(-boardW / 2, -boardH / 2);
board.add(figure);
 
// Right Info Box
const rightInfoWidth = (boardW / 2 - width / 2) / 1.5;
const rightInfoPart  = createRightInfoPart(originX, originY, rightInfoWidth, boardH);
rightInfoPart.position.set(originX + boardW / 4, -boardH / 2);
board.add(rightInfoPart);
 
let currentHandle = null;
 
// function applyHandleFromStorage() {
 
//     if (currentHandle) {
//         board.remove(currentHandle);
//         currentHandle = null;
//     }
 
//     const getUIValues = localStorage.getItem("UI values");
 
//     if (!getUIValues) {
//         currentHandle = createHandleCAD(originX + width/2, originY);
//         board.add(currentHandle);
//         return;
//     }
 
//     const params = JSON.parse(getUIValues);
 
//     const designWidth  = params.designWidth  || width;
//     const designHeight = params.designHeight || height;
//     let   GHH          = params.GHH ?? designHeight/2;
//     const handleHeight = params.handleHeight || 150;
//     const sideIndex = params.sideIndex ?? 1;
//     const handleType   = params.handleType || "left";
 
//     if (GHH > designHeight - handleHeight/3) {
//         GHH = designHeight/2;
//     }else if (GHH < 0) {
//         GHH = 0;
//     }
 
//     // const frameLeft   = originX - designWidth/2;
//     // const frameBottom = originY - designHeight/2;
 
//     let handleX;
//     let handleY;
 
//     if (sideIndex === 0) {
 
//         const frontOffset = (handleType === "left") ? h1 : h1/6;
//         handleX=originX+designWidth/2;
//         handleY=originY+frontOffset;
 
//         // handleX = frameLeft + designWidth/2;
//         // handleY = frameBottom + frontOffset;
//     }
 
// //     else if (sideIndex === 1) {
 
// //         const frontOffset = (handleType === "left") ? h1 : h1/4;
 
// //         // if (handleType === "right") {
// //         //     handleX = frameLeft + frontOffset;
// //         // } 
// //         // else {
// //             handleX = frameLeft + (designWidth - frontOffset);
// //         handleY = frameBottom + GHH;
// //         // }
// // }
// //     else if (sideIndex === 2) {
 
// //         const frontOffset = (handleType === "left") ? h1 : h1/6;
 
// //         handleX = frameLeft + designWidth/2;
// //         handleY = frameBottom + (designHeight - frontOffset);
// //     }
 
// //     else if (sideIndex === 3) {
 
// //         const frontOffset = (handleType === "left") ? h1/4 : h1;
 
// //         handleX = frameLeft + frontOffset;
// //         handleY = frameBottom + GHH;
// //     }
 
//     currentHandle = createHandleCAD(handleX, handleY);

//     if (handleType === "right") {
//         currentHandle.scale.x = -1;
//     }
//     currentHandle.position.z = 1;
//     board.add(currentHandle);
// }

// applyHandleFromStorage();

function animate() {
    requestAnimationFrame(animate);
    positionProfileInputs(profileW, profileH, profileX, profileY, camera, renderer);
    positionRightInfoInputs(originX + boardW / 4, -boardH / 2, rightInfoWidth, boardH, camera, renderer);
    renderer.render(scene, camera);
}
animate();
 
window.addEventListener("resize", () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.left   = -viewSize * aspect;
    camera.right  =  viewSize * aspect;
    camera.top    =  viewSize;
    camera.bottom = -viewSize;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});