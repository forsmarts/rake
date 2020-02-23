// Object which controls rendering of puzzle to the snap canvas

// dragData - data passed inside drag/drop processing
var dragData = {thisCell: null, old_dx: 0, old_dy: 0};

var dragMove = function (dx, dy) {
    var bChange = false;
    var newCell;
    if (Math.abs(dx)>Math.abs(dy)) {
        if (dx - dragData.old_dx > canvas.cellSize / 1.5) {
            newCell = canvas.puzzle.cells[dragData.thisCell.row][dragData.thisCell.column+1];
            bChange = true;
        }
        else if (dragData.old_dx - dx > canvas.cellSize / 1.5) {
            newCell = canvas.puzzle.cells[dragData.thisCell.row][dragData.thisCell.column-1];
            bChange = true;
        }
    }
    else {
        if (dy - dragData.old_dy > canvas.cellSize / 1.5) {
            newCell = canvas.puzzle.cells[dragData.thisCell.row+1][dragData.thisCell.column];
            bChange = true;
        }
        else if (dragData.old_dy - dy > canvas.cellSize / 1.5) {
            newCell = canvas.puzzle.cells[dragData.thisCell.row-1][dragData.thisCell.column];
            bChange = true;
        }
    }
    if (bChange) {
        if (newCell.number == dragData.thisCell.number + 1) {
            dragData.thisCell.number = -1;
            newCell.number++;
            dragData.thisCell.element.undrag();
            dragData.thisCell.element.untouchmove();
            canvas.render(Snap('#mainGrid'));
        }   
    } else {
        position = canvas.position(dragData.thisCell);
        dragData.thisCell.element.attr('x', position.x + dx);
        dragData.thisCell.element.attr('y', position.y + dy);
    }
            
    if (canvas.puzzle.isSolved()) {
        canvas.puzzle.boardElement.attr({ fill: "#f9f" });
        $("#btnNextPuzzle").show();
    }
} 

var dragStart = function (cx, cy) {
    dragData.old_dy = 0;
    dragData.old_dx = 0;
    boardPosition = canvas.boardPosition();
    var x = Math.floor((cx - mainGrid.getBoundingClientRect().left - boardPosition.x) / canvas.cellSize);
    var y = Math.floor((cy - mainGrid.getBoundingClientRect().top - boardPosition.y) / canvas.cellSize);
    dragData.thisCell = canvas.puzzle.cells[y][x];
    this.data('origTransform', this.transform().local);
}

var dragStop = function () {
    position = canvas.position(dragData.thisCell);
    dragData.thisCell.element.attr('x', position.x);
    dragData.thisCell.element.attr('y', position.y);
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
    this.images = {
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
    this.vertOffset = 50;
}

cRakeCanvas.prototype.render = function (snap) {
    this.snap = snap;
    this.cellSize = Math.min((snap.node.clientHeight - this.vertOffset) / this.puzzle.gridXSize, 
                             snap.node.clientWidth / this.puzzle.gridYSize);
    this.ballSize = this.cellSize / 2;
    this.puzzle.goalElement = this.drawGoal(this.puzzle.goal);
    this.puzzle.boardElement = this.drawBoard(this.puzzle.gridYSize, this.puzzle.gridXSize);
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
            x: n * this.vertOffset,
            y: 0
        }         
        this.snap.image(this.images[oneGoal], position.x, position.y, this.vertOffset * 0.8, this.vertOffset * 0.8);
        n++;
    });
}

cRakeCanvas.prototype.drawBoard = function (gridYSize, gridXSize) {
    var board = this.snap.rect(0, this.vertOffset, gridXSize * this.cellSize, gridYSize * this.cellSize);
    board.attr({
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 5
    })
    return board;
}

cRakeCanvas.prototype.boardPosition = function () {
    // Top left corner of the board
    return {
        x: this.puzzle.boardElement.attr('x'),
        y: this.puzzle.boardElement.attr('y')
    }
}

cRakeCanvas.prototype.position = function (cell) {
    // The center of the cell
    return {
        //x: cell.column * this.cellSize + this.cellSize / 2,
        //y: cell.row * this.cellSize + this.cellSize / 2
        x: cell.column * this.cellSize + this.cellSize / 2 - this.ballSize / 2,
        y: cell.row * this.cellSize + this.cellSize / 2 - this.ballSize / 2 + this.vertOffset
    }
}

cRakeCanvas.prototype.drawCell = function (cell) {
    position = this.position(cell);
    var lines = []
    for (side in this.opposite) {
        if ((cell.direction != side || cell.isLast) && cell.prevDirection != this.opposite[side]) {
            lines.push(this.drawInnerBorder(position, side));
        }
    }
    cell.lines = lines;
    cell.element = this.drawNumber(position, cell.number);
    cell.element.drag(dragMove, dragStart, dragStop);
    cell.element.touchstart(dragStart);
    cell.element.touchmove(dragMove);
    cell.element.touchcancel(dragStop);
}

cRakeCanvas.prototype.drawNumber = function (position, number) {
    // color = this.colors[number];
    imageurl = this.images[number];
    /*
    var circle = this.snap.circle(position.x, position.y, this.ballSize);
    circle.attr({
        fill: color,
        stroke: "#fff",
        strokeWidth: 0
    })
    return circle;
    */
    var image = this.snap.image(imageurl, position.x, position.y, this.ballSize, this.ballSize);
    return image;
}
