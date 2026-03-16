import { beadParts, frameParts } from "./createDesign";

    
    export function resetAllPartsColor(){

        frameParts.forEach(frame=>{
            frame.material.emissive.set(0x000000);
            frame.material.emissiveIntensity=0;
        });

        beadParts.forEach(bead=>{
            bead.material.emissive.set(0x000000);
            bead.material.emissiveIntensity=0;
        });

    }