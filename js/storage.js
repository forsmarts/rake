// Object to provide puzzles data
var cBandsStorage = function(){
  this.puzzles = [];
  this.currentPuzzle = parseInt(localStorage.getItem('lastLevel')) || 0;
}


cBandsStorage.prototype.addPuzzle = function(data){
  this.puzzles.push(data);
}

cBandsStorage.prototype.getNext = function(data){
  this.currentPuzzle = Math.min(this.currentPuzzle, this.puzzles.length  - 1);
  localStorage.setItem('lastLevel', this.currentPuzzle);
  this.currentPuzzle++;
  return new cRakePuzzle(this.currentPuzzle, this.puzzles[this.currentPuzzle - 1]);
}

cBandsStorage.prototype.get = function(data){
  return new cRakePuzzle(this.currentPuzzle, this.puzzles[this.currentPuzzle - 1]);
}


