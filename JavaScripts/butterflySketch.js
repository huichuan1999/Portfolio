var sketch = function(p) {
  let physics;
  let butterfly;

  p.setup = function() {
      let canvas = p.createCanvas(600, 600);
      canvas.parent('p5-Butterfly');

      // 初始化物理系统
      physics = new toxi.physics2d.VerletPhysics2D();
      physics.setWorldBounds(new toxi.geom.Rect(0, 0, p.width, p.height));

      butterfly = new Butterfly(p.width / 2, p.height / 2, 50, p, physics);
  }

  p.draw = function() {
      p.background(0);

      // 更新物理系统
      physics.update();

      // 显示蝴蝶
      butterfly.display();
  }
}

new p5(sketch);