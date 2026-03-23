// import * as THREE from 'three';
// import { createHandle } from './createHandle';
// import { createHole } from './createHole';
// import { basicmaterial, standardMaterial } from './material';
// import { createScrew } from './createScrew';
// import { createScrewPlusSign } from './createScrewPlusSign';
 
 
// export function createBackSet(originX,originY,width=50,height=150,backsetDepth,handleDepth,handleSide="left",materialType = "basic"){

//     // const ghhValue = originY;
//     // originY = 0;
//     // const handleGroup = new THREE.Group();

//     const shape=new THREE.Shape();
//     shape.moveTo(originX,originY);
//     shape.lineTo(originX,originY+height/3);
//     shape.lineTo(originX+width/3,originY+height/3);
//     shape.lineTo(originX+width/3,originY+height/3-height/12);
//     shape.absarc(originX+width/3,originY+height/6,width/3   ,Math.PI,3*Math.PI,true);
//     shape.lineTo(originX+width/3,originY+height/12);
//     shape.lineTo(originX+width/3,originY);
//     shape.lineTo(originX,originY)
 
//     shape.holes.push(createHole(originX+width/6,originY+7*height/24,width/12));
//     shape.holes.push(createHole(originX+width/6, originY+height/24, width/12));
 
//     const extrudedSettings={
//         depth:backsetDepth,
//         bevelEnabled:false,
//         curveSegments:150
//     }
   
//     const geometry= new THREE.ExtrudeGeometry(shape,extrudedSettings);
//     const material = materialType === "realistic"
//     ? standardMaterial('#ffffff', 0.4, 0.3)
//     : basicmaterial('#d1e0be');
//     const backset=new THREE.Mesh(geometry,material);
//     // backset.add(new THREE.AxesHelper(100));
//     backset.position.set(originX,originY,0)
 
//     const screw1= createScrew(originX,originY,width,height,backsetDepth);
//     screw1.position.set(originX+width/6,originY+7*height/24,0);
//     // const screw1= createScrew(width,backsetDepth);
//     // screw1.position.set(width/6,7*height/24,backsetDepth);
 
//     const screw2= createScrew(originX,originY,width,height,backsetDepth);
//     screw2.position.set(originX+width/6,originY+height/24,0);
//     // const screw2= createScrew(width,backsetDepth);
//     // screw2.position.set(width/6,height/24,backsetDepth);
 
//     const plusSign1=createScrewPlusSign(originX,originY,height,width);
//     plusSign1.position.set(originX,originY,backsetDepth)

//     const plusSign2=createScrewPlusSign(originX,originY,height,width);
//     // plusSign2.add(new THREE.AxesHelper(100));
//     plusSign2.position.set(originX,originY,backsetDepth)
 
//     const handle=createHandle(originX,originY,height,0.9*width, handleDepth ,materialType);
//     handle.position.set(originX+width*0.45,originY+height/8,backsetDepth);

//     // const handle=createHandle(height,0.9*width, handleDepth ,materialType);
//     // handle.position.set(width*0.45,height/8,backsetDepth);

//     backset.add(screw1);
//     backset.add(screw2);
//     screw1.add(plusSign1);
//     screw2.add(plusSign2);
//     backset.add(handle);

    
//     // handleGroup.add(backset);
//     // handleGroup.add(screw1);
//     // handleGroup.add(screw2);
//     // handleGroup.add(plusSign1);
//     // handleGroup.add(plusSign2);
//     // handleGroup.add(handle);
 
//    if (handleSide === "right") {
//         backset.scale.x = -1;
//         backset.position.x = width;
//     }

//     backset.position.set(originX, originY, 0);


//     backset.userData = {
//         type: "handle",
//         handleSide: handleSide,
//         positionSide: "right",
//         view: "front"  
//     };

//     // return {
//     //     handleGroup,
//     //     ghhValue
//     // };
//     return backset;
 
// }


////////////////////////////////////////////////////////

import * as THREE from 'three';
import { createHandle } from './createHandle';
import { createHole } from './createHole';
import { basicmaterial, standardMaterial } from './material';
import { createScrew } from './createScrew';
import { createScrewPlusSign } from './createScrewPlusSign';


export function createBackSet(
  originX,
  originY,
  width,
  height,
  backsetDepth,
  handleDepth,
  handleSide = "left",
  materialType = "basic"
) {

  const shape = new THREE.Shape();

    shape.moveTo(originX, originY);
    shape.lineTo(originX, originY + height / 3);
    shape.lineTo(originX + width / 3, originY + height / 3);
    shape.lineTo(originX + width / 3,originY + height / 3 - height / 12);
    shape.absarc(originX + width / 3, originY + height / 6, width / 3, Math.PI / 2, 3 * Math.PI / 2, true);
    shape.lineTo(originX + width / 3, originY + height / 12);
    shape.lineTo(originX + width / 3, originY);
    shape.lineTo(originX, originY);

    shape.holes.push(createHole(originX + width / 6,originY + 7 * height / 24,width / 12));

    shape.holes.push(createHole(originX + width / 6,originY + height / 24,width / 12));

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: backsetDepth,
        bevelEnabled: false,
        curveSegments: 150
    });

    const material =
    materialType === "realistic"
      ? standardMaterial('#ffffff', 0.4, 0.3)
      : basicmaterial('#d1e0be');

  const backsetMesh = new THREE.Mesh(geometry, material);

 
  const screw1 = createScrew(width,height, backsetDepth);
  screw1.position.set(originX+width / 6,originY+ 7 * height / 24,0 );

  const screw2 = createScrew(width, height, backsetDepth);
  screw2.position.set(originX+width / 6, originY+height / 24, 0);

  const plusSign1 = createScrewPlusSign(height, width);
  plusSign1.position.set(0, 0, backsetDepth);

  const plusSign2 = createScrewPlusSign(height, width);
  plusSign2.position.set(0, 0, backsetDepth);

  const handle = createHandle(height, 0.9 * width, handleDepth, materialType);
  handle.position.set(originX+width * 0.45, originY+height / 8, backsetDepth);

  screw1.add(plusSign1);
  screw2.add(plusSign2);

  backsetMesh.add(screw1);
  backsetMesh.add(screw2);
  backsetMesh.add(handle);

  //mirroring of left hanbdle to make it right handle
  if (handleSide === "right") {
    backsetMesh.scale.x = -1;
    backsetMesh.position.x = width;
  }

  backsetMesh.userData = {
    type: "handle",
    handleSide,
    view: "front"
  };
//   backsetMesh.add(new THREE.AxesHelper(100));

  return backsetMesh;
}