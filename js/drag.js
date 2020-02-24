// Object which controls drag/drop

cRakeDragController = function(canvas, cell) {
  this.cell = cell;
  this.canvas = canvas;
  this.old_dx = 0;
  this.old_dy = 0;
  this.touchStart_x = 0;
  this.touchStart_y = 0;
}

cRakeDragController.prototype.dragMove = function (dx, dy) {
    var bChange = false;
    var newCell;
    if (Math.abs(dx)>Math.abs(dy)) {
        if (dx - this.old_dx > this.canvas.cellSize / 1.5) {
            newCell = this.canvas.puzzle.cells[this.cell.row][this.cell.column+1];
            bChange = true;
        }
        else if (this.old_dx - dx > this.canvas.cellSize / 1.5) {
            newCell = this.canvas.puzzle.cells[this.cell.row][this.cell.column-1];
            bChange = true;
        }
    }
    else {
        if (dy - this.old_dy > this.canvas.cellSize / 1.5) {
            newCell = this.canvas.puzzle.cells[this.cell.row+1][this.cell.column];
            bChange = true;
        }
        else if (this.old_dy - dy > this.canvas.cellSize / 1.5) {
            newCell = this.canvas.puzzle.cells[this.cell.row-1][this.cell.column];
            bChange = true;
        }
    }
    if (bChange) {
        if (newCell.number == this.cell.number + 1) {
            this.cell.number = -1;
            newCell.number++;
            this.cell.element.undrag();
            this.cell.element.untouchstart();
            this.cell.element.untouchmove();
            this.canvas.render(Snap('#mainGrid'));
        }   
    } else {
        position = this.canvas.position(this.cell);
        this.cell.element.attr('x', position.x + dx);
        this.cell.element.attr('y', position.y + dy);
    }
            
    if (this.canvas.puzzle.isSolved()) {
        this.canvas.puzzle.boardElement.attr({ fill: "#f9f" });
        $("#btnNextPuzzle").show();
        $("#txtPuzzleHint").hide();
    }
} 

cRakeDragController.prototype.touchMove = function(event) {
    cx = event.targetTouches.item(0).clientX - this.touchStart_x;
    cy = event.targetTouches.item(0).clientY - this.touchStart_y;
    this.dragMove(cx, cy);
}


cRakeDragController.prototype.dragStart = function () {
    this.old_dy = 0;
    this.old_dx = 0;
}


cRakeDragController.prototype.touchStart = function (event) {
    this.dragStart();
    this.touchStart_x = event.targetTouches.item(0).clientX;
    this.touchStart_y = event.targetTouches.item(0).clientY;
}


cRakeDragController.prototype.dragStop = function () {
    position = this.canvas.position(this.cell);
    this.cell.element.attr('x', position.x);
    this.cell.element.attr('y', position.y);
}

cRakeDragController.prototype.touchStop = function(event) {
  this.dragStop();
}

