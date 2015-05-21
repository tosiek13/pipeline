//Assigning squareClick() function to click on canvas
//boardCanvas.addEventListener("click", drawAnimation);

/*function drawAnimation(e){
    var canvas = document.getElementById("board");
    var line = new Line(0, 0, 100, 100,'blue', 2);
    var animation = new Animation(canvas, line, 2000, 30);
}*/

/*
* Klasa opisująca linię i pozwalająca ją narysować.
*/
function Line(xBeg, yBeg, xMove, yMove, color, width){
    this.xBeg = xBeg;
    this.yBeg = yBeg;
    this.xMove = xMove;
    this.yMove = yMove;
    this.color = color;
    this.width = width;
}

/* Rysuje linię, pod nadzorem animatora, który kontroluje postęp rysowania, oraz udostępnia interfejs do zakończenia operacji. */
Line.prototype.draw = function(self, animator) {
    if (animator.percent <= 1){
        animator.ctx = animator.canvas.getContext("2d");
        animator.ctx.beginPath();
        animator.ctx.moveTo(self.xBeg, self.yBeg);
        animator.ctx.lineTo(self.xMove * animator.percent + self.xBeg, self.yMove * animator.percent + self.yBeg);
        animator.ctx.lineWidth = self.width;
        animator.ctx.strokeStyle = self.color;
        animator.ctx.stroke();
        animator.percent += animator.step;
    }else{
        animator.endPainting(animator);
    }
}

/*** Klasa nadzorująca animację.
* Utworzenie obiektu jest równoważne z rozpoczęciem animacji.
* Jako parametr przyjmuje ona obiekt z metodą rysującą, porządany czas trwania animacji oraz ilość klatek na sekundę.
**/
function Animation(canvas, toAnimate, time_ms, fps, stream){
    this.canvas = canvas;
    this.ctx;
    this.toAnimate = toAnimate;
    this.allFrames = fps * time_ms / 1000;
    this.interval = 1 / fps * 1000;
    this.step = 1 / this.allFrames;
    this.percent = 0;  
    this.stream = stream;                       //Wartość (0,1] - postęp animacji w kolejnych krokach
    this.interClear = setInterval(toAnimate.draw, this.interval, this.toAnimate, this);
}

Animation.prototype.endPainting = function(obj) {
    obj.stream.changeField();
    clearInterval(obj.interClear);
}