import * as THREE from 'three'
import { createFigure } from './Figures/createFigure';
import { createDashedLines } from './Design/createDashedLines';
import { createProfileBox } from './createProfileBox';
import { createRightInfoPart } from './createRightInfoPart';
import { positionProfileInputs, positionRightInfoInputs } from './createInputs';
import { createDesign } from './Design/createDesign';
import { createText, font } from './addWindowDimension';
import { createHandleCAD } from './createCadHandle';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const getUIValues = localStorage.getItem("UI values");
const params = getUIValues ? JSON.parse(getUIValues) : {};

const designWidth  = params.designWidth  || 500;
const designHeight = params.designHeight || 500;

const handleHeight = params.handleHeight || 150;
const handleWidth  = params.handleWidth  || 40;
const sideIndex    = params.sideIndex ?? 0;
const handleType   = params.handleType || "left";
let   GHH          = params.GHH ?? designHeight / 2;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const width  = designWidth;
const height = designHeight;

const outerH  = 0.10 * Math.max(width, height);
const h1      = 0.6 * outerH;
const beadH   = outerH - h1;

const originX = 0;
const originY = 0;

const boardW = width * 4;
const boardH = height * 2;

const boardGeometry = new THREE.PlaneGeometry(boardW, boardH);
const boardMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
const board = new THREE.Mesh(boardGeometry, boardMaterial);
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
camera.position.z = 50;

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const controls= new OrbitControls(camera,renderer.domElement);
// controls.enableZoom=true;

const design = createDesign(originX, originY, width, height, h1, beadH);
board.add(design);

// center lines
const centerDashedLines = createDashedLines(0, 0, width, height);
board.add(centerDashedLines);

const widthText = createText(`${width} mm`, font);
widthText.position.set(originX, originY + height / 2, 0);
board.add(widthText);

const profileW = boardW / 6;
const profileH = boardW / 6;

let profileMargin = 50;
if (profileMargin >= profileW || profileMargin >= profileH) profileMargin = 0;

const profileDetails = createProfileBox(originX, originY, profileW, profileH);
const profileX = -boardW / 2 + profileMargin;
const profileY =  boardH / 2 - profileH - profileMargin;

profileDetails.position.set(profileX, profileY, 0);
board.add(profileDetails);

const figure = createFigure(originX, originY, boardW, boardH);
figure.position.set(-boardW / 2, -boardH / 2);
board.add(figure);

const rightInfoWidth = (boardW / 2 - width / 2) / 1.5;

const rightInfoPart = createRightInfoPart(originX, originY, rightInfoWidth, boardH);
rightInfoPart.position.set(originX + boardW / 4, -boardH / 2);
board.add(rightInfoPart);

let currentHandle = null;

function applyHandle() {

    if (currentHandle) {
        board.remove(currentHandle);
        currentHandle = null;
    }

    if (GHH > designHeight - handleHeight / 3) {
        GHH = designHeight / 2;
    } else if (GHH < 0) {
        GHH = 0;
    }

    let handleX, handleY;
    let rotation = 0;

    const frameLeft   = originX - designWidth / 2;
    const frameBottom = originY - designHeight / 2;

    // bottom
    if (sideIndex === 0) {
        const offset = (handleType === "left") ? h1 / 3 : h1 / 2;

        handleX = frameLeft + designWidth / 2;
        handleY = frameBottom + offset;

        rotation = -Math.PI / 2;
    }

    // right
    else if (sideIndex === 1) {
        const offset = (handleType === "left") ? h1 / 2.5 : h1 / 2;

        handleX = frameLeft + (designWidth - offset);
        handleY = frameBottom + GHH;
    }

    // top
    else if (sideIndex === 2) {
        const offset = (handleType === "left") ? h1 / 2.5 : h1 / 1.5;

        handleX = frameLeft + designWidth / 2;
        handleY = frameBottom + (designHeight - offset);

        rotation = Math.PI / 2;
    }

    // left
    else if (sideIndex === 3) {
        const offset = (handleType === "left") ? h1 / 2 : h1 / 2.3;

        handleX = frameLeft + offset;
        handleY = frameBottom + GHH;
    }


    const handleMesh = createHandleCAD(0, 0, handleWidth, handleHeight);

    const handleGroup = new THREE.Group();
    handleGroup.add(handleMesh);

    handleGroup.position.set(handleX, handleY, 1);
    handleGroup.rotation.z = rotation;

    if (handleType === "right") {
        handleGroup.scale.x = -1;
    }

    board.add(handleGroup);
    currentHandle = handleGroup;
}

applyHandle();

function animate() {
    requestAnimationFrame(animate);

    positionProfileInputs(profileW, profileH, profileX, profileY, camera, renderer);
    positionRightInfoInputs(originX + boardW / 4, -boardH / 2, rightInfoWidth, boardH, camera, renderer);
    // controls.update();

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