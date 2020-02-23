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
  return this.puzzles[this.currentPuzzle++];
}

storage = new cBandsStorage();

