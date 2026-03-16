import * as THREE from 'three';
import { createHandle } from './createHandle';
import { createHole } from './createHole';
 

export function createBackSet(originX=0,originY=0,width=50,height=150,depth=10,handleSide="left"){
 
    const arc=2*width/15;
    const shape=new THREE.Shape();
    shape.moveTo(originX,originY);
    shape.lineTo(originX,originY+height/3);
    shape.lineTo(originX+width/3,originY+height/3);
    shape.lineTo(originX+width/3,originY+height/3-height/12+arc);
    shape.absarc(originX+width/3+arc,originY+height/3-height/12+arc,arc,Math.PI,3*Math.PI/2,false);
    shape.lineTo(originX+width/3+arc,originX+height/3-height/12);
    shape.absarc(originX+width/3+arc,originY+height/6,height/12,Math.PI,3*Math.PI/2,true);
    shape.lineTo(originX+width/3+arc,originY+height/12);
    shape.absarc(originX+width/3+arc,originY+height/12-arc,arc,Math.PI/2,Math.PI,false);
    shape.lineTo(originX+width/3,originY+height/12-arc);
    shape.lineTo(originX+width/3,originY);
    shape.lineTo(originX,originY);

    shape.holes.push(createHole(originX+width/6,originY+7*height/24,width/12));
    shape.holes.push(createHole(originX+width/6, originY+height/24, width/12));

    const extrudedSettings={
        depth:depth,
        bevelEnabled:false
    }
    
    const geometry= new THREE.ExtrudeGeometry(shape,extrudedSettings);
    const material= new THREE.MeshBasicMaterial({color:'#d1e0be'});
    const mesh=new THREE.Mesh(geometry,material);



function createScrew(){

    const screwShape = new THREE.Shape();
    screwShape.absarc(0, 0, width/12, 0, Math.PI*2, false);
         
    const screwGeo = new THREE.ExtrudeGeometry(screwShape,{
        depth:1,
        bevelEnabled:false
    });

    const screwMat = new THREE.MeshBasicMaterial({color:'grey'});

    const screw = new THREE.Mesh(screwGeo, screwMat);

    return screw;
}


// function createPlusSign(){

//     const material = new THREE.LineBasicMaterial({color:'black'});

//     const points1 = [
//         new THREE.Vector3(originX+width/12, 0, 0),
//         new THREE.Vector3(originX+width/3-width/12, 0, 0)
//     ];

//     // const points2 = [
//     //     new THREE.Vector3(0, -width/20, 0),
//     //     new THREE.Vector3(0, width/20, 0)
//     // ];

//     const geo1 = new THREE.BufferGeometry().setFromPoints(points1);
//     // const geo2 = new THREE.BufferGeometry().setFromPoints(points2);

//     const line1 = new THREE.Line(geo1, material);
//     // const line2 = new THREE.Line(geo2, material);

//     const group = new THREE.Group();
//     group.add(line1);
//     // group.add(line2);

//     return group;
// }

    const screw1= createScrew();
    screw1.position.set(originX+width/6,originY+7*height/24,depth-1);
    mesh.add(screw1);

    const screw2= createScrew();
    screw2.position.set(originX+width/6,originY+height/24,depth-1);
    mesh.add(screw2);

    // const plusSign=createPlusSign();
    // plusSign.position.set(originX+width/24,originY+7*height/24,depth+1.1)
    // mesh.add(plusSign);







    const handle=createHandle(height,0.9*width, depth);
    handle.position.set(width*0.45,height/8,depth);
    mesh.add(handle);
    mesh.position.set(originX+width/3,originY+height/6,0)

    //all handle data are stored here
    mesh.userData = {
        type: "handle",
        handleSide: handleSide,
        positionSide: "right",
        view: "front"
    };

    if(handleSide === "right"){
        mesh.scale.x = -1;
        mesh.position.x = width;
    }
    return mesh;
 
}
 