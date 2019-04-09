let showtoggle = true, stopToggle = false;

let img,colorTop,colorBottom,colorLeft,colorRight,colorFront,colorBack;
let imgX,imgY,imgZ;
let rc;
let axis;
let test;
let textResult;

function preload() {
	img = loadImage('./image/1024px-Rainbow-gradient-fully-saturated-diagonal.svg.png');
	imgTop = loadImage('./image/rubikTop.png');
	imgBottom = loadImage('./image/rubikBottom.png');
	imgFront = loadImage('./image/rubikFront.png');
	imgBack = loadImage('./image/rubikBack.png');
	imgLeft = loadImage('./image/rubikLeft.png');
	imgRight = loadImage('./image/rubikRight.png');
	imgX = loadImage('./image/x.png');
	imgY = loadImage('./image/y.png');
	imgZ = loadImage('./image/z.png');
}

function setup() {
	createCanvas(600,400,WEBGL);
	stopBtn = createButton('stop');
	stopBtn.mouseClicked(()=>{
		if(stopToggle) loop(); else noLoop();
		stopToggle = !stopToggle;
		console.log('stopped :',stopToggle);
	});
	xBtn = createButton('toggle axis');
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
		// rc.rotateR(radioXYZ.value(),columnIndex.value());
	});
	
	textResult = createP();
	textResult.position(20,20);

	axis = new XYZAxis();
	// test = new BoxX(100,0,0,40,40,40);
}

function draw() {
	ortho();
	orbitControl();
	rotateX(1.2);
	rotateZ(0.6);
	
	background('khaki');

	rc.draw();
	if(!showtoggle) return;
	axis.draw();
			
	// test.draw();
	checkSolved();
}

function checkSolved() {
	if(rc.check()) {
			textResult.style('backgroundColor','green');
			textResult.html('Solved');
	} else {
		textResult.style('backgroundColor','red');
		textResult.html('Not solved');
	}
}

