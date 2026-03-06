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


class Point{
    x;
    y;
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
class Line {
    startPoint;
    endPoint;
    constructor(startPoint, endPoint) {
        this.start = startPoint;
        this.end = endPoint;
    }
}
class ExtrudeData {
    constructor(edge1) {
        this.edge1 = edge1;
    }

    addLine(line) {
        this.edge1.push(line);
    }
}
const p1 = new Point(0, 0);
const p2 = new Point(5, 0);
const p3 = new Point(5, 5);

const line1 = new Line(p1, p2);
const line2 = new Line(p2, p3);

const extrude = new ExtrudeData([line1]);

extrude.addLine(line2);

console.log(extrude);




const w=80;
const h=40;

const shape= new THREE.Shape();
shape.moveTo(0,0);
shape.lineTo(w,0);
shape.lineTo(w,h);
shape.lineTo(0,h);
shape.lineTo(0,0);

const extrudeSettings={
    depth:20,
    bevelEnabled:false,
}

const geometry= new THREE.ExtrudeGeometry(shape,extrudeSettings);
const material= new THREE.MeshStandardMaterial({
    color:'#049ef4',
    metalness:0.4
})
const mesh= new THREE.Mesh(geometry,material);
scene.add(mesh);

console.log(extrudeData.edge1)

for (let i = 0; i < extrudeData.edge1.length; i++) {

    
}















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
