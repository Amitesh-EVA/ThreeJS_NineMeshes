import * as THREE from 'three'

export const canvas = document.getElementById('threeCanvas');
export const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// document.body.appendChild(renderer.domElement);
