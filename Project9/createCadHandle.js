import * as THREE from "three";
import { createMesh } from "./createMesh";
 
export function createHandleCAD(originX,originY) {
  const group = new THREE.Group();
  const path = new THREE.Path();
  const height = 250;
  const width = 80;
  const arc=height/12;
 
  path.moveTo(originX,originY);
  path.lineTo(originX,originY-height/3-2*arc);
  path.absarc(originX+width/6,originY-height/3-2*arc,width/6,-Math.PI,0,false);
  path.lineTo(originX+width/3,originY-height/3-arc-arc);
  path.lineTo(originX+width/3,originY);
  path.bezierCurveTo(originX+width/3,originY+height/3-height/6,originX,originY+height/3-height/6,originX-width/3,originY+height/12);
  path.bezierCurveTo(originX-2*width/3, originY+height/12, originX-2*width/3, originY+height/48,originX,originY);
 
  const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(100));
 
  const material = new THREE.LineBasicMaterial({
    color: "black",
    side: THREE.DoubleSide
  });
  const headMesh = new THREE.Line(geometry, material);

  const knobShape=new THREE.Shape();
  knobShape.absarc(originX,originY+height/16,width/8,0,Math.PI*2,false);
  const knobCircle= createMesh(knobShape.getPoints(100));
  headMesh.add(knobCircle)
  group.add(headMesh);
 
  const path2= new THREE.Path();
  path2.moveTo(originX-width/3,originY+height/12);
  path2.lineTo(originX-width/3,originY+height/12+height/6);
  path2.lineTo(originX,originY+height/12+height/6);
  path2.lineTo(originX,originY+height/12+height/12);
  path2.bezierCurveTo(originX+width/6,originY+height/8,originX+width/3,originY+height/12,originX+width/3,originY+height/12);
 
  const mesh2= createMesh(path2.getPoints(100));
  group.add(mesh2);
 
 
  const path3= new THREE.Path();
  path3.moveTo(originX-width/3,originY);
  path3.lineTo(originX-width/3,originY-height/12);
  path3.lineTo(originX,originY-height/12);
  path3.lineTo(originX,originY);
 
 
  const mesh3= createMesh(path3.getPoints(100));
  group.add(mesh3);
 
  return group;
}