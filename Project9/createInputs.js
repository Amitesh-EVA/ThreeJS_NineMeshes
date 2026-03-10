import * as THREE from 'three';


export function worldToScreen(position, camera, renderer){

    const vector = position.clone().project(camera);

    const x = (vector.x + 1) / 2 * renderer.domElement.clientWidth;
    const y = (-vector.y + 1) / 2 * renderer.domElement.clientHeight;

    return {x,y};
}

export function positionProfileInputs(profileW,profileH,profileX,profileY,camera,renderer){

    const nameInput = document.getElementById("nameInput");
    const empInput = document.getElementById("empInput");
    const designationInput = document.getElementById("designationInput");

    const row = profileH/4;

    const namePos = worldToScreen(
        new THREE.Vector3(profileX + profileW/2, profileY + profileH - row/2,0),
        camera, renderer
    );

    const empPos = worldToScreen(
        new THREE.Vector3(profileX + profileW/2, profileY + profileH - row*1.5,0),
        camera, renderer
    );

    const desPos = worldToScreen(
        new THREE.Vector3(profileX + profileW/2, profileY + profileH - row*2.5,0),
        camera, renderer
    );
    
    nameInput.style.left = namePos.x - profileW/4 + "px";
    nameInput.style.top = namePos.y + "px";
    nameInput.style.width = profileW/2 + "px";

    empInput.style.left = empPos.x - profileW/4 + "px";
    empInput.style.top = empPos.y + "px";
    empInput.style.width = profileW/2 + "px";

    designationInput.style.left = desPos.x - profileW/2 + "px";
    designationInput.style.top = desPos.y + "px";
    designationInput.style.width = profileW + "px";
}

export function positionRightInfoInputs(originX,originY,w,h,camera,renderer){

 const designName = document.querySelector(".designName");
 const orgName = document.querySelector(".orgName");
 const projectId = document.querySelector(".projectId");
 const description=document.querySelector('.description');
 const designDetails=document.querySelector('.designDetails');
 const date=document.querySelector('.date');
 const hardwareDetails=document.querySelector('.hardware');
 const developerName=document.querySelector('.developer');
 const designDimensions=document.querySelector('.dimensions');
 const scaleFactor=document.querySelector('.scale');
 const signature=document.querySelector('.signature');

 const signaturePos= worldToScreen(
    new THREE.Vector3(originX,originY+h/20,0),
    camera,renderer);

signature.style.left=signaturePos.x+"px";
signature.style.top=signaturePos.y+"px";
signature.style.width=w/2+"px";

const scaleFactorPos=worldToScreen(
    new THREE.Vector3(originX,originY+2*h/20,0), camera, renderer
)
scaleFactor.style.left=scaleFactorPos.x+'px';
scaleFactor.style.top=scaleFactorPos.y+"px";
scaleFactor.style.width=w/2+"px";

const designDimensionsPos= worldToScreen(
    new THREE.Vector3(originX,originY+2*h/10,0), camera, renderer
)
designDimensions.style.left=designDimensionsPos.x+"px";
designDimensions.style.top=designDimensionsPos.y+"px";
designDimensions.style.width=w/2+'px';

const developerNamePos= worldToScreen(
    new THREE.Vector3(originX+3*w/4,originY+ 3.5*h/10,0),
    camera,renderer
)
developerName.style.left=developerNamePos.x+'px';
developerName.style.top=developerNamePos.y+"px";
developerName.style.width=w/4+"px"

const hardwareDetailsPos= worldToScreen(
    new THREE.Vector3(originX,originY+ 3.5*h/10,0),
    camera,renderer
)
hardwareDetails.style.left=hardwareDetailsPos.x+'px';
hardwareDetails.style.top=hardwareDetailsPos.y+"px";
hardwareDetails.style.width=w/2+"px"

const datePos= worldToScreen(
    new THREE.Vector3(originX,originY+ 4.5*h/10,0),
    camera,renderer
)
date.style.left=datePos.x+'px';
date.style.top=datePos.y+"px";
date.style.width=w/2+"px";

const designDetailsPos= worldToScreen(
    new THREE.Vector3(originX,originY+ 6.5*h/10,0),
    camera,renderer
)
designDetails.style.left=designDetailsPos.x+'px';
designDetails.style.top=designDetailsPos.y+"px";
designDetails.style.width=w+"px";

const descriptionPos= worldToScreen(
    new THREE.Vector3(originX,originY+ 7.5*h/10,0),
    camera,renderer
)
description.style.left=descriptionPos.x+'px';
description.style.top=descriptionPos.y+"px";
description.style.width=w+"px";

const orgNamePos= worldToScreen(
    new THREE.Vector3(originX,originY+ 9*h/10,0),camera,renderer
);
orgName.style.left=orgNamePos.x+'px';
orgName.style.top=orgNamePos.y+"px";
orgName.style.width=w/2+"px";

const projectIdPos= worldToScreen(
    new THREE.Vector3(originX+w/2,originY+ 9*h/10,0),camera,renderer
);
projectId.style.left=projectIdPos.x+'px';
projectId.style.top=projectIdPos.y+"px";
projectId.style.width=w/2+"px";

const designNamePos= worldToScreen(
    new THREE.Vector3(originX,originY+h,0),camera,renderer
);
designName.style.left=designNamePos.x+'px';
designName.style.top=designNamePos.y+"px";
designName.style.width=w+"px";



}

