import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { beadParts, createDesign, frameParts } from './createDesign';
import { highlightFrame } from './highlightFrame';
import { highlightBead } from './highlightBead';
import { createGlass } from './createGlass';
import { resetAllPartsColor } from './resetAllPartsColor';

const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const light = new THREE.DirectionalLight(0xffffff, 1.5);
scene.add(light);
const ambient = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambient);


//Window Origin(not yet completed)
const windowOrigin = new THREE.Vector3(0, 0, 0);
//Handle Origin (Completed and working)
const handleOrigin = new THREE.Vector3(0, 0, 0);

const outerWidth = 40;
const outerHeight = 70;
const outerH1 = 0.6 * outerHeight;
const beadH = outerHeight - outerH1;
const beadW = 15;
const GHA = 10;
const GVA = 10;
const legW = 10;

let design = null;
let glass = null;
let designGroup = null;

function getUIValues() {
    return {
        designWidth: parseFloat(document.getElementById("designWidth").value) || 500,
        designHeight: parseFloat(document.getElementById("designHeight").value) || 500,
        handleWidth: parseFloat(document.getElementById("handleWidth").value) || 40,
        handleHeight: parseFloat(document.getElementById("handleHeight").value) || 150,
        backsetDepth: parseFloat(document.getElementById("backsetDepth").value) || 10,
        handleDepth: parseFloat(document.getElementById("handleDepth").value) || 10,
        GHH: parseFloat(document.getElementById("GHH").value) ?? designHeight / 2,
        handlePosition: document.getElementById("handlePosition").value,
        handleType: document.getElementById("handleType").value,
        view: document.getElementById("viewType").value,
        materialType: document.getElementById("materialType").value,
    };
}

function positionToSideIndex(pos) {
    return { bottom: 0, right: 1, top: 2, left: 3 }[pos] ?? 1;
}
function updateScene() {
    const v = getUIValues();

    const glassHeight = v.designHeight - 2 * outerH1 - GVA;
    const glassWidth = v.designWidth - 2 * outerH1 - GHA;
    const glassThickness = outerWidth - (legW + beadW) - GVA / 2;

    // if (designGroup) {
    //     scene.remove(designGroup);
    //     designGroup = null;
    //     design = null;
    //     glass = null;
    //     frameParts.length = 0;
    //     beadParts.length = 0;
    // }

    if (design) {
        scene.remove(design);
        design = null;
        glass = null;
        frameParts.length = 0;
        beadParts.length = 0;
    }

    design = createDesign(
        windowOrigin.x,
        windowOrigin.y,
        outerH1,
        outerWidth,
        outerHeight,
        v.designWidth,
        v.designHeight,
        beadW,
        beadH,
        v.handleWidth,
        v.handleHeight,
        v.backsetDepth,
        v.handleDepth,
        v.view,
        v.handleType,
        v.GHH,
        positionToSideIndex(v.handlePosition),
        v.materialType,
        handleOrigin.x,
        handleOrigin.y
    );


    design.position.set(windowOrigin.x - v.designWidth / 2, windowOrigin.y - v.designHeight / 2, 0);

    glass = createGlass(glassWidth, glassHeight, glassThickness);
    glass.position.set(windowOrigin.x + v.designWidth / 2, windowOrigin.y + v.designHeight / 2, -1.5 * beadW);

    // designGroup = new THREE.Group();
    // designGroup.add(design);
    // designGroup.add(glass);
    // scene.add(designGroup);

    design.add(glass);
    scene.add(design);

    camera.position.z = Math.max(v.designHeight, v.designWidth);
}

document.getElementById("updateBtn").addEventListener("click", () => {
    updateScene();
    const val = getUIValues();
    val.sideIndex = positionToSideIndex(val.handlePosition);
    localStorage.setItem("UI values", JSON.stringify(val));
});

document.getElementById("viewType").addEventListener("change", () => {
    if (!design) return;

    const view = document.getElementById("viewType").value;
    design.traverse((child) => {
        if (child.userData && child.userData.type === "handle") {
            if (child.userData.view === "front") {
                child.visible = view === "front" || view === "both";
            }
            if (child.userData.view === "back") {
                child.visible = view === "back" || view === "both";
            }
        }
    });
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("dblclick", onMouseClick);

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const objects = [...frameParts, ...beadParts];
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        const clicked = intersects[0].object;
        console.log(clicked);

        if (clicked.userData === "frame") highlightFrame(clicked);
        if (clicked.userData === "bead") highlightBead(clicked);
    } else {
        resetAllPartsColor();
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

updateScene();
animate();