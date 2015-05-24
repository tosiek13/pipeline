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
        animator.ctx.strokeStyle = animator.color;
        animator.ctx.stroke();
        animator.percent += animator.step;
    }else{
        animator.endPainting(animator);
    }
}

function Arc(XBeg, YBeg, XEnd, YEnd, color, width){
    this.xCenter;
    this.yCenter;
    this.angleBeg;
    this.angleEnd;
    this.radius;
    this.color = color;
    this.width = width;

    this.initilize(XBeg, YBeg, XEnd, YEnd);
}

Arc.prototype.draw = function(self, animator){
    if (animator.percent <= 1){
        animator.ctx = animator.canvas.getContext("2d");
        animator.ctx.beginPath();
        animator.ctx.strokeStyle = animator.color;
        
        if( self.angleBeg > self.angleEnd){
            animator.ctx.arc(self.xCenter, self.yCenter, self.radius, self.angleBeg - (Math.PI/2 * animator.percent),  self.angleBeg);
        }else{
            animator.ctx.arc(self.xCenter, self.yCenter, self.radius, self.angleBeg, self.angleBeg + (Math.PI/2 * animator.percent));
        }
        animator.ctx.lineWidth = self.width;
        animator.ctx.strokeStyle = self.color;
        animator.ctx.stroke();
        animator.percent += animator.step;
    }else{
        animator.endPainting(animator);
    }
}

Arc.prototype.initilize = function(XBeg, YBeg, XEnd, YEnd){
    var XDiff = XEnd - XBeg;
    var YDiff = YEnd - YBeg;
    var centerCoor;

    if( XBeg%2 == 0){
        centerCoor = nodeToPixels(XBeg, YBeg + YDiff);
    }else{
        centerCoor = nodeToPixels(XBeg + XDiff, YBeg);
    }

    this.xCenter = centerCoor.X;
    this.yCenter = centerCoor.Y;

    //Setting angles
    var anglePB;
    var anglePE;    //{0, 0,5, 1, 2}
    if( (XBeg%2 == 0 && (XDiff == YDiff)) || (XBeg%2 != 0 && (XDiff != YDiff))){     //Gdy obrót do przodu
        if( XDiff < 0 && YDiff > 0){
            anglePB = 0;
            anglePE = 0.5;
        }else if(XDiff < 0 && YDiff < 0){
            anglePB = 0.5;
            anglePE = 1;
        }else if(XDiff > 0 && YDiff < 0){
            anglePB = 1;
            anglePE = 1.5;
        }else if(XDiff > 0 && YDiff > 0){
            anglePB = 1.5;
            anglePE = 2;
        }

    }else{
        if( XDiff < 0 && YDiff < 0){
            anglePB = 2;
            anglePE = 1.5;
        }else if(XDiff < 0 && YDiff > 0){
            anglePB = 1.5;
            anglePE = 1;
        }else if(XDiff > 0 && YDiff > 0){
            anglePB = 1;
            anglePE = 0.5;
        }else if(XDiff > 0 && YDiff < 0){
            anglePB = 0.5;
            anglePE = 0;
        }
    }

    this.angleBeg = anglePB * Math.PI;
    this.angleEnd = anglePE * Math.PI;

    this.radius = board.getFieldHeight() / 2;
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
    clearInterval(obj.interClear);
}