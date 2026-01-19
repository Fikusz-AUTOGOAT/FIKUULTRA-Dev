import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export const trees = [];
export let groundMesh;

export function createWorld(scene) {
    const size = 300;
    const segments = 100;

    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);

    // WYBRZUSZENIA TERENU
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        const y =
            Math.sin(i / 2) * 0.8 +
            Math.sin(i / 7) * 1.2 +
            Math.random() * 0.5;
        geometry.attributes.position.setY(i, y);
    }

    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
        color: 0x2e7d32,
        flatShading: false
    });

    groundMesh = new THREE.Mesh(geometry, material);
    groundMesh.rotation.x = -Math.PI / 2;
    scene.add(groundMesh);

    // DRZEWA Z LIŚĆMI
    for (let i = 0; i < 50; i++) {
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.5, 4),
            new THREE.MeshStandardMaterial({ color: 0x5d4037 })
        );

        const leaves = new THREE.Mesh(
            new THREE.SphereGeometry(2.2, 10, 10),
            new THREE.MeshStandardMaterial({ color: 0x1b5e20 })
        );

        const x = Math.random() * size - size / 2;
        const z = Math.random() * size - size / 2;
        const y = getHeightAt(x, z);

        trunk.position.set(x, y + 2, z);
        leaves.position.set(0, 3, 0);
        trunk.add(leaves);

        scene.add(trunk);
        trees.push(trunk);
    }
}

// POBIERANIE WYSOKOŚCI TERENU
export function getHeightAt(x, z) {
    const raycaster = new THREE.Raycaster(
        new THREE.Vector3(x, 100, z),
        new THREE.Vector3(0, -1, 0)
    );
    const hits = raycaster.intersectObject(groundMesh);
    return hits.length ? hits[0].point.y : 0;
}
