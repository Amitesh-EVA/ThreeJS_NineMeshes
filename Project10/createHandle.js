// import * as THREE from "three";
// import { basicmaterial, standardMaterial } from "./material";
 
// export function createHandle(handleOriginX,handleOriginY,height, width, handleDepth, materialType="basic") {
 
//   const group = new THREE.Group();
 
//  const material = materialType === "realistic"
//     ? standardMaterial('#A5A5A8', 0.7, 0.3)
//     : basicmaterial('#A5A5A8');
 
 
//   const shape = new THREE.Shape();
 
//   shape.moveTo(handleOriginX+width * 0.3, handleOriginY-height * 0.03);
 
//   shape.bezierCurveTo(
//     handleOriginX+width * 0.3, handleOriginY+height * 0.15,
//     handleOriginX-width * 0.3, handleOriginY+height * 0.15,
//     handleOriginX-width * 0.3, handleOriginY+height * 0.10
//   );
 
//   shape.quadraticCurveTo(
//     handleOriginX-width ,
//     handleOriginY+height * 0.03,
//     handleOriginX,
//     handleOriginY-height * 0.03
//   );
 
//   shape.lineTo(handleOriginX+width * 0.3, handleOriginY-height * 0.03);
 
//   const geometry = new THREE.ExtrudeGeometry(shape, {
//     depth: handleDepth,
//     bevelEnabled: false
//   });
 
//   const mesh = new THREE.Mesh(geometry, material);
//   group.add(mesh);
 
//   const sphereGeo= new THREE.SphereGeometry(width*0.1);
//   const sphereMat = materialType === "realistic"
//       ? standardMaterial('#d1e0be', 0.4, 0.3)
//       : basicmaterial('#d1e0be');
 
//   const sphere= new THREE.Mesh(sphereGeo,sphereMat);
//   sphere.position.set(handleOriginX-width * 0.05, handleOriginY+height * 0.04,handleDepth)
 
//   mesh.add(sphere);
 
//   const shape2 = new THREE.Shape();
 
//   shape2.moveTo(handleOriginX, handleOriginY);
//   shape2.lineTo(handleOriginX+width * 0.3, handleOriginY);
//   shape2.lineTo(handleOriginX+width * 0.3, handleDepth);
//   shape2.lineTo(handleOriginX, handleDepth);
//   shape2.lineTo(handleOriginX,handleOriginY);
 
//   const path = new THREE.CurvePath();
 
//   //curve part
//     path.add(
//     new THREE.CubicBezierCurve3(
//         new THREE.Vector3(handleOriginX, handleOriginY-height * 0.04, 0),
//         new THREE.Vector3(handleOriginX, handleOriginY-height * 0.08, 0),    
//         new THREE.Vector3(handleOriginX, handleOriginY-height * 0.1, handleDepth),
//         new THREE.Vector3(handleOriginX, handleOriginY-height * 0.15, handleDepth)
//     )
//     );
 
//     // straight downward part
//     path.add(
//     new THREE.LineCurve3(
//         new THREE.Vector3(handleOriginX, handleOriginY-height * 0.15, handleDepth),
//         new THREE.Vector3(handleOriginX, handleOriginY-height * 0.5, handleDepth)
//     )
//     );
 
//   const geometry2 = new THREE.ExtrudeGeometry(shape2, {
//     steps: 200,
//     extrudePath: path,
//     bevelEnabled: false
//   });
 
//   const mesh2 = new THREE.Mesh(geometry2, material);
//   mesh2.position.set(handleOriginX+width * 0.3, handleOriginY+height * 0.02, handleDepth);
 
//   group.add(mesh2);
 
//   return group;
// }

import * as THREE from "three";
import { basicmaterial, standardMaterial } from "./material";
import { CubicBezier } from "three/src/extras/core/Interpolations.js";
 
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

    //   const path3 = new THREE.CurvePath();
  // path3.add(new THREE.CubicBezierCurve3(
  //   new THREE.Vector3(0, -17*handleLength/24, 0),
  //   new THREE.Vector3(0, -handleLength + handleLength/6, 0),
  //   new THREE.Vector3(width/3, -handleLength + handleLength/6, 0),
  //   new THREE.Vector3(width/3, -17 * handleLength/24, 0)
  // ))
  // const semiShape = new THREE.Shape(path3.getPoints(100));
 
  // const semiGeo = new THREE.ExtrudeGeometry(semiShape, {
  //   depth: depth,
  //   bevelEnabled: false
  // });
  // const semiMesh = new THREE.Mesh(semiGeo, material);
  // semiMesh.position.z = depth
  // // semiMesh.position.y += 3 * fy
  // pivot.add(semiMesh);

  const path2= new THREE.CurvePath();
  path2.add(
    new THREE.CubicBezierCurve3(
        new THREE.Vector3(handleOriginX-width/3, handleOriginY-2*height/3+height/12, 0),
        new THREE.Vector3(handleOriginX-width/3, handleOriginY-2*height/3, 0),    
        new THREE.Vector3(handleOriginX, handleOriginY-2*height/3, 0),
        new THREE.Vector3(handleOriginX, handleOriginY-2*height/3+height/12, 0)
    )
  )
    const geometry3 = new THREE.ExtrudeGeometry(shape2, {
      steps: 200,
      extrudePath: path2,
      bevelEnabled: false
    });
  
    const mesh3 = new THREE.Mesh(geometry3, material);
    mesh3.position.set(handleOriginX+width/3, handleOriginY,2*handleDepth);
  
    group.add(mesh3);
  
  return group;
}