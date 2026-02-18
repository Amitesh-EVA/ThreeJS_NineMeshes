import * as THREE from'three'
import { scene } from './CameraAndRenderer/camera';

export const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

export const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10,20,10);
directionalLight.castShadow = true;

scene.add(directionalLight);

export const spotLight = new THREE.SpotLight(0xffffff,5 );
spotLight.position.set(0,8,0);
spotLight.angle = Math.PI / 6;
spotLight.distance= 50;
spotLight.castShadow = true;
scene.add(spotLight);

export const pointLight= new THREE.PointLight(0xffffff, 2)
pointLight.position.set(2,6,3)
scene.add(pointLight);

export const hemiLight= new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.5)
console.log(hemiLight)
scene.add(hemiLight)