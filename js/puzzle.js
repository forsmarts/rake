// Object which represents the puzzle state

var cRakePuzzle = function (number, data) {
    this.number = number;
    this.data = data;
    this.parseData(data);
}

cRakePuzzle.prototype.parseData = function (data) {
    this.gridXSize = data.gridSize[0];
    this.gridYSize = data.gridSize[1];
    this.goal = data.goal;
    this.hint = data.hint;
    var cells = [];
    // create all cells
    for (var y = 0; y < this.gridYSize; y++) {
        cells[y] = new Array(this.gridXSize);
        for (var x = 0; x < this.gridXSize; x++) {
            cells[y][x] = new cRakeCell(x, y, data.numbers[y][x]);
        }
    }
    this.cells = cells;
}

cRakePuzzle.prototype.isSolved = function () {
    var nCountNumbers=0;
    // Copy an array to not modify original
    var goal = this.goal.slice();
    for (y = 0; y < this.gridYSize; y++) {
        for (x = 0; x < this.gridXSize; x++) {
            nIndex=goal.indexOf(this.cells[y][x].number);
            if (nIndex >= 0) {
                nCountNumbers++;
                goal[nIndex] = 0;
            }
        }
    }
    return nCountNumbers==this.goal.length;
}

cRakePuzzle.prototype.joinCells = function (sourceCell, targetCell) {
    if (targetCell.number == sourceCell.number + 1) {
        sourceCell.number = -1;
        targetCell.number++;
        return true;
    }
    return false;
}
