import * as THREE from 'three'
import { createExtrudeShape } from './createExtrudeShape';
import { createFrameShape } from './createFrameShape';
import { createBeadShape } from './createBeadShape';

export function createDesign(originX,originY,outerH1,outerWidth,outerHeight,designWidth,designHeight,beadW,beadH){

    const shape1 = createFrameShape(originX,originY,outerH1,outerWidth,outerHeight);
    const shape2= createBeadShape(originX,originY,beadW,beadH)
    const path = createExtrudeShape(originX,originY,designHeight,designWidth)

    const extrudeSettings = {
    
        steps:200,
        bevelEnabled:false,
        extrudePath:path
    };

    const geometry = new THREE.ExtrudeGeometry(shape1,extrudeSettings);

    const material = new THREE.MeshStandardMaterial({
        color:'#049ef4',
        metalness:0.3,
        roughness:0.6,
        // wireframe:true
    });

    const mesh = new THREE.Mesh(geometry,material);

    const edges = new THREE.EdgesGeometry( geometry );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({color:"black"}) );

    const position=geometry.getAttribute('position');
    const arr= position.array;
    for(let i=0;i<arr.length;i+=3){
        const x=arr[i];
        const y=arr[i+1];
        const z=arr[i+2];

        if(z>=0 && z <=outerWidth){
            // console.log(originX+outerH1)
            if(x===originX+outerH1 && y>=originY && y<=originY + outerH1 ){
                arr[i+1]=0;
            }
            if(y=== originY+outerH1 && x > originX && x <= originX+outerH1 ){
                arr[i]=outerH1;
            }
        }

        if(x >= originX+designWidth-outerH1 && x < originX+designWidth && y>= originY && y <= originY+outerH1){
            arr[i]=originY+outerH1;
        }

    }

    mesh.add(line);
    return mesh;
}


