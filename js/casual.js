var cRakeCasual = function(level) {
    this.level = level;
    this.randomData();
}

cRakeCasual.prototype  = Object.create(cRakePuzzle.prototype);

cRakeCasual.prototype.randomData = function () {
    this.gridXSize = this.level;
    this.gridYSize = this.level;
    this.goal = [this.level * (this.level - 1)];
    this.hint = " ";
    var cells = [];
    for (var y = 0; y < this.gridYSize; y++) {
        cells[y] = new Array(this.gridXSize);
        for (var x = 0; x < this.gridXSize; x++) {
            cells[y][x] = this.randomCell(x, y);
        }
    }
    this.cells = cells;
}

cRakeCasual.prototype.joinCells = function (sourceCell, targetCell) {
    if (cRakePuzzle.prototype.joinCells.call(this, sourceCell, targetCell)) {
	sourceCell.copyFrom(this.randomCell(sourceCell.x, sourceCell.y));
        return true;
    }
    return false;
}

cRakeCasual.prototype.header = function() {
    return "Random " + this.level + "x" + this.level;
}

cRakeCasual.prototype.randomCell = function(x, y) {
    var randomValue = Math.floor(Math.random() * 10)-1;
    console.log(randomValue);
    if (randomValue==-1) {
        return new cRakeCell(x, y, -1, cRakeCell.WILDCARD);
    } else if (randomValue==0 || randomValue==1) {
        return new cRakeCell(x, y, 1, cRakeCell.WILDCARD);
    } else {
        return new cRakeCell(x, y, 1 + randomValue%2, cRakeCell.REGULAR);
    }
}
