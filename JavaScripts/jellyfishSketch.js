import p5 from 'p5';
import Star from './Star';
const { VerletPhysics2D } = toxi.physics2d;
const { Rect } = toxi.geom;
p5.disableFriendlyErrors = true;

const sketch = (p) => {

    let physics;
    let jellyfish;
    let canvas;
    let tailPhysics;
    let draggedParticle = null;

    p.setup = () => {
        // canvas = createCanvas(windowWidth, windowHeight);
        let navHeight = document.querySelector('.nav').offsetHeight;
        canvas = p.createCanvas(p.windowWidth, p.windowHeight - navHeight);
        canvas.parent('p5-Jellyfish');

        p.frameRate(60);

        physics = new VerletPhysics2D();
        physics.setWorldBounds(new Rect(0, 20, p.width, p.height));
        // let gb0 = new GravityBehavior(new Vec2D(0, -0.001));// add gravity to tails
        // physics.addBehavior(gb0);
        physics.setDrag(0.01);

        tailPhysics = new VerletPhysics2D();
        tailPhysics.setWorldBounds(new Rect(0, 0, p.width, p.height));
        // let gb = new GravityBehavior(new Vec2D(0, 0.05));// add gravity to tails
        // tailPhysics.addBehavior(gb);
        // tailPhysics.setDrag(0.01);

        jellyfish = new Star(p.width- p.width / 3, p.height / 3, 9, 60, 120, p, physics, tailPhysics);

    }

    p.draw = () => {
        //   background(0);
        p.clear();
        p.noFill();
        p.stroke(255);
        p.strokeWeight(3);
        p.rectMode(p.CORNER);
        // p.rect(0, 0, p.width, p.height);
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

    p.mousePressed = () => {
        let closestDistance = Infinity; // 存储最近距离
        let closestPoint = null; // 存储最近的点

        for (let point of jellyfish.points) {
            let d = p.dist(p.mouseX, p.mouseY, point.x, point.y);
            if (d < closestDistance) {
                closestDistance = d;
                closestPoint = point;
            }
        }

        if (closestDistance < 40) { // 检查是否在拖拽距离内
            draggedParticle = closestPoint;
        }
    }

    p.mouseDragged = () => {
        if (draggedParticle !== null) {
            draggedParticle.x = p.mouseX;
            draggedParticle.y = p.mouseY;
        }
    }

    p.mouseReleased = () => {
        draggedParticle = null;
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

new p5(sketch);
