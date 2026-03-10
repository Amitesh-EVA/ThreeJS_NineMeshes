import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export async function addFigureDimension(originX,originY,width,height){
    const loader = new FontLoader();
    const font = await loader.loadAsync( 'fonts/helvetiker_regular.typeface.json' );
    const geometry = new TextGeometry( 'Hello three.js!', {
        font: font,
        size: 80,
        depth: 5,
        curveSegments: 12
    } );

    const material=new THREE.MeshBasicMaterial({color:"black"});
    const mesh=new THREE.Mesh(geometry,material);
    mesh.position(originX,originY,width,height);

    return mesh;


}