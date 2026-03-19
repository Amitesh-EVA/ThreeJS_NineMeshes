    import * as THREE from "three"

    export function createScrew(originX,originY,width,backsetDepth){
    
        const screwShape = new THREE.Shape();
        screwShape.absarc(originX,originY, width/12, 0, Math.PI*2, false);
            
        const screwGeo = new THREE.ExtrudeGeometry(screwShape,{
            depth:backsetDepth,
            bevelEnabled:false
        });
    
        const screwMat = new THREE.MeshBasicMaterial({color:'grey'});
    
        const screw = new THREE.Mesh(screwGeo, screwMat);
    
        return screw;
    }