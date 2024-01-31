const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;
let jellyfish;
let canvas;

function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.parent('p5-Jellyfish');

    physics = new VerletPhysics2D();
    physics.setWorldBounds(new Rect(0, 20, width, height));
    let gb0 = new GravityBehavior(new Vec2D(0, -0.001));// add gravity to tails
    physics.addBehavior(gb0);
    //physics.setDrag(0.001);

    tailPhysics = new VerletPhysics2D();
    tailPhysics.setWorldBounds(new Rect(0, 0, width, height));
    let gb = new GravityBehavior(new Vec2D(0, 0.05));// add gravity to tails
    tailPhysics.addBehavior(gb);
    tailPhysics.setDrag(0.01);

    jellyfish = new Star(width / 2, height / 6, 10, 30, 60);

}

function draw() {
    //   background(0);
    clear();
    physics.update();
    tailPhysics.update();

    //jellyfish.particles[0].set(mouseX, mouseY);

    // Allow mouse to control the first particle
    if (mouseIsPressed) {
        jellyfish.centerPoint.lock();
        jellyfish.centerPoint.x = mouseX;
        jellyfish.centerPoint.y = mouseY;

    } else {
        jellyfish.centerPoint.unlock();
    }

    jellyfish.draw();
}