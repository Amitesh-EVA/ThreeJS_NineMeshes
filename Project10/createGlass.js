import * as THREE from 'three'


export function createGlass(glassWidth,glassHeight,glassThickness){

    const glassGeometry= new THREE.BoxGeometry(glassWidth,glassHeight,glassThickness);
    const glassMaterial= new THREE.MeshPhysicalMaterial({
        color:"#d6e9f0",
        transparent: true,
        transmission:0.8,
        roughness:0,
        metalness:0,
        ior:2.5,
        thickness:0.5,
        side:THREE.DoubleSide 
    })
    const glassMesh= new THREE.Mesh(glassGeometry,glassMaterial);

    return glassMesh;
}