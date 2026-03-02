import * as THREE from 'three';
import { createShape } from './createShape.js';
import { addHoles } from './project5.js';

const DEFAULTS = {
    width: 150,
    height: 150,
    h1: 75,
    w1: 25,
    depth: 20,
    holeRadius: 8
};

export function updateMesh(scene, meshRef, shapeControls)
{
    let width = parseFloat(shapeControls.width.value);
    let height = parseFloat(shapeControls.height.value);
    let h1 = parseFloat(shapeControls.h1.value);
    let w1 = parseFloat(shapeControls.w1.value);
    let depth = parseFloat(shapeControls.depth.value);
    let holeRadius = parseFloat(shapeControls.holeRadius.value);

    let r = w1 / 2;

    if (holeRadius >= r-1)
    {
        alert("Maximum Hole Radius Reached");

        holeRadius = DEFAULTS.holeRadius;
        shapeControls.holeRadius.value = holeRadius;
    }

    if (width >= 4 * w1)
    {
        alert("Invalid Width");
        width = DEFAULTS.width;
        shapeControls.width.value = width;
    }

    if (h1 <= 15 || w1 <= 15 || h1 < w1)
    {
        alert("Invalid Inputs");
        h1 = DEFAULTS.h1;
        w1 = DEFAULTS.w1;

        shapeControls.h1.value = h1;
        shapeControls.w1.value = w1;
    }

    r = w1 / 2;

    if (meshRef.current)
    {
        scene.remove(meshRef.current);
        meshRef.current.geometry.dispose();
        meshRef.current.material.dispose();
    }

    const newShape = createShape(width, height, h1, w1);

    const hole1 = new THREE.Path();
    hole1.absarc(width - r, h1 - w1/2, holeRadius, 0, Math.PI * 2);
    newShape.holes.push(hole1);


    const hole2 = new THREE.Path();
    hole2.absarc(w1 + w1 + r, height - 2*w1, holeRadius, 0, Math.PI * 2);
    newShape.holes.push(hole2);


    const geometry = new THREE.ExtrudeGeometry(newShape, {
        depth: depth,
        bevelEnabled: false,
        curveSegments: 200
    });

    geometry.center();

    const material = new THREE.MeshPhysicalMaterial({
        color: '#73C2FB',
        metalness: 0.4,
        clearcoat: 0.8
    });


    const newMesh = new THREE.Mesh(geometry, material);


    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 'black' })
    );

    newMesh.add(line);

    scene.add(newMesh);

    meshRef.current = newMesh;
}