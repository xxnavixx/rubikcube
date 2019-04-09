class MyTransform3D {
	constructor() {
		// this.matrice = [];
		this._matrixHistory = []
		this._result = createVector(0,0,0);
		this.matrix = new MyMatrix3D();
	}
	
	applyMatrix(matrix) {
				
		matrix.mult(this.matrix);
		this.matrix.set(matrix);
		
		// this.matrix.mult(matrix);

	}
	
	transform(x,y,z) {
		// returning transformed x,y,z coordinate as p5 vector;
		if(isNaN(x) || isNaN(y) || isNaN(z)) {console.log('input is not number');return;}
		
		this._result.x = this.matrix.a * x + this.matrix.b * y + this.matrix.c * z;
		this._result.y = this.matrix.d * x + this.matrix.e * y + this.matrix.f * z;
		this._result.z = this.matrix.g * x + this.matrix.h * y + this.matrix.i * z;
				
		return this._result;
	}
	
	// collapse() {
		// for(let i=this.matrice.length-1;i>0;i--) {
			// this.matrice[i].mult(this.matrice[i-1]); // order is wrong
		// }
		// this.matrice.splice(1,this.matrice.length-1);
	// }
	
	rotateX(rad) {
		let m = new MyMatrix3D(1,0,0, 0,cos(rad),sin(rad), 0,-sin(rad),cos(rad));
		this.applyMatrix(m);
	}
	
	rotateY(rad) {
		let m = new MyMatrix3D(cos(rad),0,-sin(rad), 0,1,0, sin(rad),0,cos(rad));
		// let m = new MyMatrix3D(cos(rad),0,sin(rad), 0,1,0, -sin(rad),0,cos(rad)); // y coordinate of direction is reversed with math x,y,z convention
		this.applyMatrix(m);
	}
	
	rotateZ(rad) {
		let m = new MyMatrix3D(cos(rad),sin(rad),0, -sin(rad),cos(rad),0, 0,0,1);
		this.applyMatrix(m);
	}
	
	push() {
		this._matrixHistory.push(this.matrix.copy());
	}
	
	pop() {
		this.matrix = this._matrixHistory.pop();
	}
	
	resetMatrix() {
		this.matrix.set();
	}

}

class MyMatrix3D{
	constructor(a=1,b=0,c=0,d=0,e=1,f=0,g=0,h=0,i=1) {
		this.set(a,b,c,d,e,f,g,h,i);
	}
	
	set(a=1,b=0,c=0,d=0,e=1,f=0,g=0,h=0,i=1) {
		// 3x3 matrix;
		// a b c
		// d e f
		// g h i
		if(a instanceof MyMatrix3D) {
			this.a = a.a;		this.b = a.b;		this.c = a.c;
			this.d = a.d;		this.e = a.e;		this.f = a.f;
			this.g = a.g;		this.h = a.h;		this.i = a.i;
		} else {
			this.a = a;		this.b = b;		this.c = c;
			this.d = d;		this.e = e;		this.f = f;
			this.g = g;		this.h = h;		this.i = i;
		}
	}
		
	mult(ob) {
		// only by 3x3 matrix
		let aa = this.a * ob.a + this.b*ob.d + this.c*ob.g ;
		let bb = this.a * ob.b + this.b*ob.e + this.c*ob.h ;
		let cc = this.a * ob.c + this.b*ob.f + this.c*ob.i ;
		
		let dd = this.d * ob.a + this.e*ob.d + this.f*ob.g ;
		let ee = this.d * ob.b + this.e*ob.e + this.f*ob.h ;
		let ff = this.d * ob.c + this.e*ob.f + this.f*ob.i ;
		
		let gg = this.g * ob.a + this.h*ob.d + this.i*ob.g ;
		let hh = this.g * ob.b + this.h*ob.e + this.i*ob.h ;
		let ii = this.g * ob.c + this.h*ob.f + this.i*ob.i ;
		
		this.a = aa;		this.b = bb;		this.c = cc;
		this.d = dd;		this.e = ee;		this.f = ff;
		this.g = gg;		this.h = hh;		this.i = ii;
	}
	
	copy(){
		return new MyMatrix3D(this.a,this.b,this.c,this.d,this.e,this.f,this.g,this.h,this.i);
	}
	
	console() {
		console.log('===================');
		console.log(`${this.a} ${this.b} ${this.c}`);
		console.log(`${this.d} ${this.e} ${this.f}`);
		console.log(`${this.g} ${this.h} ${this.i}`);
		console.log('===================');
	}
}