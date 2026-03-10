import * as THREE from 'three'

export function createRightInfoPart(originX,originY,w,h){

    const group=new THREE.Group();

    const path= new THREE.Path();
    path.moveTo(originX,originY);
    path.lineTo(originX+w,originY);
    path.lineTo(originX+w,originY+h);
    path.lineTo(originX,originY+h);
    path.lineTo(originX,originY);

    const points= path.getPoints();
    const geometry= new THREE.BufferGeometry().setFromPoints(points);
    const material= new THREE.LineBasicMaterial({color:"black"});
    const outline= new THREE.Line(geometry,material);
    group.add(outline);

    const horizontalLines=[];
    horizontalLines.push(

        new THREE.Vector3(originX,originY+h/20,0),
        new THREE.Vector3(originX+w/2,originY+h/20,0),

        new THREE.Vector3(originX,originY+2*h/20,0),
        new THREE.Vector3(originX+w/2,originY+2*h/20,0),  
        
        new THREE.Vector3(originX,originY+2*h/10,0),
        new THREE.Vector3(originX+w/2,originY+2*h/10,0),

        new THREE.Vector3(originX,originY+3.5*h/10,0),
        new THREE.Vector3(originX+w,originY+3.5*h/10,0),

        new THREE.Vector3(originX,originY+ 4.5*h/10,0),
        new THREE.Vector3(originX+w/2,originY+4.5*h/10,0),

        new THREE.Vector3(originX,originY+ 5.5*h/10,0),
        new THREE.Vector3(originX+w,originY+5.5*h/10,0),

        new THREE.Vector3(originX,originY+ 6.5*h/10,0),
        new THREE.Vector3(originX+w,originY+6.5*h/10,0),

        new THREE.Vector3(originX,originY+ 7.5*h/10,0),
        new THREE.Vector3(originX+w,originY+7.5*h/10,0),

        new THREE.Vector3(originX,originY+ 9*h/10,0),
        new THREE.Vector3(originX+w,originY+9*h/10,0),

        //middle vertical Lines
        new THREE.Vector3(originX+w/2,originY+ h/15,0),
        new THREE.Vector3(originX+w,originY+h/15,0),

        new THREE.Vector3(originX+3*w/4,originY+ 2*h/10,0),
        new THREE.Vector3(originX+w,originY+2*h/10,0),
    
    )

    const hGeometry = new THREE.BufferGeometry().setFromPoints(horizontalLines);
    const hMesh = new THREE.LineSegments(hGeometry, material);
    group.add(hMesh);   

    const verticalLines=[
        new THREE.Vector3(originX+w/2,originY+ 4.5*h/10,0),
        new THREE.Vector3(originX+w/2,originY,0),

        new THREE.Vector3(originX+3*w/4,originY+ 3.5*h/10,0),
        new THREE.Vector3(originX+3*w/4,originY+ h/15,0),

        new THREE.Vector3(originX+w/2,originY+ 9*h/10,0),
        new THREE.Vector3(originX+w/2,originY+7.5*h/10,0),

    ]

    const vGeometry= new THREE.BufferGeometry().setFromPoints(verticalLines);
    const vMesh= new THREE.LineSegments(vGeometry,material);
    group.add(vMesh);

    return group;
}