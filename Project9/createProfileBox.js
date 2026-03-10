import * as THREE from 'three'

export function createProfileBox(originX, originY, w, h) {
    const r = h/10;
    const group = new THREE.Group();
    const path = new THREE.Path();

    path.moveTo(originX + r, originY);
    path.lineTo(originX + w - r, originY);
    path.absarc(originX + w - r, originY + r, r, -Math.PI/2, 0, false);

    path.lineTo(originX + w, originY + h - r);
    path.absarc(originX + w - r, originY + h - r, r, 0, Math.PI/2, false);

    path.lineTo(originX + r, originY + h);
    path.absarc(originX + r, originY + h - r, r, Math.PI/2, Math.PI, false);

    path.lineTo(originX, originY + r);
    path.absarc(originX + r, originY + r, r, Math.PI, 3*Math.PI/2, false);

    const points = path.getPoints(80);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const outline = new THREE.Line(geometry, material);
    group.add(outline);

    const horizontalLines = [];
    for(let i = 1; i <=3; i++){
        const y = originY + h/4* i;
        horizontalLines.push(
            new THREE.Vector3(originX, y, 0),
            new THREE.Vector3(originX + w, y, 0)
        );    
    }

    const hGeometry = new THREE.BufferGeometry().setFromPoints(horizontalLines);
    const hMesh = new THREE.LineSegments(hGeometry, material);
    group.add(hMesh);

const verticalLines = [
    new THREE.Vector3(originX + w/4, originY + h/2, 0),
    new THREE.Vector3(originX + w/4, originY + 3*h/4, 0),

    new THREE.Vector3(originX + 3*w/4, originY + h/2, 0),
    new THREE.Vector3(originX + 3*w/4, originY + 3*h/4, 0),

    new THREE.Vector3(originX + w/2, originY, 0),
    new THREE.Vector3(originX + w/2, originY + h/4, 0)
];

    const vGeometry = new THREE.BufferGeometry().setFromPoints(verticalLines);
    const vMesh = new THREE.LineSegments(vGeometry, material);
    group.add(vMesh);
    return group;
}