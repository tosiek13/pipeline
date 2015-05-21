/**** Represents the image in my model. 
** Holds info about beg end end point of the pipe.
** this info is stored in px distance of the midle of element
** from left - top corner of canvas
* @ param code - identify pipe type.
* @ param field - this field pipe will describe.
*
***/
function Pipe(code, field){
	this.xBeg = 1;
	this.xEnd = 1;
	this.yBeg = 1;
	this.yEnd = 1;
}