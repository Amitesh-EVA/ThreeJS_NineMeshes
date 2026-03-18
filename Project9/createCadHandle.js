import * as THREE from "three";
import { createMesh } from "./createMesh";
 
export function createHandleCAD(originX,originY,width,height) {
  const group = new THREE.Group();
  const path = new THREE.Path();
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
  path2.bezierCurveTo(originX+width/6,originY+height/7,originX+width/3,originY+height/12,originX+width/3,originY+height/16);
 
  const upperMesh= createMesh(path2.getPoints(100));
 
  const screwShape=new THREE.Shape();
  screwShape.moveTo(originX-width/3,originY+height/12+height/8);
  screwShape.lineTo(originX-2*width/9+width/9,originY+height/12+height/8);
  screwShape.absarc(originX-width/6,originY+height/12+height/8,width/18,0,Math.PI*2,false);
  const screwCircle= createMesh(screwShape.getPoints(100));
  upperMesh.add(screwCircle)
  group.add(upperMesh);
 
 
  const path3= new THREE.Path();
  path3.moveTo(originX-width/3,originY);
  path3.lineTo(originX-width/3,originY-height/12);
  path3.lineTo(originX,originY-height/12);
  path3.lineTo(originX,originY);
 
  const lowerMesh= createMesh(path3.getPoints(100));
 
  const screwShape2=new THREE.Shape();
  screwShape2.moveTo(originX-width/3,originY-height/24);
  screwShape2.lineTo(originX-2*width/9,originY-height/24);
  screwShape2.absarc(originX-width/6,originY-height/24,width/18,0,Math.PI*2,false);
  const screwCircle2= createMesh(screwShape2.getPoints(100));
  lowerMesh.add(screwCircle2)
  group.add(lowerMesh);
 
  return group;
}