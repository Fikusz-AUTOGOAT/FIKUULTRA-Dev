const trees = [];

for (let i = 0; i < 50; i++) {
    trees.push({
        x: Math.random() * 2000,
        y: Math.random() * 2000
    });
}

function drawWorld(ctx, camera, width, height) {
    ctx.fillStyle = "#1b5e20";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#2e7d32";
    trees.forEach(tree => {
        ctx.fillRect(
            tree.x - camera.x,
            tree.y - camera.y,
            40,
            60
        );
    });
}
