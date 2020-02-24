// Object which controls rendering of puzzle to the snap canvas
cRakeCanvas = function (puzzle) {
    this.puzzle = puzzle;

    this.IMAGES = {
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
    // Size of images
    this.IMAGE_SIZE = 0.7;
    // Free space over the grid to show goals and stats
    this.V_OFFSET = 50;
    // additional space around the canvas to fit wide lines
    this.PADDING = 2;
}

cRakeCanvas.prototype.render = function (snap) {
    this.snap = snap;
    this.reRender();
}

cRakeCanvas.prototype.reRender = function () {
    this.snap.clear();
    this.cellSize = (this.snap.node.clientWidth - 2 * this.PADDING) / this.puzzle.gridXSize;
    this.imageSize = this.cellSize * this.IMAGE_SIZE;
    this.puzzle.goalElement = this.drawGoal(this.puzzle.goal);
    this.puzzle.boardElement = this.drawBoard(this.puzzle.gridYSize, this.puzzle.gridXSize);
    for (var y = 0; y < this.puzzle.gridYSize; y++) {
        for (var x = 0; x < this.puzzle.gridXSize; x++) {

            if (this.puzzle.cells[y][x].number > 0) {
                this.drawCell(this.puzzle.cells[y][x]);
                this.attachEvents(this.puzzle.cells[y][x]);
            }
        }
    }
    this.snap.node.setAttribute("height", this.snap.getBBox().height + 2 * this.PADDING);
}

cRakeCanvas.prototype.markSolved = function () {
    this.puzzle.boardElement.attr({ fill: "#f9f" });
}

cRakeCanvas.prototype.drawGoal = function (goal) {
    var n = 0;
    var goalElement = this.snap.group();
    goal.forEach(oneGoal => {
        position = {
            x: this.PADDING + n * this.V_OFFSET,
            y: this.PADDING
        }
        goalElement.add(this.snap.image(this.IMAGES[oneGoal], 
                                 position.x, position.y,
                                 this.V_OFFSET * this.IMAGE_SIZE, this.V_OFFSET * this.IMAGE_SIZE));
        n++;
    });
    return goalElement;
}

cRakeCanvas.prototype.drawBoard = function (gridYSize, gridXSize) {
    var board = this.snap.rect(this.PADDING, this.V_OFFSET + this.PADDING, gridXSize * this.cellSize, gridYSize * this.cellSize);
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
        x: cell.column * this.cellSize + (this.cellSize - this.imageSize) / 2 + this.PADDING,
        y: cell.row * this.cellSize + (this.cellSize - this.imageSize) / 2 + this.V_OFFSET + this.PADDING
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
}

cRakeCanvas.prototype.drawNumber = function (position, number) {
    imageurl = this.IMAGES[number];
    var image = this.snap.image(imageurl, position.x, position.y, this.imageSize, this.imageSize);
    return image;
}

cRakeCanvas.prototype.shiftCell = function (cell, dx, dy) {
    position = this.position(cell);
    cell.element.attr('x', position.x + dx);
    cell.element.attr('y', position.y + dy);
}

cRakeCanvas.prototype.attachEvents = function (cell) {
    var drag = new cRakeDragController(this, cell);
    cell.element.drag((dx, dy) => drag.dragMove(dx, dy), () => drag.dragStart(), () => drag.dragStop());
    cell.element.touchstart(event => drag.touchStart(event));
    cell.element.touchmove(event => drag.touchMove(event));
    cell.element.touchcancel(event => drag.touchStop(event));
    cell.element.touchend(event => drag.touchStop(event));
}

cRakeCanvas.prototype.detachEvents = function (cell) {
    cell.element.undrag();
    cell.element.untouchstart();
    cell.element.untouchmove();
    cell.element.untouchcancel();
    cell.element.untouchend();
}


