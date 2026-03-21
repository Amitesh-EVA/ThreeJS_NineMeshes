import * as THREE from 'three'

export function uvManipulation(geometry, scale = 0.05) {
  const pos = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const uv = [];

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const nx = normal.getX(i);
    const ny = normal.getY(i);
    const nz = normal.getZ(i);

    let u, v;
    if (nz > nx && nz > ny) {
      // front/back → XY
      u = x * scale;
      v = y * scale;
    } else if (nx > ny) {
      // sides → ZY
      u = z * scale;
      v = y * scale;
    } else {
      // top/bottom → XZ
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