import * as THREE from 'three'

export function createHole(x,y,radius){
    const hole= new THREE.Path();
    hole.absarc(x, y, radius, 0, Math.PI*2, true);
    return hole;
}