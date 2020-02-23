// Object to provide puzzles data
var cBandsStorage = function(){
  this.puzzles = [];
  this.currentPuzzle = 0;
}


cBandsStorage.prototype.addPuzzle = function(data){
  this.puzzles.push(data);
}

cBandsStorage.prototype.getNext = function(data){
  return this.puzzles[this.currentPuzzle++];
}

storage = new cBandsStorage();

