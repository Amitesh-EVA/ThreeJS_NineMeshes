import * as THREE from 'three'
import { createHexagon } from './createHexagon.js';
import { createUpArrow } from './createUpArrow.js';
import { createLeftArrow } from './createLeftArrow.js';
import { createRightArrow } from './createRightArrow.js';


export function createFigure(originX,originY,w,h){

    const group= new THREE.Group();
    const path= new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX+2*w/3,originY);
    path.lineTo(originX+2*w/3, originY+h/6);
    path.lineTo(originX,originY+h/6);
    path.lineTo(originX,originY);

    const points=path.getPoints();
    const geometry=new THREE.BufferGeometry().setFromPoints(points);
    const material= new THREE.LineBasicMaterial({color:'black'});
    const mesh= new THREE.Line(geometry,material);
    group.add(mesh);

    const verticalLines= [];
    const x= 2*w/3;
    for(let i=0;i<5;i++){
        verticalLines.push( 
            new THREE.Vector3(originX+i*x/5,originY,0),
            new THREE.Vector3(originX+i*x/5,originY+h/6,0)
        )
    }
    const divideGeometry= new THREE.BufferGeometry().setFromPoints(verticalLines);
    const divideMaterial=new THREE.LineBasicMaterial({color:'black'});
    const dividers = new THREE.LineSegments(divideGeometry,divideMaterial);
    group.add(dividers);

    group.add(createHexagon(originX+x/10,originY+h/12,h/20));

    const upArrow= createUpArrow(originX,originY,h/12);
    upArrow.position.set(originX+2*x/5+x/10,originY+h/24,0);
    group.add(upArrow);

    const leftArrow= createLeftArrow(originX,originY,h/12);
    leftArrow.position.set(originX+3*x/5+x/10,originY+h/16,0);
    group.add(leftArrow);
   
    const rightArrow= createRightArrow(originX,originY,h/12);
    rightArrow.position.set(originX+4*x/5+x/16,originY+h/16,0);
    group.add(rightArrow)
    return group;
}