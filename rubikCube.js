class RubikCube {
	constructor(size,boxSize,gap) {
		
		//------------u modify these---------------
		this.rotationSpeed=0.03;
		this.animation = true;
		//-----------------------------------------
		
		this.rotationSpeed = abs(this.rotationSpeed);
		this.rotationMax=HALF_PI;
		this.rotatedAngle=0;
		
		if(isNaN(size)) return;
		
		this.cubes = [];
		this.size = size | 0;
		this.size2 = size * size;
		this.boxSize=boxSize;
		this.gap = gap;
		this.selection = [];
		this.selectionTemp = [];
		
		this.onTransition = false;
		let halfLength = (boxSize * size + gap*(size-1) )/ 2;
		
		for(let k=0;k<this.size;k++){
			for(let i=0;i<this.size;i++){
				for(let j=0;j<this.size;j++){
					let x = j*(boxSize+gap) - halfLength + this.boxSize/2;
					let y = i*(boxSize+gap) - halfLength + this.boxSize/2;
					let z = k*(boxSize+gap) - halfLength + this.boxSize/2;
					
					this.cubes.push(new BoxA(x,y,z,boxSize,boxSize,boxSize));
				}
			}
		}
	}
	
	select(axis,column) {
		if(column < 0 || column > this.size-1 ) {console.log('index out of range');return;}
		let counter = 0,index;
		for(let i=0;i<this.size;i++){
			for(let j=0;j<this.size;j++){
				switch(axis) {
					case 'x':
						index = i * this.size2 + j * this.size + column;
						break;
					case 'y':
						index = i * this.size2 + column * this.size + j;
						break;
					case 'z':
						index = column * this.size2 + i * this.size + j;
						break;
					default:
						index = 0 * this.size2 + i * this.size + j; // z axis 0 column
						break;
				}
				
				this.selection[counter++] = this.cubes[index];
				
			}
		}
		return this.selection;
	}
			
	mergeSelection() {
		
		let counter = 0,index;
		for(let i=0;i<this.size;i++){
			for(let j=0;j<this.size;j++){
				switch(this.rotationAxis) {
					case 'x':
						index = i * this.size2 + j * this.size + this.column;
						break;
					case 'y':
						index = i * this.size2 + this.column * this.size + j;
						break;
					case 'z':
						index = this.column * this.size2 + i * this.size + j;
						break;
					default:
						index = 0 * this.size2 + i * this.size + j; // z axis 0 column
						break;
				}
				this.cubes[index] = this.selection[counter++];
				
			}
			
		}
	}
	
	swapSelectionL() {
		switch(this.rotationAxis){
			case 'x':
			case 'z':
				this.swapSelectionL_sub();
				break;
			case 'y':
				this.swapSelectionR_sub();
				break;
		}
		

	}
	
	swapSelectionR() {
		switch(this.rotationAxis){
			case 'x':
			case 'z':
				this.swapSelectionR_sub();
				break;
			case 'y':
				this.swapSelectionL_sub();
				break;
		}
		
	}
	
	swapSelectionR_sub(array) {
		//clock wise
		let index,index2;
		for(let i=0;i<this.size;i++){
			for(let j=0;j<this.size;j++){
				index = i*this.size + j;
				index2 = j*this.size + (this.size-i-1);
				this.selectionTemp[index2] = this.selection[index];
			}
		}
		for(let i=0;i<this.selection.length;i++) this.selection[i] = this.selectionTemp[i];
	}
	
	swapSelectionL_sub() {
		//counter clock wise
		let index,index2;
		for(let i=0;i<this.size;i++){
			for(let j=0;j<this.size;j++){
				index = i*this.size + j;
				index2 = (this.size-j-1)*this.size + i;
				this.selectionTemp[index2] = this.selection[index];
			}
		}
		for(let i=0;i<this.selection.length;i++) this.selection[i] = this.selectionTemp[i];
	}
	
	rotateR(axis,column) {
		//clock wise
		if(column < 0 || column > this.size-1 ) {console.log('index out of range');return;}
		if(this.onTransition) return;
		this.rotationAxis = axis;
		this.column = column;
		this.rotationVector = -this.rotationSpeed;
		this.rotationTotal = -this.rotationMax;
		if(!this.animation){
			for(let item of this.selection)
				rotateCube(item,this.rotationTotal);
		} else {
			// if(this.onTransition) return;
			this.onTransition = true;
			// this.rotationAxis = axis;
			// this.column = column;
			this.select(axis,column);
			for(let item of this.selection) {
				item.tran.push();	
			}
		}
	}
	
	rotateL(axis,column) {
		// counter clock wise
		if(column < 0 || column > this.size-1 ) {console.log('index out of range');return;}
		if(this.onTransition) return;
		this.rotationAxis = axis;
		this.column = column;
		this.rotationVector = this.rotationSpeed;
		this.rotationTotal = this.rotationMax;
		
		if(!this.animation){
			for(let item of this.selection)
				rotateCube(item,this.rotationTotal);
		} else {
			// if(this.onTransition) return;
			this.onTransition = true;
			
			this.select(axis,column);
			for(let item of this.selection) {
				item.tran.push();	
			}
		}
	}
	
	rotateCube(cube,rad) {
		switch(this.rotationAxis){
			case 'x':
				cube.rotateX(rad);
				break;
			case 'y':
				cube.rotateY(rad);
				break;
			case 'z':
				cube.rotateZ(rad);
				break;
		}
	}

	draw() {
		if(this.animation  && this.onTransition){
			if(abs(this.rotatedAngle) < this.rotationMax){
				for(let item of this.selection) {
					switch(this.rotationAxis) {
						case 'x':
							item.rotateX(this.rotationVector);
							break;
						case 'y':
							item.rotateY(this.rotationVector);
							break;
						case 'z':
							item.rotateZ(this.rotationVector);
							break;
					}
				}
				this.rotatedAngle += this.rotationVector;
			} else {
				for(let item of this.selection) {
					item.tran.pop();
					
					switch(this.rotationAxis){
						case 'x':
							// item.rotateX(HALF_PI);
							item.rotateX(this.rotationTotal);
							break;
						case 'y':
							item.rotateY(this.rotationTotal);
							break;
						case 'z':
							item.rotateZ(this.rotationTotal);
							break;
					}					
				}
				this.onTransition = false;
				this.rotatedAngle = 0;
				
				if(this.rotationVector>0)
					this.swapSelectionL();
				else
					this.swapSelectionR();
				
				this.mergeSelection();		
			}
		}
		
		for(let item of this.cubes) item.draw();
	}
}