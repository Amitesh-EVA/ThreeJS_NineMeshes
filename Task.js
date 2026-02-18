import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/Addons.js';
import {scene, camera} from'./CameraAndRenderer/camera.js'
import {canvas, renderer } from './CameraAndRenderer/renderer.js';
import { ambientLight,directionalLight,pointLight,spotLight} from './lights.js';


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

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor=0.05;

let line;
window.addEventListener('keydown', (event) => {

    switch(event.key) {

        default:
        mesh.geometry=new THREE.BoxGeometry(4,4,4);
        mesh.material= new THREE.MeshStandardMaterial({
        color:'green',
        metalness:0.5,
        });
        spotLight.visible=false;
        pointLight.visible=false;
        scene.remove(line);

        break;
        
        case '2':
            mesh.geometry= new THREE.SphereGeometry(5,32,32);
            mesh.material= new THREE.MeshPhongMaterial({color:'green'});
            mesh.material.shininess= 200;
            mesh.position.y=4;

            spotLight.visible=true;
            scene.remove(line);

            break;

        case '3':
            mesh.geometry= new THREE.ConeGeometry(3, 8, 32, 32);
            mesh.material= new THREE.MeshStandardMaterial({
                color:'#880808',
                roughness:0.6,
                metalness:0.3
            })

            spotLight.visible=false;
            scene.remove(line);

            break;
            
        case '4':

            mesh.geometry= new THREE.BoxGeometry(6,6,6);
            const edges= new THREE.EdgesGeometry(mesh.geometry);
            line= new THREE.LineSegments(edges);
            mesh.material= new THREE.LineBasicMaterial({color:'#880808'})
            scene.add(line)
            console.log(scene?.children);
            line.position.y=2;
        
            break;  

        case '5':
            mesh.geometry= new THREE.CapsuleGeometry(4,8,32,32);
            mesh.material= new THREE.MeshToonMaterial({color:'#049ef4'});
            mesh.rotation.z=Math.PI/2;
            mesh.position.y=4;
            plane.position.y=-4
            scene.remove(line);
            spotLight.visible=true;

            break; 
        case '6':
            mesh.geometry= new THREE.CylinderGeometry(4,4,6)
          
            mesh.material= new THREE.MeshPhysicalMaterial({
                color:'#049ef4',
                clearcoat:1.0,
                roughness:0.7
            })
            mesh.position.y=3;
            scene.remove(line);
            break;                 
        case '7':
            const arcShape = new THREE.Shape()
            .moveTo( 5, 1 )
            .absarc( 1, 1, 4, 0, Math.PI, false );
            mesh.geometry = new THREE.ShapeGeometry( arcShape );
            mesh.material = new THREE.MeshBasicMaterial( { color: '#880808', side: THREE.DoubleSide } );
            scene.remove(line);
            break; 
        case '8':
            mesh.geometry = new THREE.PlaneGeometry(5,5);
            mesh.geometry.rotateX( Math.PI / 2 );
            mesh.material = new THREE.ShadowMaterial();
            mesh.material.opacity = 0.5;
            mesh.material.transparent=false;
            scene.remove(line);


            break;    
        case '9':
            mesh.geometry= new THREE.TorusGeometry( 4, 1, 50, 100 );
            mesh.material= new THREE.MeshStandardMaterial({color:'#880808'})
            scene.remove(line);
            break;                      
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
    renderer.render(scene,camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
})
