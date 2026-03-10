import * as THREE from 'three'


export function createHexagon(cx,cy, r){

    const path = new THREE.Path();
    for(let i = 0; i < 6; i++){
        const angle = i * Math.PI / 3;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);

        if(i === 0)
            path.moveTo(x,y);
        else
            path.lineTo(x,y);
    }
    path.closePath();

    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({color:"black"});
    const line= new THREE.Line(geometry,material);

    return line;
}
