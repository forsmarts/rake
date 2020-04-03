// File containing grid data
var rakeInitData = function(storage) {

storage.addPuzzle({
  "gridSize": [2,1],
  "goal": [3],
  "hint": "Move a tile \"1\" towards a tile \"2\"",
  "numbers": [
    [1,2]
  ]
});

storage.addPuzzle({
  "gridSize": [2,2],
  "goal": [4],
  "hint": "This works for every tile numbered N moved towards a tile numbered N+1",
  "numbers": [
    [ ,1],
    [2,2]
  ]
});

storage.addPuzzle({
  "gridSize": [3,2],
  "goal": [5],
  "hint": "Mind the number above the grid, this is the goal of the level",
  "numbers": [
    [2,2,2],
    [1,1,]
  ]
});

storage.addPuzzle({
  "gridSize": [3,3],
  "goal": [6],
  "numbers": [
    [2,2,1],
    [2,2,2],
    [ ,1,1]
  ]
});

storage.addPuzzle({
  "gridSize": [4,3],
  "goal": [7],
  "numbers": [
    [2,2,1, ],
    [1,4,2,1],
    [2,3,2, ]
  ]
});

storage.addPuzzle({
  "gridSize": [3,3],
  "goal": [5],
  "hint": "Puzzle can be toroidal - in this case a tile moved towards one edge appears from another",
  "toroidal": true,
  "numbers": [
    [ , ,1],
    [ , , ],
    [4, ,2]
  ]
});

storage.addPuzzle({
  "gridSize": [3,3],
  "goal": [7],
  "toroidal": true,
  "numbers": [
    [2, ,1],
    [ ,4,1],
    [4,4,2]
  ]
});

storage.addPuzzle({
  "gridSize": [3,3],
  "goal": [7],
  "hint": "Pusher moves all the tiles in the row or column",
  "numbers": [
    ["p",1,2],
    [ , ,2],
    [4,5,4]
  ]
});

storage.addPuzzle({
  "gridSize": [3,3],
  "goal": [8],
  "hint": "In toroidal grid the pushed over tile appears from the other end",
  "toroidal": true,
  "numbers": [
    ["p",3,5],
    [1,4,5],
    [2,2,4]
  ]
});

storage.addPuzzle({
  "gridSize": [4,4],
  "goal": [8],
  "numbers": [
    [3,4,2,1],
    [2,5,3,2],
    [2,2,2, ],
    [ ,1,1, ]
  ]
});

storage.addPuzzle({
  "gridSize": [4,4],
  "goal": [6,6],
  "hint": "The goal of the level can contain few numbers - you should have corresponding amount of them in the grid",
  "numbers": [
    [1,2,2, ],
    [2,3,3,2],
    [1,2,3,2],
    [ , ,2,1]
  ]
});

storage.addPuzzle({
  "gridSize": [4,4],
  "goal": [9],
  "numbers": [
    [ ,1,2,3],
    [2,3,4,3],
    [3,4,6,2],
    [1,2,4,4]
  ]
});

storage.addPuzzle({
  "gridSize": [5,4],
  "goal": [9],
  "numbers": [
    [2,3,2, , ],
    [5,5,2,1, ],
    [4,5,4,2,1],
    [3,3,2, , ]
  ]
});

storage.addPuzzle({
  "gridSize": [5,3],
  "goal": [8],
  "hint": "Modifying tiles will change the number on the ajdacent tile accordingly when moved towards it",
  "numbers": [
    [2,3,4,2,1],
    [1,2,4,"+1", ],
    ["+1",1,2,1, ]
  ]
});

storage.addPuzzle({
  "gridSize": [5,4],
  "goal": [8,8],
  "numbers": [
    [1,4,4,6,5],
    [2,5,3,2,2],
    [3,4,2,1,1],
    [2,3,2, , ]
  ]
});

storage.addPuzzle({
  "gridSize": [5,5],
  "goal": [6,8],
  "numbers": [
    [ ,"+1",1,2, ],
    [ ,1,3,2,1],
    [2,2,3,2,1],
    [3,4,4,3,2],
    [2,3,2,2,"-1"]
  ]
});

storage.addPuzzle({
  "gridSize": [5,5],
  "goal": [10],
  "numbers": [
    [3,5,1, , ],
    [4,5,2,2, ],
    [6,6,4,2,1],
    [5,4,2,2, ],
    [4,3,1, , ]
  ]
});

storage.addPuzzle({
  "gridSize": [5,5],
  "goal": [7,8],
  "numbers": [
    [2,3,2,1, ],
    [2,4,3,2, ],
    [1,2,3,3,2],
    [1,2,4,3,2],
    [1,2,4,2,1]
  ]
});

storage.addPuzzle({
  "toroidal": true,
  "gridSize": [5,5],
  "goal": [5,5,5,5,5],
  "numbers": [
    [1,2,2,1, ],
    [2,1,2,2,2],
    [2,1,2,3,1],
    [1, ,2,2,1],
    [2,1,2,2,3]
  ]
});

storage.addPuzzle({
  "gridSize": [5,5],
  "goal": [8,8],
  "numbers": [
    [3,3,2, , ],
    [3,5,2,"+1", ],
    [2,3,3,3,"p"],
    [3,4,5,4,3],
    [2,"+1",3,2, ]
  ]
});

storage.addPuzzle({
  "toroidal": true,
  "gridSize": [5,5],
  "goal": [11],
  "numbers": [
    ["p",2,2,5,7],
    [3,3,5,7,6],
    [2,3,4,7,5],
    [2,2,2,"p",3],
    [2,1,1,5,3]
  ]
});


}
