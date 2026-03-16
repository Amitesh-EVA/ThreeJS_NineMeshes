import * as THREE from 'three'

export function createStar(cx,cy,r){

    const spikes = 6;
    const inner = r/2;

    const path = new THREE.Path();

    for(let i=0;i<spikes*2;i++){

        const radius = i%2===0 ? r : inner;
        const angle = (i/(spikes*2))*Math.PI*2;

        const x = cx + radius*Math.cos(angle);
        const y = cy + radius*Math.sin(angle);

        if(i===0) path.moveTo(x,y);
        else path.lineTo(x,y);
    }

    path.closePath();

    const line= new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(path.getPoints()),
        new THREE.LineBasicMaterial({color:"black"})
    );

    return line;
}
