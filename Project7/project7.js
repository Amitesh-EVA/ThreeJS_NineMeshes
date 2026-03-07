import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000000
);
camera.position.z=15

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight= new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);
const dirLight= new THREE.DirectionalLight(0xffffff,2);
scene.add(dirLight);

const axesHelper= new THREE.AxesHelper(20);
scene.add(axesHelper)

let width = 2;
let height = 2;
let segments = 100;
let originX = 0;
let originY = 0;


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}


class Line {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  getSlope() {
    const run = this.endPoint.x - this.startPoint.x;
    const rise = this.endPoint.y - this.startPoint.y;
    this.slope = run === 0 ? Infinity : rise / run;
    return this.slope;
  }

  getIntercept() {
    this.c = this.startPoint.y - this.slope * this.startPoint.x;
    return this.c;
  }
}

function createShape() {
  const shape = new THREE.Shape();
  shape.moveTo(originX, originY);
  for (let i = 1; i <= segments; i++) {
    shape.lineTo((i / segments) * width, originY);
  }
  for (let i = 1; i <= segments; i++) {
    shape.lineTo(width, (i / segments) * height);
  }
  for (let i = segments - 1; i >= 0; i--) {
    shape.lineTo((i / segments) * width, height);
  }
  for (let i = segments - 1; i >= 0; i--) {
    shape.lineTo(originX, (i / segments) * height);
  }
  return shape;
}


function cutShape(geometry, extrudeData) {

    const arr=geometry.attributes.position.array;
    console.log(arr);

    for(let i=0;i<arr.length;i+=3){
        let x= arr[i];
        let y= arr[i+1];

        if(x===0){
            extrudeData.edge1.forEach(line => {
                const m= line.getSlope();
                const c=line.getIntercept();
                const lowerLimit = Math.min(line.startPoint.y, line.endPoint.y);
                const upperLimit = Math.max(line.startPoint.y, line.endPoint.y);
                if (y >= lowerLimit && y <= upperLimit) {
                    arr[i] = (y - c) / m;
                }
            });
        }
            if(x===width){
            extrudeData.edge2.forEach(line => {
                const m= line.getSlope();
                const c=line.getIntercept();
                const lowerLimit = Math.min(line.startPoint.y, line.endPoint.y);
                const upperLimit = Math.max(line.startPoint.y, line.endPoint.y);
                if (y >= lowerLimit && y <= upperLimit) {
                    arr[i] = (y - c) / m;
                }
            });
        }
}

  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();
}

const lines1 = [
  new Line(new Point(-2, 1), new Point(-1, 2)),
  new Line(new Point(-1, 0), new Point(-2, 1)),
];

const lines2 = [
  new Line(new Point(3, 0), new Point(4, 1)),
  new Line(new Point(4, 1), new Point(3, 2)),
];

const extrudeSettings = {
  bevelEnabled: false,
  depth: 5,
};

const shape = createShape();
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

const material = new THREE.MeshStandardMaterial({
  color: "#049ef4",
  metalness:0.4,
  roughness:0.6
//   wireframe: true,
});
const extrudeData = {
  edge1: lines1,
  edge2: lines2,
};
cutShape(geometry, extrudeData);
const mesh = new THREE.Mesh(geometry, material);

const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: "black" });
const line= new THREE.LineSegments(edges, lineMaterial);
mesh.add(line);
scene.add(mesh);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

