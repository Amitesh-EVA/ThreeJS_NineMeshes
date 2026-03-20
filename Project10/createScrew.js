    import * as THREE from "three"

    export function createScrew(width,height, backsetDepth){
    
        const screwShape = new THREE.Shape();
        screwShape.absarc(0,0, width/12, 0, Math.PI*2, false);
            
        const screwGeo = new THREE.ExtrudeGeometry(screwShape,{
            depth:backsetDepth,
            bevelEnabled:false
        });
    
        const screwMat = new THREE.MeshBasicMaterial({color:'grey'});
    
        const screw = new THREE.Mesh(screwGeo, screwMat);
    
        return screw;
    }

    // import * as THREE from "three"

    // export function createScrew(originX,originY,width,height, backsetDepth){
    
    //     const screwShape = new THREE.Shape();
    //     screwShape.absarc(originX,originY,width/12, 0, Math.PI*2, false);
            
    //     const screwGeo = new THREE.ExtrudeGeometry(screwShape,{
    //         depth:backsetDepth,
    //         bevelEnabled:false
    //     });
    
    //     const screwMat = new THREE.MeshBasicMaterial({color:'grey'});
    
    //     const screw = new THREE.Mesh(screwGeo, screwMat);
    
    //     return screw;
    // }

    