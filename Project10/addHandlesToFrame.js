 
const GHH= designHeight/2;
export function addHandlesToFrame(frontHandle,backHandle,sideIndex,designWidth,designHeight,outerWidth,
                                    outerH1,view,outerHeight,GHH,handleHeight){
 
    const frontSide = frontHandle.userData.handleSide;
    const backSide  = backHandle.userData.handleSide;
 
    if(GHH > designHeight-handleHeight/3){
        alert("GHH cannot go beyond this point");
        GHH=designHeight/2;
    }
   
 
    if(sideIndex === 0){
 
        const frontOffset = (frontSide === "left") ? outerH1 : outerH1/6;
        const backOffset  = (backSide  === "left") ? outerHeight/1.5 : outerHeight/3;
 
        frontHandle.position.set(designWidth/2, frontOffset, 0);
        frontHandle.rotation.set(0,0,-Math.PI/2);
 
        backHandle.position.set(designWidth/2, backOffset, -outerWidth);
        backHandle.rotation.set(Math.PI,0,Math.PI/2);
    }
 
    if(sideIndex === 1){
 
        const frontOffset = (frontSide === "left") ? outerH1 : outerH1/4;
        const backOffset  = (backSide  === "left") ? outerHeight/2.5: outerHeight/1.5;
 
        frontHandle.position.set(designWidth-frontOffset, GHH, 0);
        frontHandle.rotation.set(0,0,0);
 
        backHandle.position.set(designWidth-backOffset, GHH, -outerWidth);
        backHandle.rotation.set(0,-Math.PI,0);
    }
 
    if(sideIndex === 2){
 
        const frontOffset = (frontSide === "left") ? outerH1 : outerH1/6;
        const backOffset  = (backSide  === "left") ? outerHeight/1.5 : outerHeight/3;
 
        frontHandle.position.set(designWidth/2, designHeight-frontOffset, 0);
        frontHandle.rotation.set(0,0,Math.PI/2);
 
        backHandle.position.set(designWidth/2, designHeight-backOffset, -outerWidth);
        backHandle.rotation.set(0,Math.PI,Math.PI/2);
    }
 
    if(sideIndex === 3){
 
        const frontOffset = (frontSide === "left") ? outerH1/4: outerH1;
        const backOffset  = outerH1/1.5;
 
        frontHandle.position.set(frontOffset, GHH, 0);
        frontHandle.rotation.set(0,0,0);
 
        backHandle.position.set(backOffset, GHH, -outerWidth);
        backHandle.rotation.set(0,Math.PI,0);
    }
 
 
    //View Control of the handle
    if(view === "front"){
        frontHandle.visible = true;
        backHandle.visible = false;
    }
 
    if(view === "back"){
        frontHandle.visible = false;
        backHandle.visible = true;
    }
 
    if(view === "both"){
        frontHandle.visible = true;
        backHandle.visible = true;
    }
 
}