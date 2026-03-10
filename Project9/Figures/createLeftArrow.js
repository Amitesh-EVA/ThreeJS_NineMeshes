import * as THREE from 'three'

export function createLeftArrow(originX,originY,len){
    const path=new THREE.Path();
    path.moveTo(originX, originY);
    path.lineTo(originX+len/2,originY);
    path.lineTo(originX+len/2,originY+len/2);
    path.lineTo(originX,originY+len/2);
    path.lineTo(originX,originY+3*len/4);
    path.lineTo(originX-len/2,originY+len/4);
    path.lineTo(originX,originY-len/4)
    path.lineTo(originX,originY);

    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({color:"black"});
    const line= new THREE.Line(geometry,material);

    return line;    
}
