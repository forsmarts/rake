//

var cRakeView = function(headerId, gridId, hintId, nextButtonId, restartButtonId, onNext, onRestart) {
    this.headerElement = $(headerId);
    this.gridId = gridId;
    this.hintElement = $(hintId);
    this.nextButtonElement = $(nextButtonId);
    this.nextButtonElement.click(()=>this.nextPuzzle());
    if (restartButtonId) {
      this.restartButtonElement = $(restartButtonId);
      this.restartButtonElement.click(()=>this.restartPuzzle());
    }
    this.onNext = onNext;
    this.onRestart = onRestart;
}

cRakeView.prototype.show = function(puzzle) {
    this.nextButtonElement.hide();
    if (this.restartButtonElement) {
      this.restartButtonElement.show();
    }
    if (puzzle.hint) {
      this.hintElement.text(puzzle.hint || " ");
      this.hintElement.show();
    } else {
      this.hintElement.hide();
    }
    this.headerElement.text(puzzle.header() || " ");
    this.canvas = new cRakeCanvas(this, puzzle);
    puzzle.canvas = this.canvas;
    this.canvas.render(Snap(this.gridId));
}

cRakeView.prototype.markSolved = function () {
    this.nextButtonElement.show();
    if (this.restartButtonElement) {
      this.restartButtonElement.hide();
    }
    this.hintElement.hide();
}

cRakeView.prototype.nextPuzzle = function () {
    this.onNext();
}

cRakeView.prototype.restartPuzzle = function () {
    this.onRestart();
}

