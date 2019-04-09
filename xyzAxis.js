class XYZAxis {
	constructor(x=200,y=200,z=200) {
		this.cylinderBottom = 1;
		this.coneBottom=this.cylinderBottom*7;
		this.coneLength=this.coneBottom * 2;
		this.x = x;
		this.y = y;
		this.z = z;
		this.hx = this.x /2;
		this.hy = this.y /2;
		this.hz = this.z /2;
		
		this.textX = new BoxX(this.x*1.6);
		this.textY = new BoxY(this.y*1.6);
		this.textZ = new BoxZ(this.z*1.6);
	}
	
	draw() {
			
		push();
		fill('blue');
		translate(this.x,0,0);
		rotateZ(-HALF_PI);
		cone(this.coneBottom,this.coneLength);
		pop();
		push();
		translate(this.hx,0,0);
		rotateZ(-HALF_PI);
		cylinder(this.cylinderBottom,this.x);
		pop();
		
		push();
		fill('green');
		translate(0,this.y,0);
		cone(this.coneBottom,this.coneLength);
		pop();
		push();
		translate(0,this.hy,0);
		cylinder(this.cylinderBottom,this.y);
		pop();
				
		push();
		fill('red');
		translate(0,0,this.z);
		rotateX(HALF_PI);
		cone(this.coneBottom,this.coneLength);
		pop();
		push();
		translate(0,0,this.hz);
		rotateX(HALF_PI);
		cylinder(this.cylinderBottom,this.y);
		pop();
		
		this.textX.draw();
		this.textY.draw();
		this.textZ.draw();
	}
}