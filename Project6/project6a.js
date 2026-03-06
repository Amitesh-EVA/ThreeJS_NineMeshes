import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const scene= new THREE.Scene();
const camera= new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.01,
    10000000
);
camera.position.z=170;

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

const wt=60; n  
const wb=40;
const h=100;
const d=10;

if(h < 2*d){
    alert("Height cannot be less than 2 * diameter");
}
if(d < 5){
    alert("Diameter cannot be less than 5");
}
 if(wb <= 0 ||wt <= 0 ){
    alert("Inavlid Width Input");
 }

const curvePath = new THREE.CurvePath();

curvePath.add(
    new THREE.LineCurve3(
        new THREE.Vector3(0,h,0),
        new THREE.Vector3(wt-d,h,0)
    )
);

curvePath.add(
    new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(wt-d,h,0),
        new THREE.Vector3(wt,h,0),
        new THREE.Vector3(wt,h-d,0)
    )
);

curvePath.add(
    new THREE.LineCurve3(
        new THREE.Vector3(wt,h-d,0),
        new THREE.Vector3(wt,d,0)
    )
);

curvePath.add(
    new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(wt,d,0),
        new THREE.Vector3(wt,0,0),
        new THREE.Vector3(wt-d,0,0)
    )
);

curvePath.add(
    new THREE.LineCurve3(
        new THREE.Vector3(wt-d,0,0),
        new THREE.Vector3(wt-wb,0,0)
    )
);

const geometry = new THREE.TubeGeometry(curvePath, 300, d/2,800, false);
const material = new THREE.MeshStandardMaterial({
  color: '#69757e',
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
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', ()=> {
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})

