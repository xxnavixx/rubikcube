
class BoxA{
	constructor(x=0,y=0,z=0,w,h,d) {
		this.w = w;
		this.h = h;
		this.d = d;
		this.v = [];	
		this.tv = [];
		this.tvTemp = [];
		
		let hw = this.w / 2;
		let hh = this.h / 2;
		let hd = this.d / 2;
		this.tran = new MyTransform3D();
				
		this.v[0] = createVector(-hw,-hh,-hd);
		this.v[1] = createVector(hw,-hh,-hd);
		this.v[2] = createVector(hw,hh,-hd);
		this.v[3] = createVector(-hw,hh,-hd);
		
		this.v[4] = createVector(-hw,-hh,hd);
		this.v[5] = createVector(hw,-hh,hd);
		this.v[6] = createVector(hw,hh,hd);
		this.v[7] = createVector(-hw,hh,hd);
		
		for(let i=0;i<this.v.length;i++) 
			this.tv.push(createVector(0,0,0));
		
		this.translate(x,y,z);		
	}
	
	translate(x=0,y=0,z=0) {
		if(!isNaN(x) || !isNaN(y) || !isNaN(z)) {
						
			this.tx = x;
			this.ty = y;
			this.tz = z;
			
			for(let i=0;i<this.v.length;i++) 
				this.v[i].set(this.v[i].x + this.tx,this.v[i].y+this.ty,this.v[i].z + this.tz);
		}
		return this;
	}
	
	rotateX(rad) {
		this.tran.rotateX(rad);
		return this;
	}
	
	rotateY(rad) {
		this.tran.rotateY(rad);
		return this;
	}
	
	rotateZ(rad) {
		this.tran.rotateZ(rad);
		return this;
	}
	
	transform() {
		for(let i=0;i<this.v.length;i++) {
			let rr = this.tran.transform(this.v[i].x,this.v[i].y,this.v[i].z);
			this.tv[i].set(rr.x,rr.y,rr.z);
		}
	}
		
	draw(){
		
		this.transform();
		
		let offset = 0; // to move texture crop point
		texture(img);
		beginShape();
		vertex(this.tv[0].x,this.tv[0].y,this.tv[0].z,0+offset,0+offset);
		vertex(this.tv[1].x,this.tv[1].y,this.tv[1].z,this.w+offset,0+offset);
		vertex(this.tv[2].x,this.tv[2].y,this.tv[2].z,this.w+offset,this.h+offset);
		vertex(this.tv[3].x,this.tv[3].y,this.tv[3].z,0+offset,this.h+offset);
		endShape(CLOSE);
		
		offset += 200;
		beginShape();
		vertex(this.tv[4].x,this.tv[4].y,this.tv[4].z,0+offset,0+offset);
		vertex(this.tv[5].x,this.tv[5].y,this.tv[5].z,this.w+offset,0+offset);
		vertex(this.tv[6].x,this.tv[6].y,this.tv[6].z,this.w+offset,this.h+offset);
		vertex(this.tv[7].x,this.tv[7].y,this.tv[7].z,0+offset,this.h+offset);
		endShape(CLOSE);
		offset+=200;
		beginShape();
		vertex(this.tv[1].x,this.tv[1].y,this.tv[1].z,0+offset,0+offset);
		vertex(this.tv[2].x,this.tv[2].y,this.tv[2].z,this.w+offset,0+offset);
		vertex(this.tv[6].x,this.tv[6].y,this.tv[6].z,this.w+offset,this.h+offset);
		vertex(this.tv[5].x,this.tv[5].y,this.tv[5].z,0+offset,this.h+offset);
		endShape(CLOSE);
		offset+=200;
		beginShape();
		vertex(this.tv[0].x,this.tv[0].y,this.tv[0].z,0+offset,0+offset);
		vertex(this.tv[1].x,this.tv[1].y,this.tv[1].z,this.w+offset,0+offset);
		vertex(this.tv[5].x,this.tv[5].y,this.tv[5].z,this.w+offset,this.h+offset);
		vertex(this.tv[4].x,this.tv[4].y,this.tv[4].z,0+offset,this.h+offset);
		endShape(CLOSE);
		offset+=200;
		beginShape();
		vertex(this.tv[3].x,this.tv[3].y,this.tv[3].z,0+offset,0+offset);
		vertex(this.tv[2].x,this.tv[2].y,this.tv[2].z,this.w+offset,0+offset);
		vertex(this.tv[6].x,this.tv[6].y,this.tv[6].z,this.w+offset,this.h+offset);
		vertex(this.tv[7].x,this.tv[7].y,this.tv[7].z,0+offset,this.h+offset);
		endShape(CLOSE);
		offset+=200;
		beginShape();
		vertex(this.tv[0].x,this.tv[0].y,this.tv[0].z,0+offset,0+offset);
		vertex(this.tv[3].x,this.tv[3].y,this.tv[3].z,this.w+offset,0+offset);
		vertex(this.tv[7].x,this.tv[7].y,this.tv[7].z,this.w+offset,this.h+offset);
		vertex(this.tv[4].x,this.tv[4].y,this.tv[4].z,0+offset,this.h+offset);
		endShape(CLOSE);
		
	}
}















