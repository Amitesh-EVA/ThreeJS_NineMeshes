
import * as THREE from 'three'

export function createShape(width=150,height=150,h1=70,w1=25){
    const arc=5;
    const r=w1/2;
    const shape = new THREE.Shape();
    shape.moveTo(0,arc);
    shape.absarc(arc, arc, arc, Math.PI, 3*Math.PI/2, false);

    shape.lineTo(width-arc,0);
    shape.absarc(width-arc,arc, arc, 3*Math.PI/2,0,false)

    shape.lineTo(width,h1-w1/2);
    shape.absarc(width-r,h1-w1/2, r, 0,Math.PI,false );

    // shape.lineTo(width-w1, w1);

    shape.lineTo(width-w1,w1+arc);
    shape.absarc(width-w1-arc,w1+arc,arc,0,3*Math.PI/2,true)


    shape.lineTo(w1+arc,w1)
    shape.absarc(w1+arc, w1+arc, arc,3*Math.PI/2,Math.PI, true )

    shape.lineTo(w1,height-2*w1);
    shape.absarc(w1+r,height-w1-w1,r,Math.PI,0,true );

    shape.absarc(w1+w1+r, height-2*w1, r, Math.PI,0, false);
    shape.absarc(w1+r,height-w1-w1,w1+r,0,Math.PI,false );
    shape.lineTo(0,arc);
   


    return shape;
}

