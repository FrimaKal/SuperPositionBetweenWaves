let waves = [];
let noOfWaves = 2;
let collapsed = false;

function setup() {
    createCanvas(800, 600);
    for (let i = 0; i < noOfWaves; i++) {
        let newWave = new Wave(noOfWaves - i);
        waves.push(newWave);
    }
}

function draw() {
    background(32);
    translate(width / 2, height / 2);
    for (let i = 0; i < waves.length; i++) {
        waves[i].update();
        waves[i].display();
    }
}

function mouseClicked() {
    if(!collapsed) {
        waves = [random(waves)];
        collapsed = true;
    } else {
        // Reset to initial state
        waves = [];
        for (let i = 0; i < noOfWaves; i++) {
            let newWave = new Wave(noOfWaves - i);
            waves.push(newWave);
        }
        collapsed = false;
    }
}

class Wave {
    constructor(freq) {
        this.angle = 0;
        this.amp = height / 4;
        this.freq = freq;
        this.vel = this.freq * 0.02;
        this.yvalues = new Array(width);
    }

    update() {
        this.angle += this.vel;
        let angle = this.angle;
        for (let x = 0; x < this.yvalues.length; x++) {
            if (x % this.freq === 0) {
                this.yvalues[x] = sin(angle) * this.amp;
            }
            angle += 0.02;
        }
    }

    display() {
        noStroke();
        fill(255, 50);
        for (let x = 0; x < this.yvalues.length; x++) {
            ellipse(x - width / 2, this.yvalues[x], 6, 6);
        }
    }
}
