import * as THREE from 'three'

export function uvManipulation(geometry, scale = 0.05) {
  const pos = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const uv = [];

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const nx = Math.abs(normal.getX(i));
    const ny = Math.abs(normal.getY(i));
    const nz = Math.abs(normal.getZ(i));

    let u, v;
    if (nz > nx && nz > ny) {
      // front/back → XY
      u = x * scale;
      v = y * scale;
    } else if (nx > ny) {
      // ZY (Sides)
      u = z * scale;
      v = y * scale;
    } else {
      // XZ (top/bottom)
      u = x * scale;
      v = z * scale;
    }

    uv.push(u, v);
  }

  geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(uv, 2)
  );
}