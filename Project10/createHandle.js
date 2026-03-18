import * as THREE from "three";
import { basicmaterial, standardMaterial } from "./material";
 
export function createHandle(handleOriginX,handleOriginY,height, width, handleDepth, materialType="basic") {
 
  const group = new THREE.Group();
 
 const material = materialType === "realistic"
    ? standardMaterial('#A5A5A8', 0.7, 0.3)
    : basicmaterial('#A5A5A8');
 
 
  const shape = new THREE.Shape();
 
  shape.moveTo(handleOriginX+width/3,handleOriginY);
 
  shape.bezierCurveTo(handleOriginX+width/4, handleOriginY+height/3-height/6, handleOriginX, handleOriginY+height/3-height/6, handleOriginX-width/3, handleOriginY+height/12);
  shape.bezierCurveTo(handleOriginX-2*width/3, handleOriginY+height/12, handleOriginX-2*width/3, handleOriginY+height/48,handleOriginX,handleOriginY-height/28)
 
 
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: handleDepth,
    bevelEnabled: false
  });
 
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
 
  const sphereGeo= new THREE.SphereGeometry(width*0.1);
  const sphereMat = materialType === "realistic"
      ? standardMaterial('#d1e0be', 0.4, 0.3)
      : basicmaterial('#d1e0be');
 
  const sphere= new THREE.Mesh(sphereGeo,sphereMat);
  sphere.position.set(handleOriginX, handleOriginY+height/16,handleDepth)
 
  mesh.add(sphere);
 
  const shape2 = new THREE.Shape();
 
  shape2.moveTo(handleOriginX, handleOriginY);
  shape2.lineTo(handleOriginX+width/3, handleOriginY);
  shape2.lineTo(handleOriginX+width /3, handleDepth);
  shape2.lineTo(handleOriginX, handleDepth);
  shape2.lineTo(handleOriginX,handleOriginY);
 
  const path = new THREE.CurvePath();
 
  //curve part
    path.add(
    new THREE.CubicBezierCurve3(
        new THREE.Vector3(handleOriginX, handleOriginY/28, 0),
        new THREE.Vector3(handleOriginX, handleOriginY-height/24, 0),    
        new THREE.Vector3(handleOriginX, handleOriginY-height/16, handleDepth),
        new THREE.Vector3(handleOriginX, handleOriginY-height/8, handleDepth)
    )
    );
 
    // straight downward part
    path.add(
    new THREE.LineCurve3(
        new THREE.Vector3(handleOriginX, handleOriginY-height/8, handleDepth),
        new THREE.Vector3(handleOriginX, handleOriginY-2*height/3+height/12, handleDepth)
    )
    );
 
 
  const geometry2 = new THREE.ExtrudeGeometry(shape2, {
    steps: 200,
    extrudePath: path,
    bevelEnabled: false
  });
 
  const mesh2 = new THREE.Mesh(geometry2, material);
  mesh2.position.set(handleOriginX+width/3, handleOriginY, handleDepth);
 
  group.add(mesh2);

 //end semi circle part of handle
  const path2= new THREE.CurvePath();
  path2.add(
    new THREE.CubicBezierCurve3(
        new THREE.Vector3(handleOriginX-width/3, handleOriginY-2*height/3+height/12, handleDepth),
        new THREE.Vector3(handleOriginX-width/3, handleOriginY-2*height/3, handleDepth),    
        new THREE.Vector3(handleOriginX, handleOriginY-2*height/3, handleDepth),
        new THREE.Vector3(handleOriginX, handleOriginY-2*height/3+height/12, handleDepth)
    )
  )
  const shape3 = new THREE.Shape(path2.getPoints(100));
 
  const geometry3 = new THREE.ExtrudeGeometry(shape3, {
    depth: handleDepth,
    bevelEnabled: false
  });
    const mesh3 = new THREE.Mesh(geometry3, material);
    mesh3.position.set(handleOriginX+width/3, handleOriginY, handleDepth);
 
    group.add(mesh3);
 
  return group;
}

