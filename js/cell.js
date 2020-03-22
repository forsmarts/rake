// Object which represents one cell of a puzzle

var cRakeCell = function(puzzle, column, row, number, cellType){
    this.puzzle = puzzle;
    this.column = column;
    this.row = row;
    // defalt number in the cell
    this.number = number;
    this.isNew = true;
    this.cellType = cellType;
}

cRakeCell.prototype.copyFrom = function(cell) {
    this.number = cell.number;
    this.isNew = cell.isNew;
    this.cellType = cell.cellType;
    if (this.puzzle.canvas != null) {
        this.puzzle.canvas.animateCell(this, cell);
    }
}

cRakeCell.prototype.clear = function() {
    this.cellType = cRakeCell.EMPTY;
    this.number = null;
    if (this.puzzle.canvas != null) {
        this.puzzle.canvas.clearCell(this);
    }
}

cRakeCell.EMPTY = 0;
cRakeCell.REGULAR = 1;
cRakeCell.WILDCARD = 2;
cRakeCell.PUSH = 3;


