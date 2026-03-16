import * as THREE from "three";
import { createExtrudeShape } from "./createExtrudeShape";
import { createFrameShape } from "./createFrameShape";
import { createBeadShape } from "./createBeadShape";
import { addTexture } from "./addTexture";

export const frameParts = [];
export const beadParts = [];

export function createDesign(originX, originY, outerH1, outerWidth, outerHeight, designWidth, designHeight, beadW, beadH) {

    const group = new THREE.Group();

    const sideGroups = {
        bottom: new THREE.Group(),
        right: new THREE.Group(),
        top: new THREE.Group(),
        left: new THREE.Group()
    };

    const sideArray = [
        sideGroups.bottom,
        sideGroups.right,
        sideGroups.top,
        sideGroups.left
    ];
    const path1 = createExtrudeShape(originX, originY, designHeight, designWidth);


    //Frame Design with 45135 cut angle
    const frameShape = createFrameShape(originX, originY, outerH1, outerWidth, outerHeight);
    const framePath = path1.curves;

    for (let idx = 0; idx < framePath.length; idx++) {

        const frameGeometry = new THREE.ExtrudeGeometry(
            frameShape,
            {
                extrudePath: framePath[idx],
                bevelEnabled: false
            }
        );

        const position = frameGeometry.attributes.position;
        for (let i = 0; i < position.count; i++) {

            let x = position.getX(i);
            let y = position.getY(i);

            if (idx === 0) {
                if (x === originX) {
                    position.setX(i, originX + y);
                }
                else if (x === designWidth) {
                    position.setX(i, originX + designWidth - y);
                }
            }

            else if (idx === 1) {
                if (y === originY) {
                    position.setY(i, originY + designWidth - x);
                }
                else if (y === designHeight) {
                    position.setY(i, originY + designHeight - (designWidth - x));
                }
            }

            else if (idx === 2) {
                if (x === 0) {
                    position.setX(i, originX + designHeight - y);
                }
                else if (x === designWidth) {
                    position.setX(i, originX + designWidth - (designHeight - y));
                }
            }

            else if (idx === 3) {
                if (y === 0) {
                    position.setY(i, originX + x);
                }
                else if (y === designHeight) {
                    position.setY(i, originY + designHeight - x);
                }
            }
        }

        frameGeometry.attributes.position.needsUpdate = true;
        frameGeometry.computeVertexNormals();

        // const frameMaterial = new THREE.MeshStandardMaterial({
        //     color: "#049ef4",
        //     metalness: 0.3,
        //     roughness: 0.8
        // })
        const frameMaterial=addTexture();
        const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);

        const edgeGeo = new THREE.EdgesGeometry(frameGeometry, 45);
        const line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({ color: "black" })
        );

        frameMesh.userData = "frame";
        frameParts.push(frameMesh);
        frameMesh.add(line);
        sideArray[idx].add(frameMesh);
    }


    //Bead Design with 9090 cut angle
    const beadHeight = designHeight - 2 * outerH1; //total bead Height around the design
    const beadWidth = designWidth - 2 * outerH1; //total beadWidth around the design
    const path2 = createExtrudeShape(originX, originY, beadHeight, beadWidth);
    const beadShape = createBeadShape(0, 0, beadW, beadH);
    const beadEdges = path2.curves;


    for (let idx = 0; idx < beadEdges.length; idx++) {
        const beadGeometry = new THREE.ExtrudeGeometry(
            beadShape,
            {
                extrudePath: beadEdges[idx],
                bevelEnabled: false,
                curveSegments: 100
            }
        );
        const position = beadGeometry.attributes.position;
        for (let i = 0; i < position.count; i++) {
            let x = position.getX(i);
            let y = position.getY(i);

            if (idx === 0 || idx == 2) {
                if (x === originX) {
                    position.setX(i, originX + beadH);
                }
                else if (x === beadWidth) {
                    position.setX(i, originX + beadWidth - beadH);
                }
            }
        }

        beadGeometry.attributes.position.needsUpdate = true;
        beadGeometry.computeVertexNormals();


        // const beadMaterial = new THREE.MeshStandardMaterial({
        //     color: "#049ef4",
        //     metalness: 0.3,
        //     roughness: 0.8
        // });
        const beadMaterial= addTexture();

        const beadMesh = new THREE.Mesh(beadGeometry, beadMaterial);
        const edgeGeo = new THREE.EdgesGeometry(beadGeometry,45);
        const line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({ color: "black" })
        );

        beadMesh.position.set(originX + outerH1, originY + outerH1, 0);
        beadMesh.userData = "bead";
        beadParts.push(beadMesh);
        beadMesh.add(line);
        sideArray[idx].add(beadMesh);
    }

    group.add(sideGroups.top);
    group.add(sideGroups.right);
    group.add(sideGroups.bottom);
    group.add(sideGroups.left);

    group.sides= sideGroups;

    return group;

}
