
class BoxB extends BoxA {
	constructor(x=0,y=0,z=0,w,h,d) {
		super(x,y,z,w,h,d);
		this.setTexture(imgTop,imgBottom,imgFront,imgBack,imgLeft,imgRight);
	}
	
	setTexture(top,bottom,front,back,left,right){
		this.textureTop = top;
		this.textureBottom = bottom;
		this.textureFront = front;
		this.textureBack = back;
		this.textureLeft = left;
		this.textureRight = right;
	}
	
	draw(){
		
		this.transform();
		
		texture(this.textureTop);
		beginShape();
		vertex(this.tv[4].x,this.tv[4].y,this.tv[4].z,0,0);
		vertex(this.tv[5].x,this.tv[5].y,this.tv[5].z,this.w,0);
		vertex(this.tv[6].x,this.tv[6].y,this.tv[6].z,this.w,this.h);
		vertex(this.tv[7].x,this.tv[7].y,this.tv[7].z,0,this.h);
		endShape(CLOSE);
		
		texture(this.textureBottom);		
		beginShape();
		vertex(this.tv[0].x,this.tv[0].y,this.tv[0].z,0,0);
		vertex(this.tv[1].x,this.tv[1].y,this.tv[1].z,this.w,0);
		vertex(this.tv[2].x,this.tv[2].y,this.tv[2].z,this.w,this.h);
		vertex(this.tv[3].x,this.tv[3].y,this.tv[3].z,0,this.h);
		endShape(CLOSE);
				
		texture(this.textureFront);
		beginShape();
		vertex(this.tv[7].x,this.tv[7].y,this.tv[7].z,0,0);
		vertex(this.tv[6].x,this.tv[6].y,this.tv[6].z,this.w,0);
		vertex(this.tv[2].x,this.tv[2].y,this.tv[2].z,this.w,this.h);
		vertex(this.tv[3].x,this.tv[3].y,this.tv[3].z,0,this.h);
		endShape(CLOSE);		
		
		texture(this.textureBack);
		beginShape();
		vertex(this.tv[0].x,this.tv[0].y,this.tv[0].z,0,0);
		vertex(this.tv[1].x,this.tv[1].y,this.tv[1].z,this.w,0);
		vertex(this.tv[5].x,this.tv[5].y,this.tv[5].z,this.w,this.h);
		vertex(this.tv[4].x,this.tv[4].y,this.tv[4].z,0,this.h);
		endShape(CLOSE);
				
		texture(this.textureLeft);
		beginShape();
		vertex(this.tv[0].x,this.tv[0].y,this.tv[0].z,0,0);
		vertex(this.tv[3].x,this.tv[3].y,this.tv[3].z,this.w,0);
		vertex(this.tv[7].x,this.tv[7].y,this.tv[7].z,this.w,this.h);
		vertex(this.tv[4].x,this.tv[4].y,this.tv[4].z,0,this.h);
		endShape(CLOSE);
		
		texture(this.textureRight);
		beginShape();
		vertex(this.tv[5].x,this.tv[5].y,this.tv[5].z,0,0);
		vertex(this.tv[6].x,this.tv[6].y,this.tv[6].z,this.w,0);
		vertex(this.tv[2].x,this.tv[2].y,this.tv[2].z,this.w,this.h);
		vertex(this.tv[1].x,this.tv[1].y,this.tv[1].z,0,this.h);
		endShape(CLOSE);
	}
}

class BoxX extends BoxB {
	constructor(position=300) {
		super(position,0,0,40,40,40);
		this.setTexture(imgX,imgX,imgX,imgX,imgX,imgX);
	}
	
	draw(){
		push();
		scale(0.5);
		super.draw();
		pop();
	}
}

class BoxY extends BoxB {
	constructor(position=300) {
		super(0,position,0,40,40,40);
		this.setTexture(imgY,imgY,imgY,imgY,imgY,imgY);
	}
	
	draw(){
		push();
		scale(0.5);
		super.draw();
		pop();
	}
}

class BoxZ extends BoxB {
	constructor(position=300) {
		super(0,0,position,40,40,40);
		this.setTexture(imgZ,imgZ,imgZ,imgZ,imgZ,imgZ);
	}
	
	draw(){
		push();
		scale(0.5);
		super.draw();
		pop();
	}
}














