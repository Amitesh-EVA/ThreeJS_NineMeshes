import * as THREE from 'three'

export function createBeadShape(originX,originY,beadW,beadH){

    const thickness=3;
    const arc=thickness;

    const shape=new THREE.Shape();
    shape.moveTo(originX,originY);
    shape.lineTo(originX,originY+beadH-thickness);
    shape.absarc(originX+arc,originY+beadH-thickness,arc,-Math.PI,Math.PI/2,true);
    shape.lineTo(originX+arc,originY+beadH);
    shape.lineTo(originX+beadW,originY+beadH);
    shape.lineTo(originX+beadW,originY+beadH-thickness);
    shape.lineTo(originX+arc,originY+beadH-thickness);
    shape.absarc(originX+arc+arc,originY+beadH-thickness-thickness,arc,Math.PI/2,Math.PI,false);
    shape.lineTo(originX+thickness,originY+beadH-thickness);
    shape.lineTo(originX+thickness,originY);
    shape.lineTo(originX,originY);
    return shape;
    

    // const extrudeSettings={
    //     depth:10,
    //     bevelEnabled:false,
    // }

    // const geometry= new THREE.ExtrudeGeometry(shape,extrudeSettings);
    // const material= new THREE.MeshBasicMaterial({color:"gray"});
    // const mesh= new THREE.Mesh(geometry,material);

    // return mesh;
    
}