const { VerletParticle2D, VerletSpring2D } = toxi.physics2d;

export default class ParticleNetwork {
  constructor(physics, startPosition, stepDirection, numParticles, strength, damping, p) {
    this.particles = [];
    this.springs = [];
    this.p = p;

    for (let i = 0; i < numParticles; i++) {
      const particle = new VerletParticle2D(startPosition.add(stepDirection.scale(i)));
      physics.addParticle(particle);
      this.particles.push(particle);

      if (i > 0) {
        const prevParticle = this.particles[i - 1];
        const spring = new VerletSpring2D(prevParticle, particle, stepDirection.magnitude(), strength);
        spring.damping = damping;
        physics.addSpring(spring);
        this.springs.push(spring);
      }

      for (let j = 0; j < 2; j++) {
        const branchDirection = stepDirection.rotate(Math.PI / 2).scale((j + 1) * 10);
        const branchParticle = new VerletParticle2D(particle.add(branchDirection));
        physics.addParticle(branchParticle);

        //在这里改变分叉的大小
        const branchSpring = new VerletSpring2D(particle, branchParticle, branchDirection.magnitude()/20, strength);
        branchSpring.damping = damping;
        physics.addSpring(branchSpring);
        this.springs.push(branchSpring);
      }
    }
  }

  display() {
    this.p.stroke(255, 80);
    this.p.strokeWeight(2);
    this.p.noFill();

    this.p.beginShape();
    for (const particle of this.particles) {
      this.p.vertex(particle.x, particle.y);
    }
    this.p.endShape();

    for (const spring of this.springs) {
      //stroke(255, 50);
      this.p.strokeWeight(1);
      this.p.line(spring.a.x, spring.a.y, spring.b.x, spring.b.y);
      if (spring.b !== this.particles[this.particles.indexOf(spring.a) + 1]) {
        this.p.stroke(255,50);
        this.p.strokeWeight(3);
        this.p.fill(255,50);
        // rectMode(CENTER);
        // rect(spring.b.x, spring.b.y, 16,16);
        this.p.circle(spring.b.x, spring.b.y, 16);
      }
    }

    for (const particle of this.particles) {
      this.p.stroke(255,100);
      this.p.ellipse(particle.x, particle.y, 3, 3);
    }
  }
}

let particleNetwork;

// function createParticleNetrwork(){

//   const startPosition = new Vec2D(width / 2, height / 2);
//   const stepDirection = new Vec2D(1, 0).normalizeTo(10);
//   const numParticles = 20;
//   const strength = 0.01;
//   const damping = 0.01;

//   particleNetwork = new ParticleNetwork(physics, startPosition, stepDirection, numParticles, strength, damping);
// }

// function drawParticleNetwork(){

//   // Allow mouse to control the first particle
//   if (mouseIsPressed) {
//     particleNetwork.particles[0].lock();
//     particleNetwork.particles[0].set(mouseX, mouseY);
//   } else {
//     particleNetwork.particles[0].unlock();
//   }

//   particleNetwork.display();

// }