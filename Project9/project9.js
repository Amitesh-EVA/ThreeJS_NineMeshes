import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';


const scene= new THREE.Scene();
scene.background= new THREE.Color('grey')

// const camera= new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth/window.innerHeight,
//     0.01,
//     10000
// );
// camera.position.z= 200;

const aspect = window.innerWidth / window.innerHeight;
const viewSize = 200; 

const camera = new THREE.OrthographicCamera(
    -viewSize * aspect, 
     viewSize * aspect, 
     viewSize,          
    -viewSize,          
     0.01,              
     10000000         
);

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 

const controls= new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

const boardH=window.innerHeight;
const boardW=window.innerWidth;
console.log(boardH,boardW);//945 1920

const boardGeometry = new THREE.PlaneGeometry(boardW,boardH);
const boardMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
const board = new THREE.Mesh(boardGeometry,boardMaterial);
scene.add(board);

// const axesHelper= new THREE.AxesHelper(50);
// board.add(axesHelper)

const height=300;
const width=300;
const h1=10;
const originX=0;
const originY=0;
const beadH=5;


export function frameTop(originX,originY){
    const path=new THREE.Path();
    path.moveTo(originX, originY);
    path.lineTo(originX+width,originY)
    path.lineTo(originX+width-h1,originY-h1);
    path.lineTo(originX+h1,originY-h1);
    path.lineTo(originX,originY)
    return path;
}

const top=frameTop(originX,originY);
const topPoints=top.getPoints();
const topGeometry = new THREE.BufferGeometry().setFromPoints( topPoints );
const topMaterial = new THREE.LineBasicMaterial( { color: 'black'} );
const topMesh = new THREE.Line( topGeometry,topMaterial );
topMesh.position.set(-width/2,height/2);
board.add( topMesh );

export function frameLeft(originX,originY){
    const path= new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX,originY-height);
    path.lineTo(originX+h1,originY-height+h1);
    path.lineTo(originX+h1,originY-h1);
    path.lineTo(originX,originY);

    return path;
}

const left=frameLeft(originX,originY);
const leftPoints=left.getPoints();
const leftGeometry=new THREE.BufferGeometry().setFromPoints(leftPoints);
const leftMaterial=new THREE.LineBasicMaterial({color:'black'});
const leftMesh= new THREE.Line(leftGeometry,leftMaterial);
leftMesh.position.set(-width/2, height/2)
board.add(leftMesh);

export function frameBottom(originX,originY){
    const path=new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX+width,originY);
    path.lineTo(originX+width-h1,originY+h1);
    path.lineTo(originX+h1,originY+h1);
    path.lineTo(originX,originY)

    return path;
}

const bottom=frameBottom(originX,originY);
const bottomPoints=bottom.getPoints();
const bottomGeometry=new THREE.BufferGeometry().setFromPoints(bottomPoints);
const bottomMaterial=new THREE.LineBasicMaterial({color:'black'});
const bottomMesh= new THREE.Line(bottomGeometry,bottomMaterial);
bottomMesh.position.set(-width/2, -height/2)
board.add(bottomMesh);

export function frameRight(originX,originY){
    const path=new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX,originY-height);
    path.lineTo(originX-h1,originY-height+h1);
    path.lineTo(originX-h1,originY-h1);
    path.lineTo(originX,originY)

    return path;
}

const right=frameRight(originX,originY);
const rightPoints=right.getPoints();
const rightGeometry= new THREE.BufferGeometry().setFromPoints(rightPoints);
const rightMaterial= new THREE.LineBasicMaterial({color:'black'});
const rightMesh=new THREE.Line(rightGeometry,rightMaterial);
rightMesh.position.set(width/2,height/2);
board.add(rightMesh);

export function beadTop(originX,originY){
    const path=new THREE.Path();
    path.moveTo(originX, originY);
    path.lineTo(originX+width-h1-h1,originY)
    path.lineTo(originX+width-h1-h1-beadH,originY-beadH);
    path.lineTo(originX+beadH,originY-beadH);
    path.lineTo(originX,originY)
    return path;
}

const topBead=beadTop(originX,originY);
const beadTopPoints=topBead.getPoints();
const beadTopGeometry=new THREE.BufferGeometry().setFromPoints(beadTopPoints);
const beadTopMaterial=new THREE.LineBasicMaterial({color:'black'});
const beadTopMesh=new THREE.Line(beadTopGeometry,beadTopMaterial);
beadTopMesh.position.set(-width/2+h1,height/2-h1)
board.add(beadTopMesh);


export function beadLeft(originX,originY){
    const path= new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX,originY-height+h1+h1);
    path.lineTo(originX+beadH,originY-height+h1+h1+beadH);
    path.lineTo(originX+beadH,originY-beadH);
    path.lineTo(originX,originY);

    return path;
}
const leftBead=beadLeft(originX,originY);
const beadLeftPoints=leftBead.getPoints();
const beadLeftGeometry=new THREE.BufferGeometry().setFromPoints(beadLeftPoints);
const beadLeftMaterial=new THREE.LineBasicMaterial({color:'black'});
const beadLeftMesh=new THREE.Line(beadLeftGeometry,beadLeftMaterial);
beadLeftMesh.position.set(-width/2+h1, height/2-h1)
board.add(beadLeftMesh);

export function beadBottom(originX,originY){
    const path=new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX+width-h1-h1,originY);
    path.lineTo(originX+width-h1-h1-beadH,originY+beadH);
    path.lineTo(originX+beadH,originY+beadH);
    path.lineTo(originX,originY)

    return path;
}
const bottomBead=beadBottom(originX,originY);
const beadBottomPoints=bottomBead.getPoints();
const beadBottomGeometry=new THREE.BufferGeometry().setFromPoints(beadBottomPoints);
const beadBottomMaterial=new THREE.LineBasicMaterial({color:'black'});
const beadBottomMesh=new THREE.Line(beadBottomGeometry,beadBottomMaterial);
beadBottomMesh.position.set(-width/2+h1, -height/2+h1)
board.add(beadBottomMesh);

export function beadRight(originX,originY){
    const path=new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX,originY-height+h1+h1);
    path.lineTo(originX-beadH,originY-height+h1+h1+beadH);
    path.lineTo(originX-beadH,originY-beadH);
    path.lineTo(originX,originY)

    return path;
}
const rightBead=beadRight(originX,originY);
const beadRightPoints=rightBead.getPoints();
const beadRightGeometry=new THREE.BufferGeometry().setFromPoints(beadRightPoints);
const beadRightMaterial=new THREE.LineBasicMaterial({color:'black'});
const beadRightMesh=new THREE.Line(beadRightGeometry,beadRightMaterial);
beadRightMesh.position.set(width/2-h1, height/2-h1)
board.add(beadRightMesh); 


//Left Top Box
export function profileBox(originX,originY){
    const arc=3;
    const bh=100;
    const bw=100;
    const path=new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX+bw,originY);
    path.lineTo(originX+bw,originY+bh);
    path.lineTo(originX,originY+bh);
    path.lineTo(originX,originY);

    const points= path.getPoints();
    const geometry=new THREE.BufferGeometry().setFromPoints(points);
    const material= new THREE.LineBasicMaterial({color:"black"});
    const boxLines= new THREE.Line(geometry,material);
    board.add(boxLines);

    return boxLines;

}

const profileDetails=profileBox(originX,originY);
profileDetails.position.set(-800,200) // 945 1920









function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', ()=> {
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})
