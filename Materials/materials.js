import * as THREE from 'three';

export const materials = {
    standard: () => new THREE.MeshStandardMaterial({
        color: 'green',
        metalness: 0.5
    }),

    phong: () => new THREE.MeshPhongMaterial({
        color: 'green',
        shininess: 200
    }),

    lambert: () => new THREE.MeshLambertMaterial({
        color: '#880808',
        opacity:1
    }),
    
    lineBasic: () => new THREE.LineBasicMaterial({
        color: '#049ef4', 
    }),

    toon: () => new THREE.MeshToonMaterial({
        color: '#049ef4'
    }),

    physical: () => new THREE.MeshPhysicalMaterial({
        color: '#049ef4',
        clearcoat: 1.0,
        roughness: 0.7
    }),

    basic: () => new THREE.MeshBasicMaterial({
        color: '#880808',
        side: THREE.DoubleSide
    }),

    shadow: () => new THREE.ShadowMaterial({
            opacity: 0.5,
            // transparent: false
        }),

    normal: () => new THREE.MeshNormalMaterial({
        flatShading: true,
        wireframe:false,
        transparent:false,
        
    })

};
