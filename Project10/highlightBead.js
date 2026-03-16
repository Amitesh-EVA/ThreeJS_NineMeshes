import { beadParts, frameParts } from "./createDesign";

export function highlightBead(selectedBead){

    beadParts.forEach(bead => {

        if(bead === selectedBead){
            bead.material.emissive.set("green");
        }
        else{
            bead.material.emissive.set("grey");
        }

    });

    //resetting frame to default color
    frameParts.forEach(frame=>{
        frame.material.emissive.set(0x000000);
        frame.material.emissiveIntensity=0;
    });

}