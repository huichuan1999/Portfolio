import Butterfly from "./Butterfly";

var butterflySketch = function(p) {
    let physics;
    let butterfly;

    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('p5-ButterflyMobile');

        // 初始化物理系统
        physics = new toxi.physics2d.VerletPhysics2D();
        physics.setWorldBounds(new toxi.geom.Rect(0, 0, p.width, p.height));

        butterfly = new Butterfly(p.width / 2, p.height / 2, 60, p, physics);
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

  new p5(butterflySketch);