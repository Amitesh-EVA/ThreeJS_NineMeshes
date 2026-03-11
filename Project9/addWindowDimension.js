import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const loader = new FontLoader();

export let font;

loader.load('/fonts/helvetiker_regular.typeface.json', (loadedFont)=>{
    font = loadedFont;
});

export function createText(text, font){

    const geometry = new TextGeometry(text,{
        font: font,
        size: 80,
        depth: 5,
        curveSegments: 12
    });

    const material = new THREE.MeshBasicMaterial({
        color: "green"
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}