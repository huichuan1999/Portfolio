import Butterfly from "./Butterfly";
p5.disableFriendlyErrors = true;

var sketch = function(p) {
    let physics;
    let butterfly;

    p.setup = function() {
        let canvas = p.createCanvas(windowWidth, windowHeight);
        canvas.parent('p5-ButterflyMobile');

        // 初始化物理系统
        physics = new toxi.physics2d.VerletPhysics2D();
        physics.setWorldBounds(new toxi.geom.Rect(0, 0, p.width, p.height));

        butterfly = new Butterfly(p.width / 2, p.height / 2, 50, p, physics);
    }

    p.draw = function() {
        // p.background(0);
        p.clear();
        p.noFill();
        p.stroke(255);
        p.strokeWeight(3);
        p.rect(0,0,600,400);

        // 更新物理系统
        physics.update();

        // 显示蝴蝶
        butterfly.display();
    }
  }

  new p5(sketch);