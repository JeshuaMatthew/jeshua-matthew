function getDivSize(){
    return document.getElementById("p5-canvas").getBoundingClientRect();
}

const parentSize = getDivSize();


const canvasW = parentSize.width;
const canvasH = parentSize.height;

const marginSize = 30;


const boidSum = 200;

const turnFactor = 0.2;
const boidFOV = 80;
const boidProtectiveDiameter = 16;
const centeringFactor = 0.0005;
const avoidFactor = 0.05;
const matchingFactor = 0.05;
const maxSpeed = 6;
const minSpeed = 3;

const leftMargin = marginSize;
const rightMargin = canvasW - marginSize;
const topMargin = marginSize;
const bottomMargin = canvasH - marginSize;

const firstColor = "#1A1A19";
const secondColor = "#859F3D";
const thirdColor = "#31511E";
const fourthColor = "#F6FCDF";

class Boid{
    constructor(){
        this.pos = createVector(random(leftMargin,rightMargin),random(topMargin,bottomMargin));
        this.vel = p5.Vector.random2D();
    }

    seperation(boids){
        
        let close_d = createVector();
        
        for(let i = 0; i < boids.length; i++){
            let distance = dist(this.pos.x, this.pos.y, boids[i].pos.x, boids[i].pos.y);
            

            if(distance < boidProtectiveDiameter){
                close_d.x += this.pos.x - boids[i].pos.x;
                close_d.y += this.pos.y - boids[i].pos.y;

                
            }
        }

        close_d.mult(avoidFactor)
        this.vel.add(close_d);
    }

    alignment(boids){
        let vel_avg = createVector();
        let neighbor_sum = 0;

        for(let i = 0; i < boids.length; i++){
            let distance = dist(this.pos.x, this.pos.y, boids[i].pos.x, boids[i].pos.y);
            if(distance < boidFOV){
                vel_avg.add(boids[i].vel);
                neighbor_sum++;
            }
        }

        if(neighbor_sum > 0){
            vel_avg.div(neighbor_sum);
        }
        vel_avg.sub(this.vel);
        vel_avg.mult(matchingFactor);
        this.vel.add(vel_avg);

    }

    cohesion(boids){
        let pos_avg = createVector();
        let neighbor_sum = 0;
        for(let i = 0; i < boids.length; i++){
            let distance = dist(this.pos.x, this.pos.y, boids[i].pos.x, boids[i].pos.y);
            if(distance < boidFOV){
                pos_avg.add(boids[i].pos);
                neighbor_sum++;
            }
        }
        if(neighbor_sum > 0){
            pos_avg.div(neighbor_sum);
        }

        this.vel.x += (pos_avg.x - this.pos.x) * centeringFactor;
        this.vel.y += (pos_avg.y - this.pos.y) * centeringFactor;
        

    }

    avoidScreen(){
        if(this.pos.x < leftMargin){
            this.vel.x += turnFactor;
        }

        if(this.pos.x > rightMargin){
            this.vel.x -= turnFactor;
        }

        if(this.pos.y > bottomMargin){
            this.vel.y -= turnFactor;
        } 

        if(this.pos.y < topMargin){
            this.vel.y += turnFactor;
        }
    }

    speedLimit(){
        let speed = sqrt((this.vel.x * this.vel.x) + (this.vel.y * this.vel.y));

        if(speed > maxSpeed){
            this.vel.x = (this.vel.x / speed) * maxSpeed;
            this.vel.y = (this.vel.y / speed) * maxSpeed;
        }else if(speed < maxSpeed){
            this.vel.x = (this.vel.x / speed) * minSpeed;
            this.vel.y = (this.vel.y / speed) * minSpeed;
        }
    }

    update(){
        this.avoidScreen();
        this.speedLimit();

        this.pos.add(this.vel);
    }

    show(){

        fill(secondColor);
        
        circle(this.pos.x, this.pos.y,10);
    }
}

let boids = [];

function setup(){
    let canvas = createCanvas(canvasW,canvasH);
    canvas.parent("p5-canvas");
    for(let i = 0; i < boidSum; i ++){
        boids.push(new Boid());
    }
}

function draw(){
    background(51);
    for(let i = 0; i < boids.length; i++){
        boids[i].seperation(boids);
        boids[i].cohesion(boids);
        boids[i].alignment(boids);
        boids[i].show();
        boids[i].update();
    }

}