import * as THREE from 'three';

export const geometries = {
    box1: () => new THREE.BoxGeometry(4,4,4),
    sphere: () => new THREE.SphereGeometry(5,32,32),
    cone: () => new THREE.ConeGeometry(3,8,32),
    box2: () => new THREE.BoxGeometry(6,6,6),
    capsule: () => new THREE.CapsuleGeometry(4,8,32,32),
    cylinder: () => new THREE.CylinderGeometry(4,4,6),
    shape: () => {
        const arcShape = new THREE.Shape()
            .moveTo(5,1)
            .absarc(1,1,4,0,Math.PI,false);
        return new THREE.ShapeGeometry(arcShape);
    },
    plane: () => {
        const p = new THREE.PlaneGeometry(5,5);
        p.rotateX(Math.PI / 2);
        return p;
    },
    torus: () => new THREE.TorusGeometry(4,1,50,100),

};
