import * as THREE from 'three'

export function createUpArrow(originX,originY,len){
    const path=new THREE.Path();
    path.moveTo(originX, originY);
    path.lineTo(originX, originY + len);
    path.moveTo(originX, originY + len);
    path.lineTo(originX - len/4, originY + len*3/4);
    path.moveTo(originX, originY + len);
    path.lineTo(originX + len/4, originY + len*3/4);

    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({color:"black"});
    const line= new THREE.Line(geometry,material);

    return line;
}
