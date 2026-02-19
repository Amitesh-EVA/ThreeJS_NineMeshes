
import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/Addons.js';
import {scene } from'./CameraAndRenderer/camera.js'
import { activeCamera } from './CameraAndRenderer/activeCamera.js';
import {canvas, renderer } from './CameraAndRenderer/renderer.js';
import { ambientLight,directionalLight,pointLight,spotLight} from './lights.js';
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

const controls = new OrbitControls(activeCamera, canvas);
controls.enableDamping = true;
controls.dampingFactor=0.05;

spotLight.visible=true;
pointLight.visible=true;

let line;
function updateMesh({ geometry, material, positionY = 2, rotationZ = 0}) {
    if(line){
        scene.remove(line);
        line = null;
    }

    mesh.geometry = geometries[geometry]();
    mesh.material = materials[material]();

    mesh.position.y = positionY;
    mesh.rotation.set(0,0,rotationZ);

}


window.addEventListener('keydown', (event) => {

    switch(event.key){

        case '1':
            updateMesh({
                geometry: 'box1',
                material: 'standard',
                positionY: 2,
                spotLight: false,
            });
            break;

        case '2':
            updateMesh({
                geometry: 'sphere',
                material: 'phong',
                positionY: 4,
            });
            break;

        case '3':
            updateMesh({
                geometry: 'cone',
                material: 'lambert'
            });
            break;

        case '4':
            updateMesh({
                geometry: 'Box2',
                material: 'lineBasic'
            });

            const edges = new THREE.EdgesGeometry(mesh.geometry);
            line = new THREE.LineSegments(edges);
            line.position.y = 2;
            scene.add(line);
            break;

        case '5':
            updateMesh({
                geometry: 'capsule',
                material: 'toon',
                positionY: 5,
                rotationZ: Math.PI,
                spotLight: true
            });
            plane.position.y = -4;
            break;

        case '6':
            updateMesh({
                geometry: 'cylinder',
                material: 'physical',
                positionY: 4
            });
            break;

        case '7':
            updateMesh({
                geometry: 'shape',
                material: 'basic',
                pointLight: false,
                spotLight: false
            });
            break;

        case '8':
            updateMesh({
                geometry: 'plane',
                material: 'shadow'
            });
            break;

        case '9':
            updateMesh({
                geometry: 'torus',
                material: 'normal'
            });
            break;

        default:
            updateMesh({
                geometry: 'box',
                material: 'standard',
                spotLight: false,
            });
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