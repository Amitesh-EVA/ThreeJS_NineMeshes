import * as THREE from 'three'


const loader = new THREE.TextureLoader();
const texture = loader.load('/texture8.jpg');
// const textureRoughness= loader.load('/texture_rough.jpg');
// const textureNormal= loader.load('texture_normal')

texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(0.01,0.01);
texture.wrapS=THREE.RepeatWrapping;
texture.wrapT=THREE.RepeatWrapping;


export function addTexture(){

    const material = new THREE.MeshStandardMaterial({
        map:texture,
        metalness:0.3,
        roughness:0.8,
        side:THREE.DoubleSide,
    });

    return material;
}