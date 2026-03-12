import * as THREE from 'three'


const loader = new THREE.TextureLoader();
const texture = loader.load('/texture_color.jpg');
const textureDisp=loader.load('/texture_disp.jpg');
const textureRoughness= loader.load('/texture_rough.jpg');
const textureNormal= loader.load('texture_normal')

texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(0,0.1,0.1);
texture.wrapS=THREE.RepeatWrapping;
texture.wrapT=THREE.RepeatWrapping;


export function addTexture(){

    const material = new THREE.MeshStandardMaterial({
        map:texture,
        roughnessMap:textureRoughness,
        normalMap:textureNormal,
        metalness:0.3,
        roughness:0.8,
        side:THREE.DoubleSide,
    });

    return material;
}