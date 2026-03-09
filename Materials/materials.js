import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture1 = await loader.loadAsync('/texture1.jpg');
const texture2= await loader.loadAsync('/texture2.jpg');
const texture3= await loader.loadAsync('/texture3.jpg');
const texture4= await loader.loadAsync('/texture4.jpg');
const texture6= await loader.loadAsync('/texture6.jpg');
const texture7= await loader.loadAsync('/texture7.jpg');

const normalTexture= await loader.loadAsync('/normalTexture1.jpg');
const armTexture= await loader.loadAsync('/armTexture1.jpg');

export const materials = {
    standard: () => new THREE.MeshStandardMaterial({
        // color: 'green',
        map:texture1,
        normalMap:normalTexture,
        aoMap:armTexture,
        roughnessMap:armTexture,
        metalnessMap:armTexture,
        metalness: 0.5
    }),

    phong: () => new THREE.MeshPhongMaterial({
        // color: 'green',
        map:texture2,
        shininess: 200
    }),

    lambert: () => new THREE.MeshLambertMaterial({
        // color: '#880808',
        map:texture6,
        opacity:1
    }),
    
    lineBasic: () => new THREE.LineBasicMaterial({
        color: '#049ef4', 
    }),

    toon: () => new THREE.MeshToonMaterial({
        // color: '#049ef4'
        map:texture3,
    }),

    physical: () => new THREE.MeshPhysicalMaterial({
        // color: '#049ef4',
        map:texture4,
        clearcoat: 1.0,
        roughness: 0.7
    }),

    basic: () => new THREE.MeshBasicMaterial({
        // color: '#880808',
        map:texture7,
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
