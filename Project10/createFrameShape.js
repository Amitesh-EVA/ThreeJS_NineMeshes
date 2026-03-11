import * as THREE from 'three'

export function createFrameShape(originX,originY,outerH1,outerW,outerH){

    const legW=10;
    const shape=new THREE.Shape();
    shape.moveTo(originX,originY);
    shape.lineTo(originX+outerW,originY);
    shape.lineTo(originX+outerW,originY+outerH);
    shape.lineTo(originX+outerW-legW,originY+outerH);
    shape.lineTo(originX+outerW-legW, originY+outerH1);
    shape.lineTo(originX,originY+outerH1);
    shape.lineTo(originX,originY);

    return shape;   
}