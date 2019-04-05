let showtoggle = true;
let stopToggle = false;

let img;
let size = 3;

let m1,m2,m3;
let myTran;
let textA;
let rc;
let test;

function preload() {
	img = loadImage('./image/1024px-Rainbow-gradient-fully-saturated-diagonal.svg.png');
}

function setup() {
	createCanvas(600,400,WEBGL);
	
	textA = createP();
	stopBtn = createButton('stop');
	stopBtn.mouseClicked(()=>{
		if(stopToggle) loop(); else noLoop();
		stopToggle = !stopToggle;
		console.log('stopped :',stopToggle);
	});
	xBtn = createButton('toggle');
	xBtn.mouseClicked(()=>{showtoggle = !showtoggle;});
		
	rc = new RubikCube(1,30,2); // column, single cube length, gap
}

function draw() {
	ortho();
	orbitControl();
	rotateX(1.2);
	rotateZ(0.6);
	
	background('khaki');
		
	// to check origin and orientation
	fill('red');
	ellipse(0,0,10);
	fill('blue');
	ellipse(0,200,10);
	fill('green');
	ellipse(200,0,10);
	
	// cube drawing
	if(!showtoggle) return;
	rc.draw();

}

// function makeRubikCube(size=3,cubesize=20,gap=2) {
	// if(isNaN(size)) return;
	// size = size | 0;
	// size2 = size * size;
	// let halfLength = (cubesize * size + gap*(size-1) )/ 2;
	
	// for(let k=0;k<size;k++){
		// for(let i=0;i<size;i++){
			// for(let j=0;j<size;j++){
				// let x = j*(cubesize+gap) - halfLength + cubesize/2;
				// let y = i*(cubesize+gap) - halfLength + cubesize/2;
				// let z = k*(cubesize+gap) - halfLength + cubesize/2;
	
				// boxes.push(new BoxA(x,y,z,cubesize,cubesize,cubesize));
			// }
		// }
	// }
	
// }


