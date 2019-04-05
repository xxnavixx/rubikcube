let showtoggle = true;
let stopToggle = false;
let boxes = [];
let boxes2 = [];
let img;
let rotation = 0;
let size = 3,size2 = size*size;
let m1,m2,m3;
let myTran;
let textA;
let rc;
let test;
// size2 = size * size;
function preload() {
	// img = loadImage('./image/solid-green-background.jpg');
	img2 = loadImage('./image/1024px-Rainbow-gradient-fully-saturated-diagonal.svg.png');
}

function setup() {
	createCanvas(600,400,WEBGL);
	// noLoop();
	textA = createP();
	stopBtn = createButton('stop');
	stopBtn.mouseClicked(()=>{
		if(stopToggle) loop(); else noLoop();
		stopToggle = !stopToggle;
		console.log('stopped :',stopToggle);
	});
	xBtn = createButton('toggle');
	xBtn.mouseClicked(()=>{showtoggle = !showtoggle;});
		
	// makeRubikCube(size,30,2);
	rc = new RubikCube(5,30,2);

	// m1 = new BoxA(0,0,0,30,30,30);
	rotation = 0.03;
	// test = new MyMatrix(5);
	// test.set(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25);
	

	// noLoop();
	// for(let item of boxes) item.rotateX(rotation);
	
}

function draw() {
	ortho();
	orbitControl();
	// rotateX(1.2);
	// rotateZ(0.6);
	// push();
	// myTran.push();
	// myTran.rotateX(rotation);
	
	background('khaki');
		
	// to find out origin
	fill('red');
	ellipse(0,0,10);
	fill('blue');
	ellipse(0,200,10);
	fill('green');
	ellipse(200,0,10);
	
	if(!showtoggle) return;
	rc.draw();
		
	// rc.rotate('x',2,'r');
	
	// rc.select('x',2);
	// rc.selectionRotateX(0.03);
	
	// push();
	// rotateZ(rotation);

	// myTran.pop();
	// textA.html(boxes[25].tran.matrix.e);
	// console.log(rc.cubes[0].tran);
}

function makeRubikCube(size=3,cubesize=20,gap=2) {
	if(isNaN(size)) return;
	size = size | 0;
	size2 = size * size;
	let halfLength = (cubesize * size + gap*(size-1) )/ 2;
	// console.log(halfLength);
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
	// for(let i=0;i<size*size*size-1;i++) console.log('tx',boxes[i].tz);
}


