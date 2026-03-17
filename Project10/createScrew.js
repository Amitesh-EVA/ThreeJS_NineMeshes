    import * as THREE from "three"

    export function createScrew(width){
    
        const screwShape = new THREE.Shape();
        screwShape.absarc(0, 0, width/12, 0, Math.PI*2, false);
            
        const screwGeo = new THREE.ExtrudeGeometry(screwShape,{
            depth:1,
            bevelEnabled:false
        });
    
        const screwMat = new THREE.MeshBasicMaterial({color:'grey'});
    
        const screw = new THREE.Mesh(screwGeo, screwMat);
    
        return screw;
    }