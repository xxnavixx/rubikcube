class MyMatrix {
	constructor(size) {
		this.e = [];
		this.temp = [];
		if(isNaN(size)) this.size = 3;
		else this.size = size | 0;
	}
	
	set(ob) {
		let source;
		if(ob instanceof Array) source = ob;
		else source = arguments
			
		for(let i=0;i<source.length;i++){
			this.e[i] = source[i];
		}
		
	}
	
	rotate() {
		//clock wise
		let index,index2;
		for(let i=0;i<this.size;i++){
			for(let j=0;j<this.size;j++){
				index = i*this.size + j;
				index2 = j*this.size + (this.size-i-1);
				this.temp[index2] = this.e[index];
			}
			
		}
		for(let i=0;i<this.e.length;i++) this.e[i] = this.temp[i];
	}
	
	rotate2() {
		//counter clock wise
		let index,index2;
		for(let i=0;i<this.size;i++){
			for(let j=0;j<this.size;j++){
				index = i*this.size + j;
				index2 = (this.size-j-1)*this.size + i;
				this.temp[index2] = this.e[index];
			}
			
		}
		for(let i=0;i<this.e.length;i++) this.e[i] = this.temp[i];
	}
	
	draw() {
		
	}
	
	console() {
		let str;
		console.log('--------------');
		for(let i=0;i<this.size;i++){
			str = '| ';
			for(let j=0;j<this.size;j++){
				str+= this.e[i*this.size+j]+' ';
			}
			console.log(str+'|');
		}
		console.log('--------------');
	}
}