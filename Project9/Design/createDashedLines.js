import * as THREE from 'three';

export function createDashedLines(originX, originY, width, height){
    const points = [
        new THREE.Vector3(originX, originY-height/2, 0),
        new THREE.Vector3(originX, originY + height/2, 0),


        new THREE.Vector3(originX - width/2, originY, 0),
        new THREE.Vector3(originX + width/2, originY, 0)
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineDashedMaterial({
        color: "black",
        dashSize: 3,
        gapSize:1
    });

    const lines = new THREE.LineSegments(geometry, material);
    lines.computeLineDistances();
    return lines;
}