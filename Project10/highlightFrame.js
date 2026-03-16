import { beadParts, frameParts } from "./createDesign";

export function highlightFrame(selectedFrame){

    frameParts.forEach(frame => {

        if(frame === selectedFrame){
            frame.material.emissive.set("yellow"); 
        }
        else{
            frame.material.emissive.set("cyan");
        }

    });
    
    //resetting bead to default color
    beadParts.forEach(bead=>{
        bead.material.emissive.set(0x000000);
        bead.material.emissiveIntensity=0;
    });

}