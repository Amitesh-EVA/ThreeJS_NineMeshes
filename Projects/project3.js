import * as THREE from 'three';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
)
camera.position.set(0, 0, 15)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(5, 10, 10)
scene.add(directionalLight);

// const axesHelper= new THREE.AxesHelper(600);
// scene.add(axesHelper);

// let width=1000;
// let height=400;
// let depth=200;
// let angle= Math.PI/4;

// const boxGeometry = new THREE.BoxGeometry(width,height,depth)
// const boxMaterial = new THREE.MeshStandardMaterial({ color: 'green' })
// const box = new THREE.Mesh(boxGeometry, boxMaterial)

// const sideWidth=height*Math.sqrt(2);
// const sideHeight=(height*Math.sqrt(2));

// const sideGeometry = new THREE.BoxGeometry(sideWidth, sideHeight, depth)
// const sideBox = new THREE.Mesh(sideGeometry)

// sideBox.rotation.z = angle;
// sideBox.position.x= - width/2;
// sideBox.position.y= height/2;

// // scene.add(sideBox)

// box.updateMatrix();
// sideBox.updateMatrix();

// let finalShape = CSG.subtract(box, sideBox)

// finalShape.material = new THREE.MeshStandardMaterial({
//   color: 'green',
//   metalness: 0.2,
//   roughness: 0.6
// })
// const sideGeometry2= new THREE.BoxGeometry(sideWidth, sideHeight, depth)
// const sideBox2 = new THREE.Mesh(sideGeometry2)
// sideBox2.rotation.z = - angle;
// sideBox2.position.x=  width/2;
// sideBox2.position.y= height/2;
// // scene.add(sideBox2)

// sideBox2.updateMatrix();
// finalShape.updateMatrix();

// finalShape=CSG.subtract(finalShape,sideBox2);


// finalShape.material = new THREE.MeshStandardMaterial({
//   color: 'green',
//   metalness: 0.2,
//   roughness: 0.6
// })

// scene.add(finalShape)

// function animate() {
//   requestAnimationFrame(animate)
//   controls.update()
//   renderer.render(scene, camera)
// }
// animate()

// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()
//   renderer.setSize(window.innerWidth, window.innerHeight)
// })

let h=8;
let w=4;
let d=3;


const shape= new THREE.Shape();

shape.moveTo(0,0);
shape.lineTo(w,0);
shape.lineTo(w,h);
shape.lineTo(0,h);
shape.lineTo(0,0);


let extrudeSettings= {
  depth:d,
  bevelEnabled:false,
}
const geometry= new THREE.ExtrudeGeometry(shape,extrudeSettings);
geometry.center();
const material= new THREE.MeshStandardMaterial({color:'gray'});

const mesh= new THREE.Mesh(geometry,material);
mesh.rotation.z= -Math.PI/2;
scene.add(mesh);


// function animate() {
//   requestAnimationFrame(animate)
//   controls.update()
//   renderer.render(scene, camera)
// }
// animate()

// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()
//   renderer.setSize(window.innerWidth, window.innerHeight)
// })
