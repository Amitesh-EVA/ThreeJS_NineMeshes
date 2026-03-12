import * as THREE from 'three'


export function createGlass(glassWidth,glassHeight,glassThickness){

    const glassGeometry= new THREE.BoxGeometry(glassWidth,glassHeight,glassThickness);
    const glassMaterial= new THREE.MeshPhysicalMaterial({
        color:"#b3e0f2",
        transparent: true,
        transmission:0,
        roughness:0,
        metalness:0,
        ior:1.5,
        thickness:0.5,
        side:THREE.DoubleSide 
    })
    const glassMesh= new THREE.Mesh(glassGeometry,glassMaterial);

    return glassMesh;
}