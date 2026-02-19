import { perspectiveCamera, orthographicCamera } from './camera.js';

let activeCamera = perspectiveCamera;

window.addEventListener('keydown', (event) => {

    if (event.key === 'o') {
        activeCamera = orthographicCamera;
        console.log("Orthographic Camera Activated");
    }

    if (event.key === 'p') {
        activeCamera = perspectiveCamera;
        console.log("Perspective Camera Activated");
    }

});
export { activeCamera };
