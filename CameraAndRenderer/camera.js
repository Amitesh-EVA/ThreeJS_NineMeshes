import * as THREE from 'three';

export const scene = new THREE.Scene();

export const perspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1500
);

perspectiveCamera.position.set(2, 4, 34);



const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 6;

export const orthographicCamera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2,
     frustumSize * aspect / 2,
     frustumSize / 2,
    -frustumSize / 2,
     0.1,
     1500
);

orthographicCamera.position.set(4,4,6);
