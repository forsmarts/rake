// Object which controls drag/drop

var cRakeDragController = function(canvas, cell) {
  this.MOVE_LIMIT = 0.75;

  this.sourceCell = cell;
  this.canvas = canvas;
  this.puzzle = this.canvas.puzzle;
  this.touchStart_x = 0;
  this.touchStart_y = 0;
}

cRakeDragController.prototype.dragMove = function (dx, dy) {
    var targetCell;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > this.canvas.cellSize * this.MOVE_LIMIT) {
        targetCell = this.puzzle.cells[this.sourceCell.row][this.sourceCell.column + Math.sign(dx)];
    }
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > this.canvas.cellSize * this.MOVE_LIMIT) {
        targetCell = this.puzzle.cells[this.sourceCell.row + Math.sign(dy)][this.sourceCell.column];
    }
    if (!targetCell) {
        // Animate drag
        return this.canvas.shiftCell(this.sourceCell, dx, dy);
    }
    if (this.puzzle.joinCells(this.sourceCell, targetCell)) {
        // Finish drag to target
        this.canvas.detachEvents(this.sourceCell);
        this.canvas.reRender();
        if (this.puzzle.isSolved()) {
            this.canvas.markSolved();
        }
    }   
} 

cRakeDragController.prototype.touchMove = function(event) {
    if(event.cancelable)
	event.preventDefault();
    event.stopPropagation();
    cx = event.targetTouches.item(0).clientX - this.touchStart_x;
    cy = event.targetTouches.item(0).clientY - this.touchStart_y;
    this.dragMove(cx, cy);
}


cRakeDragController.prototype.dragStart = function () {
}


cRakeDragController.prototype.touchStart = function (event) {
    if(event.cancelable)
	event.preventDefault();
    event.stopPropagation();
    this.dragStart();
    this.touchStart_x = event.targetTouches.item(0).clientX;
    this.touchStart_y = event.targetTouches.item(0).clientY;
}


cRakeDragController.prototype.dragStop = function () {
    var position = this.canvas.position(this.sourceCell);
    this.sourceCell.element.attr('x', position.x);
    this.sourceCell.element.attr('y', position.y);
}

cRakeDragController.prototype.touchStop = function(event) {
    if(event.cancelable)
	event.preventDefault();
    event.stopPropagation();
    this.dragStop();
    this.touchStart_x = 0;
    this.touchStart_y = 0;
    console.log('touchStop 2', event.cancelable)
}

