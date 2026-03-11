import * as THREE from 'three'

export function createExtrudeShape(originX,originY,designHeight,designWidth){

    const path = new THREE.CurvePath();
    const p1 = new THREE.Vector3(originX,originY, 0);
    const p2 = new THREE.Vector3(originX + designWidth, originY, 0);
    const p3 = new THREE.Vector3(originX + designWidth, originY + designHeight, 0);
    const p4 = new THREE.Vector3(originX, originY + designHeight, 0);

    path.add(new THREE.LineCurve3(p1, p2));
    path.add(new THREE.LineCurve3(p2, p3));
    path.add(new THREE.LineCurve3(p3, p4));
    path.add(new THREE.LineCurve3(p4, p1));

    return path;

    // const points = path.getPoints();
    // const geometry = new THREE.BufferGeometry().setFromPoints( points );
    // const material = new THREE.LineBasicMaterial( { color:"#049ef4" } );
    // const mesh = new THREE.Line( geometry, material );
    // return mesh;
}