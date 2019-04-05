let showtoggle = true;
let stopToggle = false;
let boxes = [];
let img;
let rotation = 0;
let size = 4,size2 = size*size;

// size2 = size * size;
function preload() {
	// img = loadImage('./image/solid-green-background.jpg');
	img2 = loadImage('./image/1024px-Rainbow-gradient-fully-saturated-diagonal.svg.png');
}

function setup() {
	createCanvas(600,400,WEBGL);
	// noLoop();
	
	stopBtn = createButton('stop');
	stopBtn.mouseClicked(()=>{
		if(stopToggle) loop(); else noLoop();
		stopToggle = !stopToggle;
		console.log('stopped :',stopToggle);
	});
	xBtn = createButton('toggle');
	xBtn.mouseClicked(()=>{showtoggle = !showtoggle;});
		
	// boxes.push(new BoxA(0,0,0,20,20,20));
	makeRubikCube(size,30,2);
	
	// boxes[1].color = 'blue';
	// noLoop();
	// directionalLight(255,255,255,0,1,-7);

	
}

function draw() {
	ortho();
	orbitControl();
	rotateX(1.2);
	rotateZ(0.6);
	// ambientMaterial('white');
	// ambientLight(255,255,255);
	// directionalLight(255,255,255,0,0,-1);
	
	background('khaki');
	// if(showtoggle)
	// box(50,50,50);
	// for(let item of boxes) item.draw();
	
	// to find out origin
	fill('red');
	ellipse(0,0,10);
	
	if(!showtoggle) return;
	
	push();
	rotateZ(rotation);
	for(let k=size-1;k<size;k++){
		for(let i=0;i<size;i++){
			for(let j=0;j<size;j++){
				boxes[size2*k+size*i+j].draw();
			}
		}
	}
	rotation+=0.03;
	pop();
	for(let k=0;k<size-1;k++){
		for(let i=0;i<size;i++){
			for(let j=0;j<size;j++){
				boxes[size2*k+size*i+j].draw();
			}
		}
	}
	// boxes[9*2+3*0+2].draw()
	// fill('red');
	// ellipse(100,100,10);
	// ellipse(0,0,10);
	
}

function makeRubikCube(size=3,cubesize=20,gap=2) {
	if(isNaN(size)) return;
	size = size | 0;
	size2 = size * size;
	let halfLength = (cubesize * size + gap*(size-1) )/ 2;
	console.log(halfLength);
	for(let k=0;k<size;k++){
		for(let i=0;i<size;i++){
			for(let j=0;j<size;j++){
				let x = j*(cubesize+gap) - halfLength + cubesize/2;
				let y = i*(cubesize+gap) - halfLength + cubesize/2;
				let z = k*(cubesize+gap) - halfLength + cubesize/2;
				// console.log(x,y,z);
				boxes.push(new BoxA(x,y,z,cubesize,cubesize,cubesize));
			}
		}
	}
}

class BoxA{
	constructor(x=0,y=0,z=0,w,h,d) {
		this.w = w;
		this.h = h;
		this.d = d;
		this.setTransition(x,y,z);
		// this.color = 'red'
		// this.setRotationX(rad);
	}
	
	setTransition(x=0,y=0,z=0) {
		this.tx = x;
		this.ty = y;
		this.tz = z;
		if(x || y || z) this.transitionOn = true;
		else this.transitionOn = false;
		return this;
	}
	
	setRotationX(rad) {
		
		return this;
	}
		
	draw(){
		push();
		if(this.transitionOn) translate(this.tx,this.ty,this.tz);
		// rotateX(this.rotX);
		// rotateY(this.rotY);
		// rotateZ(this.rotZ);
		// ambientMaterial(this.color);
		// box(this.w,this.h,this.d);
		let hw = this.w / 2;
		let hh = this.h / 2;
		let hd = this.d / 2;
		// let hw = this.w * 6;
		// let hh = this.h * 6;
		// let hd = this.d * 6;
		let offset = 0; // to move texture crop point
		texture(img2);
		beginShape();
		vertex(-hw,-hh,-hd,0+offset,0+offset);
		vertex(hw,-hh,-hd,this.w+offset,0+offset);
		vertex(hw,hh,-hd,this.w+offset,this.h+offset);
		vertex(-hw,hh,-hd,0+offset,this.h+offset);
		endShape(CLOSE);
		// texture(img2);
		offset += 200;
		beginShape();
		vertex(-hw,-hh,hd,0+offset,0+offset);
		vertex(hw,-hh,hd,this.w+offset,0+offset);
		vertex(hw,hh,hd,this.w+offset,this.h+offset);
		vertex(-hw,hh,hd,0+offset,this.h+offset);
		endShape(CLOSE);
		offset+=200;
		beginShape();
		vertex(-hw,-hh,hd,0+offset,0+offset);
		vertex(hw,-hh,hd,this.w+offset,0+offset);
		vertex(hw,-hh,-hd,this.w+offset,this.h+offset);
		vertex(-hw,-hh,-hd,0+offset,this.h+offset);
		endShape(CLOSE);
		offset+=200;
		beginShape();
		vertex(hw,-hh,hd,0+offset,0+offset);
		vertex(hw,hh,hd,this.w+offset,0+offset);
		vertex(hw,hh,-hd,this.w+offset,this.h+offset);
		vertex(hw,-hh,-hd,0+offset,this.h+offset);
		endShape(CLOSE);
		offset+=200;
		beginShape();
		vertex(hw,hh,hd,0+offset,0+offset);
		vertex(-hw,hh,hd,this.w+offset,0+offset);
		vertex(-hw,hh,-hd,this.w+offset,this.h+offset);
		vertex(hw,hh,-hd,0+offset,this.h+offset);
		endShape(CLOSE);
		offset+=200;
		beginShape();
		vertex(-hw,-hh,hd,0+offset,0+offset);
		vertex(-hw,hh,hd,this.w+offset,0+offset);
		vertex(-hw,hh,-hd,this.w+offset,this.h+offset);
		vertex(-hw,-hh,-hd,0+offset,this.h+offset);
		endShape(CLOSE);
		pop();
	}
}















