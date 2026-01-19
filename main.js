let last = performance.now();

function animate(now) {
    const delta = (now - last) / 1000;
    last = now;

    updatePlayer(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate(performance.now());
