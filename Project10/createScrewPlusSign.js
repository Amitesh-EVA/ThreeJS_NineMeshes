import * as THREE from 'three';

export function createScrewPlusSign(originX,originY,height,width){
 
    const material = new THREE.LineBasicMaterial({color:'black'});
    const group = new THREE.Group();
 
    const points1 = [
        new THREE.Vector3(originX+width/12, originY, 0),
        new THREE.Vector3(originX+width/3-width/12, originY, 0)
    ];
 
    const points2 = [
        new THREE.Vector3(originX+width/6, originY-width/20, 0),
        new THREE.Vector3(originX+width/6, originY+width/20, 0)
    ];
 
    const geo1 = new THREE.BufferGeometry().setFromPoints(points1);
    const line1 = new THREE.Line(geo1, material);

    const geo2 = new THREE.BufferGeometry().setFromPoints(points2);
    const line2 = new THREE.Line(geo2, material);
 
    group.add(line1);
    group.add(line2);
 
    return group;
}
 