import * as THREE from 'three'

const loader = new THREE.TextureLoader();

const texture = await loader.loadAsync('/WoodFloor001_4K-JPG_Color.jpg');
const displTexture = await loader.loadAsync('/WoodFloor001_4K-JPG_Displacement.jpg');
const textureRoughness = await loader.loadAsync('/WoodFloor001_4K-JPG_Roughness.jpg');
const textureNormal = await loader.loadAsync('/WoodFloor001_4K-JPG_NormalDX.jpg');

texture.colorSpace = THREE.SRGBColorSpace;

[texture, textureRoughness, textureNormal, displTexture].forEach(tex => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(0.01,0.01);
});

export function addTexture(){

    const material = new THREE.MeshStandardMaterial({
        map: texture,
        normalMap: textureNormal,
        roughnessMap: textureRoughness,
        displacementMap: displTexture,
        displacementScale: 0.5,
        metalness: 0.3,
        roughness: 0.8,
        side: THREE.DoubleSide,
    });

    return material;
}