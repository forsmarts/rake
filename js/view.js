//

var cRakeView = function(headerId, gridId, hintId, buttonId, storage) {
    this.headerElement = $(headerId);
    this.gridId = gridId;
    this.hintElement = $(hintId);
    this.buttonElement = $(buttonId);
    this.buttonElement.click(()=>this.nextPuzzle());
    this.storage = storage;
}

cRakeView.prototype.show = function(puzzle) {
    this.buttonElement.hide();
    this.hintElement.text(puzzle.hint || " ");
    this.hintElement.show();
    this.headerElement.text("Level " + puzzle.number);
    new cRakeCanvas(this, puzzle).render(Snap(this.gridId));
}

cRakeView.prototype.markSolved = function () {
    this.buttonElement.show();
    this.hintElement.hide();
}

cRakeView.prototype.nextPuzzle = function () {
    this.show(this.storage.getNext());
}

