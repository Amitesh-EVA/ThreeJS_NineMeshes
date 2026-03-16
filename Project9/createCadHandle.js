import * as THREE from "three";

export function createHandleCAD(width = 30, height = 90){

  const group = new THREE.Group();

  const material = new THREE.LineBasicMaterial({
    color: 0x00ff00
  });

  const W = width;
  const H = height;

  // dynamic fractions
  const stemHalf = W * (1/4);
  const headTop = H * (4/5);
  const shoulder = H * (3/5);
  const neck = H * (1/2);
  const bottomRadius = W * (1/8);

  // ------------------------
  // HANDLE OUTLINE
  // ------------------------

  const path = new THREE.Path();

  path.moveTo(-stemHalf, bottomRadius);

  // bottom curve
  path.quadraticCurveTo(
    0,
    -bottomRadius,
    stemHalf,
    bottomRadius
  );

  // right stem
  path.lineTo(stemHalf, shoulder);

  // right outer head
  path.quadraticCurveTo(
    W * (3/4),
    headTop,
    W * (1/4),
    H
  );

  // top head
  path.quadraticCurveTo(
    -W * (1/4),
    H,
    -W * (1/5),
    headTop
  );

  // left shoulder
  path.lineTo(-stemHalf, neck);

  // inner curve
  path.quadraticCurveTo(
    -W * (1/2),
    H * (2/5),
    -stemHalf,
    shoulder
  );

  path.lineTo(-stemHalf, bottomRadius);

  const outlinePoints = path.getPoints(200);

  const outlineGeo = new THREE.BufferGeometry().setFromPoints(outlinePoints);

  const outline = new THREE.Line(outlineGeo, material);

  group.add(outline);

  // ------------------------
  // CENTER LOCK CIRCLE
  // ------------------------

  const circlePath = new THREE.Path();

  const circleRadius = W * (1/3);

  circlePath.absarc(
    0,
    H * (3/5),
    circleRadius,
    0,
    Math.PI * 2
  );

  const circlePts = circlePath.getPoints(100);

  const circleGeo = new THREE.BufferGeometry().setFromPoints(circlePts);

  const circle = new THREE.Line(circleGeo, material);

  group.add(circle);

  // ------------------------
  // TOP SCREW HOLE
  // ------------------------

  const screwRadius = W * (1/10);

  const topHole = new THREE.Path();

  topHole.absarc(
    0,
    H * (4/5),
    screwRadius,
    0,
    Math.PI * 2
  );

  const topPts = topHole.getPoints(50);

  const topGeo = new THREE.BufferGeometry().setFromPoints(topPts);

  const topCircle = new THREE.Line(topGeo, material);

  group.add(topCircle);

  // ------------------------
  // BOTTOM SCREW HOLE
  // ------------------------

  const bottomHole = new THREE.Path();

  bottomHole.absarc(
    0,
    H * (2/5),
    screwRadius,
    0,
    Math.PI * 2
  );

  const bottomPts = bottomHole.getPoints(50);

  const bottomGeo = new THREE.BufferGeometry().setFromPoints(bottomPts);

  const bottomCircle = new THREE.Line(bottomGeo, material);

  group.add(bottomCircle);

  return group;
}