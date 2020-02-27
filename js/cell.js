// Object which represents one cell of a puzzle

var cRakeCell = function(column, row, number, cellType){
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
}

cRakeCell.EMPTY = 0;
cRakeCell.REGULAR = 1;
cRakeCell.WILDCARD = 2;
cRakeCell.PUSH = 3;


