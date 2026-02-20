import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/Addons.js';
import {scene } from'./CameraAndRenderer/camera.js'
import { activeCamera } from './CameraAndRenderer/activeCamera.js';
import {canvas, renderer } from './CameraAndRenderer/renderer.js';
import { ambientLight,directionalLight,pointLight,spotLight} from './Lights/lights.js';
import { geometries } from './Geometry/geometries.js';
import { materials } from './Materials/materials.js';


const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color:'gray',
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -3;
plane.receiveShadow = true;
scene.add(plane);

let geometry=new THREE.BoxGeometry(4,4,4);
let material= new THREE.MeshStandardMaterial({
        color:'green',
        metalness:0.5,
    });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 2;
mesh.castShadow = true;
scene.add(mesh);

// const helper = new THREE.SpotLightHelper(spotLight);
// scene.add(helper);

export const controls = new OrbitControls(activeCamera, canvas);
controls.enableDamping = true;
controls.dampingFactor=0.05;

spotLight.visible=true;
pointLight.visible=true;

let line;
    function updateMesh({ geometry, material, positionY = 2, rotationZ = 0 }) {

        if (line) {
            scene.remove(line);
            line = null;
        }

            mesh.geometry.dispose();
            mesh.material.dispose();

            mesh.geometry = geometries[geometry]();
            mesh.material = materials[material]();

            mesh.position.y = positionY;
            mesh.rotation.set(0, 0, rotationZ);
        }

    const dynamicGeometry = document.getElementById('extraGeometry');
    const dynamicMaterial = document.getElementById('extraMaterial');

    if (dynamicGeometry && dynamicMaterial) {
    const keys = Object.keys(geometries);
    for (let i = 0; i < keys.length; i++) {

        const option = document.createElement('option');
        option.value = keys[i];
        option.innerText = keys[i];
        dynamicGeometry.appendChild(option);
    }

    const materialKeys = Object.keys(materials);
    for (let i = 0; i < materialKeys.length; i++) {

        const option = document.createElement('option');
        option.value = materialKeys[i];
        option.innerText = materialKeys[i];
        dynamicMaterial.appendChild(option);
    }
}

dynamicGeometry.addEventListener('change', () => {

    const selectedGeometry = dynamicGeometry.value;
    console.log(dynamicGeometry);
    // if(geometries[selectedGeometry])

    if (geometries[selectedGeometry]) {
        mesh.geometry.dispose();
        mesh.geometry = geometries[selectedGeometry]();
    }

});
dynamicMaterial.addEventListener('change', () => {

    const selectedMaterial = dynamicMaterial.value;

    if (materials[selectedMaterial]) {
        mesh.material.dispose();
        mesh.material = materials[selectedMaterial]();
    }
});

window.addEventListener('keydown', (event) => {

    switch(event.key){
        case '1':
            updateMesh({
                geometry: 'box',
                material: 'standard',
                positionY: 2,
                spotLight: false,
            });
            dynamicGeometry.value = 'box';
            dynamicMaterial.value = 'standard';
            break;

        case '2':
            updateMesh({
                geometry: 'sphere',
                material: 'phong',
                positionY: 4,
            });
            dynamicGeometry.value= 'sphere';
            dynamicMaterial.value="phong";
            break;

        case '3':
            updateMesh({
                geometry: 'cone',
                material: 'lambert'
            });
            dynamicGeometry.value= 'cone';
            dynamicMaterial.value="lambert";
            break;

        case '4':
            updateMesh({
                geometry: 'edge',
                material: 'lineBasic'
            });
            // const edges = new THREE.EdgesGeometry(mesh.geometry);
            console.log(geometries.edge);
            line = new THREE.LineSegments(geometries.edge,materials.lineBasic);
            line.position.y = 2;
            scene.add(line);

            dynamicGeometry.value= 'edge';
            dynamicMaterial.value="lineBasic";   
            break;

        case '5':
            updateMesh({
                geometry: 'capsule',
                material: 'toon',
                positionY: 5,
                rotationZ: Math.PI,
            });
            plane.position.y = -4;
            dynamicGeometry.value= 'capsule';
            dynamicMaterial.value="toon";
            break;

        case '6':
            updateMesh({
                geometry: 'cylinder',
                material: 'physical',
                positionY: 4
            });
            dynamicGeometry.value= 'cylinder';
            dynamicMaterial.value="physical";
            break;

        case '7':
            updateMesh({
                geometry: 'shape',
                material: 'basic',
                pointLight: false,
                spotLight: false
            });
            dynamicGeometry.value= 'shape';
            dynamicMaterial.value="basic";
            break;

        case '8':
            updateMesh({
                geometry: 'plane',
                material: 'shadow'
            });
            dynamicGeometry.value= 'plane';
            dynamicMaterial.value="shadow";
            break;

        case '9':
            updateMesh({
                geometry: 'torus',
                material: 'normal'
            });
            dynamicGeometry.value= 'torus';
            dynamicMaterial.value="normal";
            break;

        default:
            updateMesh({
                geometry: 'box',
                material: 'standard',
                spotLight: false,
            });
            dynamicGeometry.value= 'box';
            dynamicMaterial.value="standard";
    }
});

function animate(){
    window.requestAnimationFrame(animate);

            mesh.rotation.x += 0.02;
            mesh.rotation.y += 0.02;

        if(line){
            line.rotation.x+=0.02;
            line.rotation.y+=0.02;
        }
    
        controls.update();
        renderer.render(scene,activeCamera);
    }
    animate();

window.addEventListener('resize', () => {
    activeCamera.aspect=window.innerWidth/window.innerHeight;
    activeCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
})