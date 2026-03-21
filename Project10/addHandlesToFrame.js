export function addHandlesToFrame(
    frontHandle,
    backHandle,
    sideIndex,
    designWidth,
    designHeight,
    outerWidth,
    outerH1,
    view,
    outerHeight,
    GHH,
    handleHeight,
    offsetX = 0,
    offsetY = 0
){

    let frontSide = frontHandle?.userData?.handleSide || null;
    let backSide  = backHandle?.userData?.handleSide || null;

    if (GHH > designHeight-handleHeight / 3) {
        alert("GHH cannot go beyond this point");
        GHH = designHeight/2;
    }

    // bottom
    if (sideIndex === 0){

        const frontOffset = (frontSide === "left") ? outerH1 : outerH1/6;
        const backOffset  = (backSide  === "left") ? outerHeight/1.5 : outerHeight/3;

        if (frontHandle) {
            frontHandle.position.set(
                designWidth/2 + offsetX,
                frontOffset + offsetY,
                0
            );
            frontHandle.rotation.set(0,0,-Math.PI/2);
        }

        if (backHandle) {
            backHandle.position.set(
                designWidth/2 + offsetX,
                backOffset + offsetY,
                -outerWidth
            );
            backHandle.rotation.set(Math.PI,0,Math.PI/2);
        }
    }

    // right
    if (sideIndex === 1){

        const frontOffset = (frontSide === "left") ? outerH1 : outerH1/4;
        const backOffset  = (backSide  === "left") ? outerHeight/2.5 : outerHeight/1.5;

        if (frontHandle) {
            frontHandle.position.set(
                designWidth - frontOffset + offsetX,
                GHH + offsetY,
                0
            );
            frontHandle.rotation.set(0,0,0);
        }

        if (backHandle) {
            backHandle.position.set(
                designWidth - backOffset + offsetX,
                GHH + offsetY,
                -outerWidth
            );
            backHandle.rotation.set(0,-Math.PI,0);
        }
    }

    // top    
    if (sideIndex === 2){

        const frontOffset = (frontSide === "left") ? outerH1 : outerH1/6;
        const backOffset  = (backSide  === "left") ? outerHeight/1.5 : outerHeight/3;

        if (frontHandle) {
            frontHandle.position.set(
                designWidth/2 + offsetX,
                designHeight - frontOffset + offsetY,
                0
            );
            frontHandle.rotation.set(0,0,Math.PI/2);
        }

        if (backHandle) {
            backHandle.position.set(
                designWidth/2 + offsetX,
                designHeight - backOffset + offsetY,
                -outerWidth
            );
            backHandle.rotation.set(0,Math.PI,Math.PI/2);
        }
    }

    // left
    if (sideIndex === 3){

        const frontOffset = (frontSide === "left") ? outerH1/4 : outerH1;
        const backOffset  = outerH1/1.5;

        if (frontHandle) {
            frontHandle.position.set(
                frontOffset + offsetX,
                GHH + offsetY,
                0
            );
            frontHandle.rotation.set(0,0,0);
        }

        if (backHandle) {
            backHandle.position.set(
                backOffset + offsetX,
                GHH + offsetY,
                -outerWidth
            );
            backHandle.rotation.set(0,Math.PI,0);
        }
    }

    // Visibility Control
    if (frontHandle) {
        frontHandle.visible = (view === "front" || view === "both");
    }

    if (backHandle) {
        backHandle.visible = (view === "back" || view === "both");
    }
}