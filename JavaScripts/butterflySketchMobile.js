import Butterfly from "./Butterfly.js";
p5.disableFriendlyErrors = true;

var butterflySketch = function(p) {
    let physics;
    let butterfly;
    p5.disableFriendlyErrors = true;

    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('p5-ButterflyMobile');

        // 初始化物理系统
        physics = new toxi.physics2d.VerletPhysics2D();
        physics.setWorldBounds(new toxi.geom.Rect(0, 0, p.width, p.height));

        butterfly = new Butterfly(p.width / 2, p.height / 3, 60, p, physics);
    }

    p.draw = function() {
        // p.background(0);
        p.clear();

        // 更新物理系统
        physics.update();

        // 显示蝴蝶
        butterfly.display();
    }
  }

// Export the sketch function for use in other modules
export { butterflySketch };