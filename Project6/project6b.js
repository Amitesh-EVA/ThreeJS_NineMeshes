import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const scene= new THREE.Scene();
const camera= new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.01,
    10000000
);
camera.position.z=200;

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls= new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.dampingFactor=0.05;

const ambientLight= new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);

// const dirLight= new THREE.DirectionalLight(0xffffff,2);
// scene.add(dirLight);

// const axesHelper= new THREE.AxesHelper(100);
// scene.add(axesHelper);

const wt=50;
const wb=50;
const h1=40;
const h2=20;
const h=h1+h1+h2;
const d=8;
const curvePath = new THREE.CurvePath();

curvePath.add(
    new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, h, 0),
        new THREE.Vector3(wt, h, 0),
        new THREE.Vector3(wt, h-h1, 0),
        new THREE.Vector3(wt/2, h1+h2, 0)
    )
);

curvePath.add(
    new THREE.CubicBezierCurve3(
        new THREE.Vector3(wt/2,h1+h2, 0),
        new THREE.Vector3(0,h1+h2,0),
        new THREE.Vector3(0,h1,0),
        new THREE.Vector3(wb/2, h1, 0)
    )
);

curvePath.add(
    new THREE.CubicBezierCurve3(
        new THREE.Vector3(wb/2, h1, 0),
        new THREE.Vector3(wb, h1, 0),
        new THREE.Vector3(wb, 0, 0),
        new THREE.Vector3(wt-wb, 0, 0)
    )
);

// const points= curvePath.getPoints(100);
// const geometry= new THREE.BufferGeometry().setFromPoints(points);
// const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// const curveLine= new THREE.Line( geometry, material );
// scene.add(curveLine)


const geometry = new THREE.TubeGeometry(curvePath, 300, d/2,800, false);
const material = new THREE.MeshStandardMaterial({
  color: '#177dca',
  roughness: 0.2,
  metalness: 0.5,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
 
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments( edges );
mesh.add(line);

function animate()
{
    window.requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', ()=> {
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})

