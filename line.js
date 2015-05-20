//Identifying canvas element
var c = document.getElementById("canvas");
//Retrieves the context to be drawn or null if not 
//supported by the browser
var ctx = c.getContext("2d");
//Assigning squareClick() function to click on canvas
c.addEventListener("click", click);

function click(e){
   
    var line = new Line(0,0,100,100,'blue', 2);
    var animation = new Animation(line, 2000, 30);
}

/*
* Klasa opisująca linię i pozwalająca ją narysować.
*/
function Line(xBeg, yBeg, xEnd, yEnd, color, width){
    this.xBeg = xBeg;
    this.xEnd = xEnd;
    this.yBeg = yBeg;
    this.yEnd = yEnd;
    this.color = color;
    this.width = width;
}

/* Rysuje linię, pod nadzorem animatora, który kontroluje postęp rysowania, oraz udostępnia interfejs do zakończenia operacji. */
Line.prototype.draw = function(self, animator) {
    if (animator.percent <= 1){
        ctx.beginPath();
        ctx.moveTo(self.xBeg, self.yBeg);
        ctx.lineTo(self.xEnd * animator.percent, self.yEnd * animator.percent);
        ctx.lineWidth = self.width;
        ctx.strokeStyle = self.color;
        ctx.stroke();
        animator.percent += animator.step;
    }else{
        animator.endPainting(animator);
    }
}

/*** Klasa nadzorująca animację.
* Utworzenie obiektu jest równoważne z rozpoczęciem animacji.
* Jako parametr przyjmuje ona obiekt z metodą rysującą, porządany czas trwania animacji oraz ilość klatek na sekundę.
**/
function Animation(toAnimate, time_ms, fps){
    this.toAnimate = toAnimate;
    this.allFrames = fps * time_ms / 1000;
    this.interval = 1 / fps * 1000;
    this.step = 1 / this.allFrames;
    this.percent = 0;                         //Wartość (0,1] - postęp animacji w kolejnych krokach
    this.interClear = setInterval(toAnimate.draw, this.interval, this.toAnimate, this);
}

Animation.prototype.endPainting = function(obj) {
    clearInterval(obj.interClear);
}