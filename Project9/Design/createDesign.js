import * as THREE from 'three'
import { frameBottom, frameLeft, frameRight, frameTop } from './frames';
import { createMesh } from '../createMesh';
import { beadBottom, beadLeft, beadRight, beadTop } from './beads';

export function createDesign(originX,originY,width,height,h1,beadH){

    const group= new THREE.Group();
    
    const top=frameTop(originX,originY,width,height,h1);
    const topPoints=top.getPoints();
    const topFrame=createMesh(topPoints)
    topFrame.position.set(-width/2,height/2);
    group.add(topFrame)

    const left=frameLeft(originX,originY,width,height,h1);
    const leftPoints=left.getPoints();
    const leftMesh= createMesh(leftPoints);
    leftMesh.position.set(-width/2, height/2)
    group.add(leftMesh)

    const bottom=frameBottom(originX,originY,width,height,h1);
    const bottomPoints=bottom.getPoints();
    const bottomMesh=createMesh(bottomPoints);
    bottomMesh.position.set(-width/2, -height/2)
    group.add(bottomMesh);

    const right=frameRight(originX,originY,width,height,h1);
    const rightPoints=right.getPoints();
    const rightMesh=createMesh(rightPoints);
    rightMesh.position.set(width/2,height/2);
    group.add(rightMesh);

    //Beads
    const topBead=beadTop(originX,originY,width,height,h1,beadH);
    const beadTopPoints=topBead.getPoints();
    const beadTopMesh=createMesh(beadTopPoints);
    beadTopMesh.position.set(-width/2+h1,height/2-h1)
    group.add(beadTopMesh);

    const leftBead=beadLeft(originX,originY,width,height,h1,beadH);
    const beadLeftPoints=leftBead.getPoints();
    const beadLeftMesh=createMesh(beadLeftPoints);
    beadLeftMesh.position.set(-width/2+h1, height/2-h1)
    group.add(beadLeftMesh);

    const bottomBead=beadBottom(originX,originY,width,height,h1,beadH);
    const beadBottomPoints=bottomBead.getPoints();
    const beadBottomMesh=createMesh(beadBottomPoints);
    beadBottomMesh.position.set(-width/2+h1, -height/2+h1)
    group.add(beadBottomMesh);

    const rightBead=beadRight(originX,originY,width,height,h1,beadH);
    const beadRightPoints=rightBead.getPoints();
    const beadRightMesh=createMesh(beadRightPoints)
    beadRightMesh.position.set(width/2-h1, height/2-h1)
    group.add(beadRightMesh);

    return group;

    
}