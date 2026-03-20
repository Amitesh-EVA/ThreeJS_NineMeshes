// import * as THREE from "three";
// import { basicmaterial, standardMaterial } from "./material";
 
// export function createHandle(handleOriginX,handleOriginY,height, width, handleDepth, materialType="realistic") {
 
 
//  const material = materialType === "realistic"
//     ? standardMaterial('#A5A5A8', 0.7, 0.3)
//     : basicmaterial('#A5A5A8');
 
 
//   const shape = new THREE.Shape();
 
//   shape.moveTo(handleOriginX+width/3,handleOriginY-height/28);
//   shape.bezierCurveTo(handleOriginX+width/3, handleOriginY+height/6, handleOriginX, handleOriginY+height/6, handleOriginX-width/3, handleOriginY+height/12);
//   shape.bezierCurveTo(handleOriginX-2.5*width/3, handleOriginY+height/12, handleOriginX-2.5*width/3, handleOriginY,handleOriginX,handleOriginY-height/28)
// //  handleOriginY+height/48
 
//   const geometry = new THREE.ExtrudeGeometry(shape, {
//     depth: handleDepth,
//     bevelEnabled: false,
//     curveSegments:150
//   });
 
//   const headMesh = new THREE.Mesh(geometry, material);
//   // group.add(mesh);
 
//   const sphereGeo= new THREE.SphereGeometry(width*0.15);
//   const sphereMat = materialType === "realistic"
//       ? standardMaterial('#ffffff', 0.4, 0.3)
//       : basicmaterial('#d1e0be');
 
//   const sphere= new THREE.Mesh(sphereGeo,sphereMat);
//   sphere.position.set(handleOriginX, handleOriginY+height/16,handleDepth)
 
//   headMesh.add(sphere);
//   // mesh.add(new THREE.AxesHelper(100))
 
//   const shape2 = new THREE.Shape();
 
//   shape2.moveTo(handleOriginX, handleOriginY);
//   shape2.lineTo(handleOriginX+width/3, handleOriginY);
//   shape2.lineTo(handleOriginX+width /3, handleDepth);
//   shape2.lineTo(handleOriginX, handleDepth);
//   shape2.lineTo(handleOriginX,handleOriginY);
 
//   const path = new THREE.CurvePath();
 
//   //curve part
//     path.add(
//     new THREE.CubicBezierCurve3(
//         new THREE.Vector3(handleOriginX, handleOriginY-height/28.5, 0),
//         new THREE.Vector3(handleOriginX, handleOriginY-height/18, 0),    
//         new THREE.Vector3(handleOriginX, handleOriginY-height/12, handleDepth*1.5),
//         new THREE.Vector3(handleOriginX, handleOriginY-height/4, handleDepth*1.5),
//     )
//     );
 
//     // straight downward part
//     path.add(
//     new THREE.LineCurve3(
//         new THREE.Vector3(handleOriginX, handleOriginY-height/4, handleDepth*1.5),
//         new THREE.Vector3(handleOriginX, handleOriginY-2*height/3+height/12, handleDepth*1.5)
//     )
//     );
 
 
//   const geometry2 = new THREE.ExtrudeGeometry(shape2, {
//     steps: 2000,
//     extrudePath: path,
//     bevelEnabled: false
//   });
 
//   const curveHandleMesh = new THREE.Mesh(geometry2, material);
//   curveHandleMesh.position.set(handleOriginX+width/3, handleOriginY, handleDepth);
//   // mesh2.add(new THREE.AxesHelper(100))
 
//   headMesh.add(curveHandleMesh);

//  //end semi circle part of handle
//   const path2= new THREE.CurvePath();
//   path2.add(
//     new THREE.CubicBezierCurve3(
//         new THREE.Vector3(handleOriginX-width/3, handleOriginY-2*height/3+height/12, handleDepth),
//         new THREE.Vector3(handleOriginX-width/3, handleOriginY-2*height/3, handleDepth),    
//         new THREE.Vector3(handleOriginX, handleOriginY-2*height/3, handleDepth),
//         new THREE.Vector3(handleOriginX, handleOriginY-2*height/3+height/12, handleDepth)
//     )
//   )
//   const shape3 = new THREE.Shape(path2.getPoints(100));
 
//   const geometry3 = new THREE.ExtrudeGeometry(shape3, {
//     depth: handleDepth,
//     bevelEnabled: false
//   });
//     const semiCircleMesh = new THREE.Mesh(geometry3, material);
//     semiCircleMesh.position.set(width/3, handleOriginY, handleDepth*1.5);
 
//     headMesh.add(semiCircleMesh);

//     headMesh.position.set(handleOriginX,handleOriginY,0)
 
//   return headMesh;
// }

import * as THREE from "three";
import { basicmaterial, standardMaterial } from "./material";

export function createHandle(height, width, handleDepth, materialType="realistic") {

  const material = materialType === "realistic"
    ? standardMaterial('#A5A5A8', 0.7, 0.3)
    : basicmaterial('#A5A5A8');

  const shape = new THREE.Shape();
  shape.moveTo(width/3, -height/28);
  shape.bezierCurveTo(width/3, height/6,0, height/6,-width/3, height/12);
  shape.bezierCurveTo(-2.5*width/3, height/12,-2.5*width/3, 0,0, -height/28);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: handleDepth,
    bevelEnabled: false,
    curveSegments: 150
  });
  const headMesh = new THREE.Mesh(geometry, material);

  const sphereGeo = new THREE.SphereGeometry(width * 0.15);
  const sphereMat = materialType === "realistic"
    ? standardMaterial('#ffffff', 0.4, 0.3)
    : basicmaterial('#d1e0be');

  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.set(0, height/16, handleDepth);
  headMesh.add(sphere);

  const shape2 = new THREE.Shape();
  shape2.moveTo(0, 0);
  shape2.lineTo(width/3, 0);
  shape2.lineTo(width/3, handleDepth);
  shape2.lineTo(0, handleDepth);
  shape2.lineTo(0, 0);

  const path = new THREE.CurvePath();
  path.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -height/28.5, 0),
      new THREE.Vector3(0, -height/18, 0),
      new THREE.Vector3(0, -height/12, handleDepth * 1.5),
      new THREE.Vector3(0, -height/4, handleDepth * 1.5)
    )
  );

  path.add(
    new THREE.LineCurve3(
      new THREE.Vector3(0, -height/4, handleDepth * 1.5),
      new THREE.Vector3(0, -2*height/3 + height/12, handleDepth * 1.5)
    )
  );

  const geometry2 = new THREE.ExtrudeGeometry(shape2, {
    steps: 2000,
    extrudePath: path,
    bevelEnabled: false
  });

  const curveHandleMesh = new THREE.Mesh(geometry2, material);
  curveHandleMesh.position.set(width/3, 0, handleDepth);

  const path2 = new THREE.CurvePath();
  path2.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(-width/3, -2*height/3 + height/12, handleDepth),
      new THREE.Vector3(-width/3, -2*height/3, handleDepth),
      new THREE.Vector3(0, -2*height/3, handleDepth),
      new THREE.Vector3(0, -2*height/3 + height/12, handleDepth)
    )
  );

  const shape3 = new THREE.Shape(path2.getPoints(100));
  const geometry3 = new THREE.ExtrudeGeometry(shape3, {
    depth: handleDepth,
    bevelEnabled: false
  });

  const semiCircleMesh = new THREE.Mesh(geometry3, material);
  semiCircleMesh.position.set(width/3, 0, handleDepth * 1.5);

  headMesh.add(curveHandleMesh);
  headMesh.add(semiCircleMesh);

  return headMesh;
}
