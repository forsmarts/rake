//

var cRakeView = function(headerId, gridId, hintId, buttonId, onNext) {
    this.headerElement = $(headerId);
    this.gridId = gridId;
    this.hintElement = $(hintId);
    this.buttonElement = $(buttonId);
    this.buttonElement.click(()=>this.nextPuzzle());
    this.onNext = onNext;
}

cRakeView.prototype.show = function(puzzle) {
    this.buttonElement.hide();
    this.hintElement.text(puzzle.hint || " ");
    this.hintElement.show();
    this.headerElement.text(puzzle.header() || " ");
    this.canvas = new cRakeCanvas(this, puzzle);
    this.canvas.render(Snap(this.gridId));
}

cRakeView.prototype.markSolved = function () {
    this.buttonElement.show();
    this.hintElement.hide();
}

cRakeView.prototype.nextPuzzle = function () {
    this.onNext();
}

