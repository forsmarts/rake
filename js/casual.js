var cRakeCasual = function(level) {
    this.level = level;
    this.randomData();
}

cRakeCasual.prototype  = Object.create(cRakePuzzle.prototype);

cRakeCasual.prototype.randomData = function () {
    this.gridXSize = this.level;
    this.gridYSize = this.level;
    this.goal = [this.level * this.level - 1];
    this.hint = " ";
    var cells = [];
    for (var y = 0; y < this.gridYSize; y++) {
        cells[y] = new Array(this.gridXSize);
        for (var x = 0; x < this.gridXSize; x++) {
            var randomValue = 1 + Math.floor(Math.random() * 3);  
            cells[y][x] = new cRakeCell(x, y, randomValue);
        }
    }
    this.cells = cells;
}

cRakeCasual.prototype.joinCells = function (sourceCell, targetCell) {
    if (cRakePuzzle.prototype.joinCells.call(this, sourceCell, targetCell)) {
	sourceCell.number = 1 + Math.floor(Math.random() * 3);
        return true;
    }
    return false;
}

cRakeCasual.prototype.header = function() {
    console.log(this);
    return "Random " + this.level + "x" + this.level;
}
