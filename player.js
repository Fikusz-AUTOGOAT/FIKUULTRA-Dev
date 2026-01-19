import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const keys = {};
let yaw = 0;
let pitch = 0;

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

export function setupPlayer(camera, renderer) {
    renderer.domElement.addEventListener("click", () => {
        renderer.domElement.requestPointerLock();
    });

    document.addEventListener("mousemove", e => {
        if (document.pointerLockElement) {
            yaw -= e.movementX * 0.002;
            pitch -= e.movementY * 0.002;
            pitch = Math.max(-1.5, Math.min(1.5, pitch));
            camera.rotation.set(pitch, yaw, 0);
        }
    });

    return function updatePlayer() {
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        dir.y = 0;
        dir.normalize();

        const right = new THREE.Vector3().crossVectors(dir, camera.up);

        if (keys["w"]) camera.position.add(dir.clone().multiplyScalar(0.1));
        if (keys["s"]) camera.position.add(dir.clone().multiplyScalar(-0.1));
        if (keys["a"]) camera.position.add(right.clone().multiplyScalar(-0.1));
        if (keys["d"]) camera.position.add(right.clone().multiplyScalar(0.1));
    };
}
