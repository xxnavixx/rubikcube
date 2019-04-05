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
	
	let column = 4;
	let singleCubeLength = 20; // px
	let gap = 2; // px
	
	//--------------------------------------------
	//--------------------------------------------
	//--------------------------------------------
	
	rc = new RubikCube(column,singleCubeLength,gap);
	let textC = createP('-- drag to change perspective');
	let textA = createP('rotation axis');
	let radioXYZ = createRadio();
	radioXYZ.option('x');
	radioXYZ.option('y');
	radioXYZ.option('z');
	radioXYZ.value('z');
	
	let textB = createP('column index');
	let columnIndex = createRadio();
	for(let i=0;i<rc.size;i++)
		columnIndex.option(''+i);
	columnIndex.value(''+(rc.size-1));
		
	let rotationLeft = createButton('L');
	let rotationRight = createButton('R');
	rotationLeft.mouseClicked(()=>{
		rc.rotateL(radioXYZ.value(),Number(columnIndex.value()));
		// rc.rotateL();
	});
	
	rotationRight.mouseClicked(()=>{
		rc.rotateR(radioXYZ.value(),Number(columnIndex.value()));
		// rc.rotateL();
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


