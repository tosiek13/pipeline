function Images(){
	this.code2 = new Image();
	this.code3 = new Image();
	this.code4 = new Image();
	this.code5 = new Image();
	this.code6 = new Image();
	this.code7 = new Image();
}

Images.prototype.load = function(){
	this.code2.src = "images/code2.jpg";
	this.code3.src = "images/code3.jpg";
	this.code4.src = "images/code4.jpg";
	this.code5.src = "images/code5.jpg";
	this.code6.src = "images/code6.jpg";
	this.code7.src = "images/code7.jpg";
}

Images.prototype.getImage = function(code){ 
    switch(code){
        case 2:
            return this.code2;
        case 3:
            return this.code3;
        case 4:
            return this.code4;
        case 5:
        	return this.code5;
        case 6:
        	return this.code6;
        case 7:
        	return this.code7;
    }
}