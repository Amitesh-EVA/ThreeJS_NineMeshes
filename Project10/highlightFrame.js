import { beadParts, frameParts } from "./createDesign";
import * as THREE from 'three'

    const loader = new THREE.TextureLoader();
    const texture = loader.load('/texture_color.jpg');
    const textureRoughness= loader.load('/texture_rough.jpg');
    const textureNormal= loader.load('/texture_normal.jpg')

export function highlightFrame(selectedFrame){

    frameParts.forEach(frame => {

        if(frame === selectedFrame){
            frame.material.color.set("yellow"); 
        }
        else{
            frame.material.color.set("grey");
        }

    });
    
    //resetting bead to default color
    beadParts.forEach(bead=>{
        bead.material.color.set("#049ef4")
            // bead.material.map= texture;
            // bead.material.roughnessMap=textureRoughness;
            // bead.material.normalMap=textureNormal;
    });

}