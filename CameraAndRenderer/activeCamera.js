import { perspectiveCamera, orthographicCamera } from './camera.js';
import { controls } from '../Task.js';


let activeCamera = perspectiveCamera;


window.addEventListener('keydown', (event) => {


    if (event.key === 'o') {
        activeCamera = orthographicCamera;
        controls.object= orthographicCamera;
        console.log("Orthographic Camera Activated");
    }


    if (event.key === 'p') {
        activeCamera = perspectiveCamera;
        controls.object= perspectiveCamera;
        console.log("Perspective Camera Activated");
    }


});
export { activeCamera };


