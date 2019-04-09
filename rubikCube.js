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
		this.cubesInitial = [];
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
					
					let temp = new BoxB(x,y,z,boxSize,boxSize,boxSize);
					this.cubes.push(temp);
					this.cubesInitial.push(temp);
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
	
	/*
		after applying matrix transfrom. 9 selected cubes change its x,y,z coordinate.
		but its position in array remain same.
		this cause problem next turn because what u see as selected is not what actually selected in array.
		so we need to rearrange array element according to matrix transformation. that's why i needed 'swap' functions.
	
	*/
	
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
		// this.swapSelectionL_sub();

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
		// this.swapSelectionR_sub();
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
		// clock wise
		this._rotateSub(axis,column,-1);
	}
	
	rotateL(axis,column) {
		// counter clock wise
		this._rotateSub(axis,column,1);
	}
	
	_rotateSub(axis,column,factor=1) {
		if(column < 0 || column > this.size-1 ) {console.log('index out of range');return;}
		if(this.onTransition) return;
		this.rotationAxis = axis;
		this.column = column;
		this.rotationVector = this.rotationSpeed * factor;
		this.rotationTotal = this.rotationMax * factor;
		this.select(axis,column);
		
		if(!this.animation){
			this.rotateSelection(this.rotationTotal);
			if(this.rotationVector>0) 
				this.swapSelectionL();
			else 
				this.swapSelectionR();
			
			this.mergeSelection();				
		} else {
			this.onTransition = true;
			for(let item of this.selection) 
				item.tran.push();	
		}
	}
	
	rotateSelection(rad) {
		for(let item of this.selection){
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
	}

	draw() {
		if(this.animation  && this.onTransition){
			if(abs(this.rotatedAngle) < this.rotationMax){

				this.rotateSelection(this.rotationVector);
				this.rotatedAngle += this.rotationVector;
			} else {
				for(let item of this.selection) 
					item.tran.pop();
				
				this.rotateSelection(this.rotationTotal);
								
				if(this.rotationVector>0)
					this.swapSelectionL();
				else
					this.swapSelectionR();
				
				this.mergeSelection();		
				
				this.onTransition = false;
				this.rotatedAngle = 0;
			}
		}
		
		for(let item of this.cubes) item.draw();
	}
	
	check() {
		for(let i=0;i<this.cubes.length;i++){
			if(this.cubes[i] !== this.cubesInitial[i]) return false;
		}
		return true;
	}
}




