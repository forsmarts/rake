// Object which represents the puzzle state

var cRakePuzzle = function (data) {
    this.data = data;
    this.parseData(data);
}

cRakePuzzle.prototype.parseData = function (data) {
    this.gridXSize = data.gridSize[0];
    this.gridYSize = data.gridSize[1];
    this.goal = data.goal;
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
    var goal = this.goal;
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