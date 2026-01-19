import { createScene } from "./scene.js";
import { createWorld } from "./world.js";
import { setupPlayer } from "./player.js";

const { scene, camera, renderer } = createScene();
createWorld(scene);

const updatePlayer = setupPlayer(camera, renderer);

function animate() {
    requestAnimationFrame(animate);
    updatePlayer();
    renderer.render(scene, camera);
}

animate();
