let MAX_OF_PARTICLES = 2000;
let MAX_OF_BUBBLES = 80;

let particles = [];
let bubbles = [];
let colorLeft, colorRight;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  noStroke();

  colorLeft = color(0, 100, 255);
  colorRight = color(255, 50, 0);

  for (let i = 0; i < MAX_OF_PARTICLES; i++) {
    particles.push(new Particle());
  }
  for (let i = 0; i < MAX_OF_BUBBLES; i++) {
    bubbles.push(new Bubble());
  }
}

function draw() {
  background(50, 50, 50, 80);
  translate(width / 2, height / 2);

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    p.checkOutOfCanvas();

    if (p.isDone) {
      particles.splice(i, 1);
      particles.push(new Particle());
    }
  }

  for (let i = bubbles.length - 1; i >= 0; i--) {
    let b = bubbles[i];
    b.update();
    b.display();
    b.checkOutOfCanvas();

    if (b.isDone) {
      bubbles.splice(i, 1);
      bubbles.push(new Bubble());
    }
  }

  for (let b of bubbles) {
    for (let p of particles) {
      let d = dist(b.x, b.y, p.x, p.y);
      if (d < 20) {
        b.x += (b.x - p.x) * 0.05;
        b.y += (b.y - p.y) * 0.05;
      }
    }
  }
}


class Particle {
  constructor() {
    this.angle = random(TWO_PI);
    this.radius = random(0, 5);
    this.speed = random(0.5, 2);
  }

  update() {
    this.radius += this.speed;
    this.angle += 0.02;
    this.speed *= 1.01;
    this.x = this.radius * cos(this.angle);
    this.y = this.radius * sin(this.angle);
  }

  display() {
    let t = map(this.x + width / 2, 0, width, 0, 1);
    let col = lerpColor(colorLeft, colorRight, constrain(t, 0, 1));
    fill(col);
    let size = map(this.radius, 0, width / 2, 5, 1);
    ellipse(this.x, this.y, size, size);
  }

  checkOutOfCanvas() {
    this.isDone = abs(this.x) > width / 2 || abs(this.y) > height / 2;
  }
}


class Bubble {
  constructor() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.size = random(10, 20);
    this.move = random(TWO_PI);
    this.speed = random(0.3, 1.2);
    this.r = random(200, 400);
  }

  update() {
    this.y -= this.speed;
    this.x += sin(this.move) * 1.5;
    this.move += 0.05;
    this.r += -1;

  }

  display() {
    noFill();
    stroke(200, 200, 255, 150);
    ellipse(this.x, this.y, this.size);
  }

  checkOutOfCanvas() {
    this.isDone = this.y < -height / 2 || this.life < 0;
  }
}
