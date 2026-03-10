import * as THREE from 'three';

export function beadTop(originX,originY,width,height,h1,beadH){
    const path=new THREE.Path();
    path.moveTo(originX, originY);
    path.lineTo(originX+width-h1-h1,originY)
    path.lineTo(originX+width-h1-h1-beadH,originY-beadH);
    path.lineTo(originX+beadH,originY-beadH);
    path.lineTo(originX,originY)
    return path;
}

export function beadLeft(originX,originY,width,height,h1,beadH){
    const path= new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX,originY-height+h1+h1);
    path.lineTo(originX+beadH,originY-height+h1+h1+beadH);
    path.lineTo(originX+beadH,originY-beadH);
    path.lineTo(originX,originY);
    return path;
}

export function beadBottom(originX,originY,width,height,h1,beadH){
    const path=new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX+width-h1-h1,originY);
    path.lineTo(originX+width-h1-h1-beadH,originY+beadH);
    path.lineTo(originX+beadH,originY+beadH);
    path.lineTo(originX,originY)
    return path;
}

export function beadRight(originX,originY,width,height,h1,beadH){
    const path=new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX,originY-height+h1+h1);
    path.lineTo(originX-beadH,originY-height+h1+h1+beadH);
    path.lineTo(originX-beadH,originY-beadH);
    path.lineTo(originX,originY)
    return path;
}