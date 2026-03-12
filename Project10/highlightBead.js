import { beadParts, frameParts } from "./createDesign";
import * as THREE from 'three'

    const loader = new THREE.TextureLoader();
    const texture = loader.load('/texture_color.jpg');
    const textureRoughness= loader.load('/texture_rough.jpg');
    const textureNormal= loader.load('/texture_normal.jpg')

export function highlightBead(selectedBead){

    beadParts.forEach(bead => {

        if(bead === selectedBead){
            bead.material.color.set("green");
        }
        else{
            bead.material.color.set("grey");
        }

    });

    //resetting frame to default color
    frameParts.forEach(frame=>{
        console.log(frameParts);
        frame.material.color.set("#049ef4");
        // frame.material.map= texture;
        // frame.material.roughnessMap=textureRoughness;
        // frame.material.normalMap=textureNormal;
    });

}