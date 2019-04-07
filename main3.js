let showtoggle = true, stopToggle = false;

let img;
let rc;

function preload() {
	img = loadImage('./image/1024px-Rainbow-gradient-fully-saturated-diagonal.svg.png');
}

function setup() {
	createCanvas(600,400,WEBGL);
	stopBtn = createButton('stop');
	stopBtn.mouseClicked(()=>{
		if(stopToggle) loop(); else noLoop();
		stopToggle = !stopToggle;
		console.log('stopped :',stopToggle);
	});
	xBtn = createButton('toggle');
	xBtn.mouseClicked(()=>{showtoggle = !showtoggle;});
	
	//--------------------------------------------
	//--------------change these------------------
	//--------------------------------------------
	
	// let column = 4;
	let singleCubeLength = 20; // px
	let gap = 2; // px
	
	//--------------------------------------------
	//--------------------------------------------
	//--------------------------------------------
	
	let textC = createP('-- drag to change perspective');
	
	let textD = createP('cube size');
	let radio2345 = createRadio();
	radio2345.option('2');
	radio2345.option('3');
	radio2345.option('4');
	radio2345.option('5');
	radio2345.value('3');
	radio2345.mouseClicked(()=>{
		rc = new RubikCube(Number(radio2345.value()),singleCubeLength,gap);
		console.log(`cube size set to ${radio2345.value()}`);
	});
	rc = new RubikCube(radio2345.value(),singleCubeLength,gap);
	
	
	let textA = createP('rotation axis');
	let radioXYZ = createRadio();
	radioXYZ.option('x');
	radioXYZ.option('y');
	radioXYZ.option('z');
	radioXYZ.value('z');
	
	let textB = createP('column index');
	let columnIndex = createRadio();
	
	columnIndex.option('0');
	columnIndex.option('1');
	columnIndex.option('2');
	columnIndex.option('3');
	columnIndex.option('4');
	columnIndex.value('2');
		
	let rotationLeft = createButton('L');
	let rotationRight = createButton('R');
	rotationLeft.mouseClicked(()=>{
		rc.rotateL(radioXYZ.value(),Number(columnIndex.value()));
		// rc.rotateL(radioXYZ.value(),columnIndex.value());
	});
	
	rotationRight.mouseClicked(()=>{
		rc.rotateR(radioXYZ.value(),Number(columnIndex.value()));
		// console.log(isNaN(columnIndex.value()));
		// rc.rotateR(radioXYZ.value(),columnIndex.value());
	});
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

