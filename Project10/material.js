import * as THREE from 'three'
 
export function basicmaterial(color) {
    const material = new THREE.MeshBasicMaterial({ color: color });
    return material;
}
 
export function standardMaterial(color,metalness,roughness) {
    const material = new THREE.MeshStandardMaterial({ color: color,metalness:metalness,roughness:roughness });
    return material;
}