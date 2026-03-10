import * as THREE from'three';

export function createMesh(points){
    
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color: 'black'} );

    const mesh= new THREE.Line( geometry,material );
    return mesh;


}
