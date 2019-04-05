class RubikCube {
	constructor(size,boxSize,gap) {
		
		//------------u modify these---------------
		this.rotationSpeed=0.03;
		this.animation = true;
		//-----------------------------------------
		
		this.rotationMax=HALF_PI;
		this.rotatedAngle=0;
		this.rotationDirection;
		
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
		// console.log(halfLength);
		for(let k=0;k<size;k++){
			for(let i=0;i<size;i++){
				for(let j=0;j<size;j++){
					let x = j*(boxSize+gap) - halfLength + boxSize/2;
					let y = i*(boxSize+gap) - halfLength + boxSize/2;
					let z = k*(boxSize+gap) - halfLength + boxSize/2;
					// console.log(x,y,z,boxSize,gap);
					this.cubes.push(new BoxA(x,y,z,boxSize,boxSize,boxSize));
				}
			}
		}
	}
	
	select(axis,column) {
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
	
	swapArrayL() {
		switch(this.rotationAxis){
			case 'x':
			case 'z':
				this.selectionSwapL();
				break;
			case 'y':
				this.selectionSwapR();
				break;
		}
		this.mergeSelection();		
		// let counter = 0,index;
		// for(let i=0;i<this.size;i++){
			// for(let j=0;j<this.size;j++){
				// switch(this.rotationAxis) {
					// case 'x':
						// index = i * this.size2 + j * this.size + this.column;
						// break;
					// case 'y':
						// index = i * this.size2 + this.column * this.size + j;
						// break;
					// case 'z':
						// index = this.column * this.size2 + i * this.size + j;
						// break;
					// default:
						// index = 0 * this.size2 + i * this.size + j; // z axis 0 column
						// break;
				// }
				// this.cubes[index] = this.selection[counter++];
			// }
		// }
		
	}
	
	swapArrayR() {
		switch(this.rotationAxis){
			case 'x':
			case 'z':
				this.selectionSwapR();
				break;
			case 'y':
				this.selectionSwapL();
				break;
		}
		this.mergeSelection();
		// let counter = 0,index;
		// for(let i=0;i<this.size;i++){
			// for(let j=0;j<this.size;j++){
				// switch(this.rotationAxis) {
					// case 'x':
						// index = i * this.size2 + j * this.size + this.column;
						// break;
					// case 'y':
						// index = i * this.size2 + this.column * this.size + j;
						// break;
					// case 'z':
						// index = this.column * this.size2 + i * this.size + j;
						// break;
					// default:
						// index = 0 * this.size2 + i * this.size + j; // z axis 0 column
						// break;
				// }
				// this.cubes[index] = this.selection[counter++];
				
			// }
			
		// }
		
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
	
	
	selectionSwapR() {
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
	
	selectionSwapL() {
		//counter clock wise
		let index,index2;
		for(let i=0;i<this.size;i++){
			for(let j=0;j<this.size;j++){
				index = i*this.size + j;
				index2 = (this.size-j-1)*this.size + i;
				this.selectionTemp[index2] = this.selection[index];
			}
			
		}
		console.log('selection length : ',this.selection.length);
		for(let i=0;i<this.selection.length;i++) this.selection[i] = this.selectionTemp[i];
	}
	
	rotateR(axis,column) {
		//clock wise
		if(!this.animation){
			this.rotationAxis = axis;
			this.column = column;
			rotateInstant(-HALF_PI);
		} else {
			if(this.onTransition) return;
			this.onTransition = true;
			this.rotationAxis = axis;
			this.column = column;
			this.select(axis,column);
			for(let item of this.selection) {
				item.tran.push();	
			}
		}
	}
	
	rotateL(axis,column) {
		// counter clock wise
		if(!this.animation){
			this.rotationAxis = axis;
			this.column = column;
			rotateInstant(HALF_PI);
		} else {
			if(this.onTransition) return;
			this.onTransition = true;
			this.rotationAxis = axis;
			this.column = column;
			this.select(axis,column);
			for(let item of this.selection) {
				item.tran.push();	
			}
		}
	}
	
	rotateInstant(rad) {
		switch(this.rotationAxis){
			case 'x':
				item.rotateX(rad);
				break;
			case 'y':
				item.rotateY(rad);
				break;
			case 'z':
				item.rotateZ(rad);
				break;
		}
	}

	draw() {
		if(this.animation  && this.onTransition){
			if(this.rotatedAngle < this.rotationMax){
				for(let item of this.selection) {
					switch(this.rotationAxis) {
						case 'x':
							item.rotateX(this.rotationSpeed);
							break;
						case 'y':
							item.rotateY(this.rotationSpeed);
							break;
						case 'z':
							item.rotateZ(this.rotationSpeed);
							break;
					}
					
				}
				this.rotatedAngle += this.rotationSpeed;
			} else {
				for(let item of this.selection) {
					item.tran.pop();
					
					switch(this.rotationAxis){
						case 'x':
							item.rotateX(HALF_PI);
							break;
						case 'y':
							item.rotateY(HALF_PI);
							break;
						case 'z':
							item.rotateZ(HALF_PI);
							break;
					}
					
				}
				this.onTransition = false;
				this.rotatedAngle = 0;
				this.swapArrayL();
				
			}
		}
		
		for(let item of this.cubes) item.draw();
	}
}