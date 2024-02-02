const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;
let jellyfish;
let canvas;

let draggedParticle = null;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-Jellyfish');

    frameRate(60);

    physics = new VerletPhysics2D();
    physics.setWorldBounds(new Rect(0, 20, width, height));
    // let gb0 = new GravityBehavior(new Vec2D(0, -0.001));// add gravity to tails
    // physics.addBehavior(gb0);
    physics.setDrag(0.01);

    tailPhysics = new VerletPhysics2D();
    tailPhysics.setWorldBounds(new Rect(0, 0, width, height));
    // let gb = new GravityBehavior(new Vec2D(0, 0.05));// add gravity to tails
    // tailPhysics.addBehavior(gb);
    // tailPhysics.setDrag(0.01);

    jellyfish = new Star(width / 2, height / 6, 10, 60, 120);

}

function draw() {
    //   background(0);
    clear();
    noFill();
    stroke(255);
    strokeWeight(3);
    rectMode(CORNER);
    rect(0, 0, width, height);
    physics.update();
    tailPhysics.update();

    //jellyfish.particles[0].set(mouseX, mouseY);

    // Allow mouse to control the first particle
    // if (mouseIsPressed) {
    //     jellyfish.centerPoint.lock();
    //     jellyfish.centerPoint.x = mouseX;
    //     jellyfish.centerPoint.y = mouseY;

    // } else {
    //     jellyfish.centerPoint.unlock();
    // }

    jellyfish.draw();
}

function mousePressed() {
    let closestDistance = Infinity; // 存储最近距离
    let closestPoint = null; // 存储最近的点

    for (let point of jellyfish.points) {
        let d = dist(mouseX, mouseY, point.x, point.y);
        if (d < closestDistance) {
            closestDistance = d;
            closestPoint = point;
        }
    }

    if (closestDistance < 40) { // 检查是否在拖拽距离内
        draggedParticle = closestPoint;
    }
}

function mouseDragged() {
    if (draggedParticle !== null) {
        draggedParticle.x = mouseX;
        draggedParticle.y = mouseY;
    }
}

function mouseReleased() {
    draggedParticle = null;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}