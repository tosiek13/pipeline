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

function Arc(XBeg, YBeg, XEnd, YEnd){
    this.xCenter;
    this.yCenter;
    this.angleBeg;
    this.angleEnd;
    this.radius;

    this.initilize(XBeg, YBeg, XEnd, YEnd);
}

Arc.prototype.draw = function(self, animator){
    alert("drawing right arc");
    if (animator.percent <= 1){
        animator.ctx = animator.canvas.getContext("2d");
        animator.ctx.beginPath();
        
        alert("xCenter = " + self.xCenter + ", yCenter = " + self.yCenter + ", radious = " + self.radius + ", angleBeg = " + self.angleBeg + ", angleEnd = " + self.angleEnd);
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

/*Works for ++*/
/*Arc.prototype.draw = function(self, animator){
    alert("drawing right arc");
    if (animator.percent <= 1){
        animator.ctx = animator.canvas.getContext("2d");
        animator.ctx.beginPath();
        
        alert("xCenter = " + self.xCenter + ", yCenter = " + self.yCenter + ", radious = " + self.radius + ", angleBeg = " + self.angleBeg + ", angleEnd = " + self.angleEnd);
        animator.ctx.arc(self.xCenter, self.yCenter, self.radius, self.angleBeg, self.angleBeg + (Math.PI/2 * animator.percent));
        animator.ctx.lineWidth = self.width;
        animator.ctx.strokeStyle = self.color;
        animator.ctx.stroke();
        animator.percent += animator.step;
    }else{
        animator.endPainting(animator);
    }
}*/

/*Arc.prototype.draw = function(self, animator){
    alert("drawing arc")
    if (animator.percent <= 1){
        animator.ctx = animator.canvas.getContext("2d");
        animator.ctx.beginPath();
        
        alert("xCenter = " + self.xCenter + ", yCenter = " + self.yCenter + ", radious = " + self.radius + ", angleBeg = " + self.angleBeg + ", angleEnd = " + self.angleEnd);
        animator.ctx.arc(self.xCenter, self.yCenter, self.radius, self.angleBeg, self.angleEnd * animator.percent);
        //animator.ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        animator.ctx.lineWidth = self.width;
        animator.ctx.strokeStyle = self.color;
        animator.ctx.stroke();
        animator.percent += animator.step;
    }else{
        animator.endPainting(animator);
    }
}*/

Arc.prototype.initilize = function(XBeg, YBeg, XEnd, YEnd){
    alert("initialization !!!!!!!!!!!! of Arc");
    var XDiff = XEnd - XBeg;
    var YDiff = YEnd - YBeg;
    var centerCoor;
    alert("XBeg = " + XBeg + ", YBeg = " + YBeg);
    alert("XDiff = " + XDiff + ", Y Diff = " + YDiff);
    if( XBeg%2 == 0){
        centerCoor = nodeToPixels(XBeg, YBeg + YDiff);
        alert("XCenter = " + XBeg + ", Y center = " + (YBeg + YDiff));
    }else{
        centerCoor = nodeToPixels(XBeg + XDiff, YBeg);
        alert("XCenter = " + (XBeg + XDiff) + ", Y center = " + YBeg);
    }

    this.xCenter = centerCoor.X;
    this.yCenter = centerCoor.Y;
    alert("xCenter = " + this.xCenter + ", y center = " + this.yCenter);

    //Setting angles
    var anglePB;
    var anglePE;    //{0, 0,5, 1, 2}
    if( (XBeg%2 == 0 && (XDiff == YDiff)) || (XBeg%2 != 0 && (XDiff != YDiff))){     //Gdy obrót do przodu
        alert("Arc ++ sign");
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
        alert("Arc -- sign");
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

/*function Arc(XBeg, YBeg, XEnd, YEnd){
    var begCoor = nodeToPixels(XBeg, YBeg);
    this.xBeg = begCoor.X;
    this.yBeg = begCoor.Y;

    this.xCenter;
    this.yCenter;
    this.xEnd;
    this.yEnd;
    this.radius = board.getFieldHeight();

    this.initilize(XBeg, YBeg, XEnd, YEnd);
}

Arc.prototype.draw = function(self, animator){
    alert("drawing arc")
    if (animator.percent <= 1){
        animator.ctx = animator.canvas.getContext("2d");
        animator.ctx.beginPath();
        
        animator.ctx.moveTo(this.xBeg, this.yBeg);
        animator.ctx.arcTo(this.xCenter, this.yCenter, this.xEnd, this.yEnd, this.radius);

        animator.ctx.lineWidth = self.width;
        animator.ctx.strokeStyle = self.color;
        animator.ctx.stroke();
        animator.percent += animator.step;
    }else{
        animator.endPainting(animator);
    }
}

Arc.prototype.initilize = function(XBeg, YBeg, XEnd, YEnd){
    //Setting center
    var XDiff;
    var YDiff;
    if( XBeg%2 == 0){
        XDiff = XEnd - XBeg;
        YDiff = 0;
    }else{
        XDiff = 0;
        YDiff = YEnd - YBeg;
    }
    var centerCoor = nodeToPixels(XBeg + XDiff, YBeg + YDiff);
    this.xCenter = centerCoor.X;
    this.yCenter = centerCoor.Y;

    //SettingEnd
    var endCoor = nodeToPixels(XEnd, YEnd);
    this.xEnd = endCoor.X;
    this.yEnd = endCoor.Y;
}*/

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