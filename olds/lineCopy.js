//Identifying canvas element
var c = document.getElementById("canvas");
//Retrieves the context to be drawn or null if not 
//supported by the browser
var ctx = c.getContext("2d");
//Assigning squareClick() function to click on canvas
c.addEventListener("click", click);

//var percentage = 0;
//var myVar;
function click(e){
    //var line = new Line(0, 0, 100, 100);
    //var animation = new Animation(2000, 40);
    //animation.animate(ctx, line);
    //myVar = setInterval(function(){ paint() }, 500);
    //var anim = new Animation();
    

    /*obj = new Simple();
    alert(obj.myValue);
    modify.call(obj);
    alert(obj.info());*/
    obj = new Compolex();
    //Modfikuje element klasy obj przekazany do animation. - dowód
    /*setTimeout(function(){ alert('mY' + obj.doSth()); }, 3000);
    setTimeout(function(){ alert('mY' + obj.doSth()); }, 3000);
    setTimeout(function(){ alert('mY' + obj.doSth()); }, 3000);*/
}

function Compolex(){
    //var com = this;
    this.myValue = 1000;
    this.doSth = function(){
        return this.myValue;
    };
    this.end = function(){
        alert("ending");
        clearInterval(this.sth);
    };
    this.sth = setInterval(animation, 1000, this);
}

function animation(obj){
    alert(obj.myValue);
    obj.myValue = obj.myValue - 1;
    if(obj.myValue < 998){
        obj.end();
    }
};

/*function fin(){
    this.doSth();
}*/

///////  Calling function from other obj function invoked in interval ///////////
/*
function Compolex(){
    //var com = this;
    this.myValue = 1000;
    this.doSth = function(){
        alert(this.myValue);
    };
    var sth = setInterval(animation, 1000, this);
}

function animation(obj){
    alert(obj.myValue);
    obj.myValue = obj.myValue - 1;
};*/

///////Passing context to object function and callint the value.
/*function Compolex(){
    //var com = this;
    this.myValue = 1000;
    var sth = setInterval(animation, 1000, this);
}

function animation(obj){
    alert(obj.myValue);
};*/



////////// Przekazywanie do funkcji kontekstu /////////////////
function Simple(){
    this.myValue = 1000;
}

Simple.prototype.info = function(){
    this.other();
    return this.myValue;
};

Simple.prototype.other = function(){
    alert("oder" + this.myValue);
};

function modify(){
    alert(this.myValue);
    this.myValue = 10;
}


//////////////////////////


function Animation(){
    this.interval = 500;
    this.percent = 0;
    this.myVar = setInterval(paint, 500, this);
}

Animation.prototype.stopPainting = function(obj) {
    clearInterval(obj.myVar);
}

function paint() {
    alert(this.percentage)
    if(this.percentage < 100){
        this.percentage+=40;
        alert(this.percentage);
    }else{
        alert("End");
        clearInterval(this.myVar);
    }
}


 
/*function stopPainting() {
  clearInterval(myVar);
}*/

function Line(xBeg, yBeg, xEnd, yEnd, color){
    this.xBeg = xBeg;
    this.xEnd = xEnd;
    this.yBeg = yBeg;
    this.yEnd = yEnd;
    this.color = color;
}

Line.prototype.draw = function(ctx, percent) {
    if (percent < 100){
        ctx.beginPath();
        ctx.moveTo(this.xBeg, this.yBeg);
        ctx.lineTo(this.xEnd * percent, this.yEnd * percent);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        draw(ctx, percent+1);
    }
}

/*function Animation(time_ms, stills){
    this.time_ms = time_ms;
    this.stills = stills;
    this.interval = time_ms / stills;
    this.percent = 0;
}



Animation.prototype.animate = function(ctx, objToDraw) {
    setTimeout(function(){ objToDraw.draw(ctx, this.percent) }, 100);
}*/