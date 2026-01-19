import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createWorld(scene) {
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
}

