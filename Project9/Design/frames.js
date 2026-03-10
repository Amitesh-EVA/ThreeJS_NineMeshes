import * as THREE from 'three';

export function frameTop(originX,originY,width,height,h1){
    const path=new THREE.Path();
    path.moveTo(originX, originY);
    path.lineTo(originX+width,originY)
    path.lineTo(originX+width-h1,originY-h1);
    path.lineTo(originX+h1,originY-h1);
    path.lineTo(originX,originY)
    return path;
}

export function frameLeft(originX,originY,width,height,h1){
    const path= new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX,originY-height);
    path.lineTo(originX+h1,originY-height+h1);
    path.lineTo(originX+h1,originY-h1);
    path.lineTo(originX,originY);

    return path;
}

export function frameBottom(originX,originY,width,height,h1){
    const path=new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX+width,originY);
    path.lineTo(originX+width-h1,originY+h1);
    path.lineTo(originX+h1,originY+h1);
    path.lineTo(originX,originY)

    return path;
}

export function frameRight(originX,originY,width,height,h1){
    const path=new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX,originY-height);
    path.lineTo(originX-h1,originY-height+h1);
    path.lineTo(originX-h1,originY-h1);
    path.lineTo(originX,originY)

    return path;
}


