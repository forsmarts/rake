// Object which controls drag/drop

var cRakeDragController = function(canvas, cell) {
  this.MOVE_LIMIT = 0.7;

  this.sourceCell = cell;
  this.canvas = canvas;
  this.puzzle = this.canvas.puzzle;
  this.touchStart_x = 0;
  this.touchStart_y = 0;
}

cRakeDragController.prototype.dragMove = function (dx, dy) {
    var targetCell;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > this.canvas.cellSize * this.MOVE_LIMIT) {
        var i = this.sourceCell.column + Math.sign(dx);
        if (this.puzzle.isToroidal) {
            i = i >= this.puzzle.gridXSize ? 0 : i < 0 ? this.puzzle.gridXSize - 1 : i;
        }
        if (i >= 0 && i < this.puzzle.gridXSize) {
            targetCell = this.puzzle.cells[this.sourceCell.row][i];
        }
    }
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > this.canvas.cellSize * this.MOVE_LIMIT) {
        var j = this.sourceCell.row + Math.sign(dy);
        if (this.puzzle.isToroidal) {
            j = j >= this.puzzle.gridYSize ? 0 : j < 0 ? this.puzzle.gridYSize - 1 : j;
        }
        if (j >= 0 && j < this.puzzle.gridYSize) {
            targetCell = this.puzzle.cells[j][this.sourceCell.column];
        }
    }
    if (!targetCell) {
        // Animate drag
        this.canvas.shiftCell(this.sourceCell, dx, dy);
        return;
    }
    var joinResult = this.puzzle.joinCells(this.sourceCell, targetCell);
    if (joinResult >= 0) {
        // Finish drag to target
        window.removeEventListener("touchmove", this.onMove);
        this.canvas.detachEvents(this.sourceCell);
        setTimeout(() => {
            this.canvas.reRender();
            if (this.puzzle.isSolved()) {
                this.canvas.markSolved();
            }
        }, joinResult);
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
    drag = this;
    this.onMove = function(event){drag.touchMove(event);};
    window.addEventListener("touchmove", this.onMove, {passive: false});
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
    window.removeEventListener("touchmove", this.onMove);
    if(event.cancelable)
	event.preventDefault();
    event.stopPropagation();
    this.dragStop();
    this.touchStart_x = 0;
    this.touchStart_y = 0;
}

