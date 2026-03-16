import * as THREE from "three";
 
export function createHandle(height, width, depth) {
 
  const group = new THREE.Group();
 
  const material = new THREE.MeshBasicMaterial({
    color: "#049ef4",
  });
 
 
  const shape = new THREE.Shape();
 
  shape.moveTo(width * 0.3, -height * 0.03);
 
  shape.bezierCurveTo(
    width * 0.3, height * 0.15,
    -width * 0.3, height * 0.15,
    -width * 0.3, height * 0.10
  );
 
  shape.quadraticCurveTo(
    -width ,
    height * 0.03,
    0,
    -height * 0.03
  );
 
  shape.lineTo(width * 0.3, -height * 0.03);
 
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth,
    bevelEnabled: false
  });
 
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  const sphereGeo= new THREE.SphereGeometry(width*0.15);
  const sphereMat= new THREE.MeshBasicMaterial({color:"#d1e0be"});

  const sphere= new THREE.Mesh(sphereGeo,sphereMat);
  sphere.position.set(-width * 0.05, height * 0.04,depth)

  mesh.add(sphere);

  const shape2 = new THREE.Shape();
 
  shape2.moveTo(0, 0);
  shape2.lineTo(width * 0.3, 0);
  shape2.lineTo(width * 0.3, depth);
  shape2.lineTo(0, depth);
  shape2.lineTo(0, 0);
 
  const path = new THREE.CurvePath();

  //curve part
    path.add(
    new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, -height * 0.04, 0),
        new THREE.Vector3(0, -height * 0.08, 0),    
        new THREE.Vector3(0, -height * 0.1, depth), 
        new THREE.Vector3(0, -height * 0.15, depth) 
    )
    );

    // straight downward part
    path.add(
    new THREE.LineCurve3(
        new THREE.Vector3(0, -height * 0.15, depth),
        new THREE.Vector3(0, -height * 0.5, depth)
    )
    );

  const geometry2 = new THREE.ExtrudeGeometry(shape2, {
    steps: 200,
    extrudePath: path,
    bevelEnabled: false
  });
 
  const mesh2 = new THREE.Mesh(geometry2, material);
  mesh2.position.set(width * 0.3, height * 0.02, depth);
 
  group.add(mesh2);
 
  return group;
}