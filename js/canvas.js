// Object which controls rendering of puzzle to the snap canvas

// dragData - data passed inside drag/drop processing
var dragData = {thisCell: null, old_dx: 0, old_dy: 0, touchStart_x: 0, touchStart_y: 0};

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
            dragData.thisCell.element.untouchstart();
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
        $("#txtPuzzleHint").hide();
    }
} 

var touchMove = function(event) {
    cx = event.targetTouches.item(0).clientX - dragData.touchStart_x;
    cy = event.targetTouches.item(0).clientY - dragData.touchStart_y;
    dragMove(cx, cy);
}


var dragStart = function (cell) {
    dragData.old_dy = 0;
    dragData.old_dx = 0;
    dragData.thisCell = cell;
}


var touchStart = function (event, cell) {
    dragStart(cell);
    dragData.touchStart_x = event.targetTouches.item(0).clientX;
    dragData.touchStart_y = event.targetTouches.item(0).clientY;
}


var dragStop = function () {
    position = canvas.position(dragData.thisCell);
    dragData.thisCell.element.attr('x', position.x);
    dragData.thisCell.element.attr('y', position.y);
}

var touchStop = function(event) {
  dragStop();
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
        "10": "images/number10.png",
        "11": "images/number11.png",
        "12": "images/number12.png",
        "13": "images/number13.png",
        "14": "images/number14.png",
        "15": "images/number15.png",
        "16": "images/number16.png",
        "17": "images/number17.png",
        "18": "images/number18.png",
        "19": "images/number19.png",
        "20": "images/number20.png"
    }
    this.vOffset = 50;
    this.hOffset = 2;
}

cRakeCanvas.prototype.render = function (snap) {
    this.snap = snap;
    this.snap.clear();
    this.cellSize = snap.node.clientWidth / this.puzzle.gridXSize - 2 * this.hOffset;
    this.ballSize = this.cellSize / 1.5;
    this.puzzle.goalElement = this.drawGoal(this.puzzle.goal);
    this.puzzle.boardElement = this.drawBoard(this.puzzle.gridYSize, this.puzzle.gridXSize);
    for (var y = 0; y < this.puzzle.gridYSize; y++) {
        for (var x = 0; x < this.puzzle.gridXSize; x++) {
            if (this.puzzle.cells[y][x].number > 0) {
                this.drawCell(this.puzzle.cells[y][x]);
            }
        }
    }
    this.snap.node.setAttribute("height", this.snap.getBBox().height);
}

cRakeCanvas.prototype.drawGoal = function (goal) {
    var n = 0;
    goal.forEach(oneGoal => {
        position = {
            x: this.hOffset + n * this.vOffset,
            y: 0
        }         
        this.snap.image(this.images[oneGoal], position.x, position.y, this.vOffset * 0.8, this.vOffset * 0.8);
        n++;
    });
}

cRakeCanvas.prototype.drawBoard = function (gridYSize, gridXSize) {
    var board = this.snap.rect(this.hOffset, this.vOffset, gridXSize * this.cellSize, gridYSize * this.cellSize);
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
        x: cell.column * this.cellSize + this.cellSize / 2 - this.ballSize / 2 + this.hOffset,
        y: cell.row * this.cellSize + this.cellSize / 2 - this.ballSize / 2 + this.vOffset
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
    cell.element.drag(dragMove, function() {dragStart(cell);}, dragStop);
    cell.element.touchstart(function(event) {touchStart(event, cell);});
    cell.element.touchmove(touchMove);
    cell.element.touchcancel(touchStop);
    cell.element.touchend(touchStop);
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
