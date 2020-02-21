// Object which controls rendering of puzzle to the snap canvas

var thisCell = new cRakeCell();
var newCell = new cRakeCell();
var old_dy = old_dx = 0;
var bChange = false;
var vertOffset = 50;

var move = function (dx, dy) {
    if (Math.abs(dx)>Math.abs(dy)) {
        if (dx - old_dx > canvas.cellSize / 2) {
            newCell = canvas.puzzle.cells[thisCell.row][thisCell.column+1];
            bChange = true;
        }
        else if (old_dx - dx > canvas.cellSize / 2) {
            newCell = canvas.puzzle.cells[thisCell.row][thisCell.column-1];
            bChange = true;
        }
    }
    else {
        if (dy - old_dy > canvas.cellSize / 2) {
            newCell = canvas.puzzle.cells[thisCell.row+1][thisCell.column];
            bChange = true;
        }
        else if (old_dy - dy > canvas.cellSize / 2) {
            newCell = canvas.puzzle.cells[thisCell.row-1][thisCell.column];
            bChange = true;
        }
    }
    if (bChange) {
        bChange = false;
        if (newCell.number == thisCell.number + 1) {
            thisCell.number=-1;
            newCell.number++;
            canvas.render(Snap('#mainGrid'));
        }   
    }
            
    if (canvas.puzzle.isSolved()) {
        canvas.puzzle.element.attr({ fill: "#f9f" });
        $("#btnNextPuzzle").show();
    }
} 

var start = function (cx, cy) {
    old_dy = old_dx = 0;
    var x = Math.floor((cx - mainGrid.getBoundingClientRect().left) / canvas.cellSize);
    var y = Math.floor((cy - mainGrid.getBoundingClientRect().top) / canvas.cellSize);
    thisCell = canvas.puzzle.cells[y][x];
    this.data('origTransform', this.transform().local);
}

var stop = function () {
}

cRakeCanvas = function (puzzle) {
    this.puzzle = puzzle;
    this.colors = {
        "1": "#f33",
        "2": "#f93",
        "3": "#ff3",
        "4": "#cf3",
        "5": "#9f3",
        "6": "#3f3",
        "7": "#3fc",
        "8": "#3ff",
        "9": "#3cf",
        "10": "#33f",
        "11": "#c3f",
        "12": "#f3f"
    };
    this.url = {
        "1": "images/number1.png",
        "2": "images/number2.png",
        "3": "images/number3.png",
        "4": "images/number4.png",
        "5": "images/number5.png",
        "6": "images/number6.png",
        "7": "images/number7.png",
        "8": "images/number8.png",
        "9": "images/number9.png",
        "10": "images/number10.png"
    }
}

cRakeCanvas.prototype.render = function (snap) {
    this.snap = snap;
    this.cellSize = Math.min((snap.node.clientHeight - vertOffset) / this.puzzle.gridXSize, snap.node.clientWidth / this.puzzle.gridYSize);
    //this.ballSize = this.cellSize / 3;
    this.ballSize = this.cellSize / 2;
    this.puzzle.element = this.drawGoal(this.puzzle.goal);
    this.puzzle.element = this.drawBoard(this.puzzle.gridYSize, this.puzzle.gridXSize);
    for (var y = 0; y < this.puzzle.gridYSize; y++) {
        for (var x = 0; x < this.puzzle.gridXSize; x++) {
            if (this.puzzle.cells[y][x].number > 0) {
                this.drawCell(this.puzzle.cells[y][x]);
            }
        }
    }
}

cRakeCanvas.prototype.drawGoal = function (goal) {
    var n = 0;
    goal.forEach(oneGoal => {
        position = {
            x: n * vertOffset,
            y: 0
        }         
        this.snap.image(this.url[oneGoal], position.x, position.y, vertOffset * 0.8, vertOffset * 0.8);
        n++;
    });
}

cRakeCanvas.prototype.drawBoard = function (gridYSize, gridXSize) {
    var board = this.snap.rect(0, vertOffset, gridXSize * this.cellSize, gridYSize * this.cellSize);
    board.attr({
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 5
    })
//    board.drag(move, start, stop);
    return board;
}

cRakeCanvas.prototype.drawCell = function (cell) {
    // The center of the cell
    position = {
        //x: cell.column * this.cellSize + this.cellSize / 2,
        //y: cell.row * this.cellSize + this.cellSize / 2
        x: cell.column * this.cellSize + this.cellSize / 2 - this.ballSize / 2,
        y: cell.row * this.cellSize + this.cellSize / 2 - this.ballSize / 2 + vertOffset
    }
    var lines = []
    for (side in this.opposite) {
        if ((cell.direction != side || cell.isLast) && cell.prevDirection != this.opposite[side]) {
            lines.push(this.drawInnerBorder(position, side));
        }
    }
    cell.lines = lines;
    //cell.element = this.drawNumber(position, this.colors[cell.number]);
    cell.element = this.drawNumber(position, this.url[cell.number]);
}

cRakeCanvas.prototype.drawNumber = function (position, url) {
    /*
    var circle = this.snap.circle(position.x, position.y, this.ballSize);
    circle.attr({
        fill: color,
        stroke: "#fff",
        strokeWidth: 0
    })
    circle.drag(move, start, stop);
    return circle;
    */
    var image = this.snap.image(url, position.x, position.y, this.ballSize, this.ballSize);
    image.drag(move, start, stop);
    return image;
}
