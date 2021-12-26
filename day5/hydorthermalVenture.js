const fs = require("fs");

const sample = "day5/test.txt";
const filename = "day5/input.txt";

fs.readFile(filename, "utf-8", (err, data) => {
    if (err) {
        console.error(err);
    }
    var lines = data.split(/\n/);
    var above2 = buildBoard(lines);
    console.log(`${above2} lines are above two`);
});

/**
 *
 * @param {string[]} lines
 */
function buildBoard(lines) {
    var board = {};
    var position = {};
    var pointOverlap = 0;
    for (var line of lines) {
        var line = line.split(" -> ");
        var currentLine = new Line(line);
        var curLinePoints = getPointsInLine(currentLine);
        pointOverlap = addToBoard(board, curLinePoints, pointOverlap);
    }
    return pointOverlap;
}

/**
 *
 * @param {Line} aLine
 */
function getPointsInLine(aLine) {
    const startX = aLine.start.x;
    const startY = aLine.start.y;
    const endX = aLine.end.x;
    const endY = aLine.end.y;

    var result = [];
    if (startX === endX) {
        if (startY < endY) {
            for (let i = startY; i <= endY; i++) {
                result.push(new Point([startX, i]));
            }
        } else {
            for (let i = endY; i <= startY; i++) {
                result.push(new Point([startX, i]));
            }
        }
    } else if (startY == endY) {
        if (startX < endX) {
            for (let i = startX; i <= endX; i++) {
                result.push(new Point([i, startY]));
            }
        } else {
            for (let i = endX; i <= startX; i++) {
                result.push(new Point([i, startY]));
            }
        }
    } else {
        const pointDistanceX = endX - startX;
        const pointDistanceY = endY - startY;
        const iter = Math.abs(pointDistanceX);
        if (Math.abs(pointDistanceX) === Math.abs(pointDistanceY)) {
            for (let i = 0; i <= iter; i++) {
                let xoffset = pointDistanceX < 0 ? -i : i;
                let yoffset = pointDistanceY < 0 ? -i : i;
                result.push(new Point([startX + xoffset, startY + yoffset]));
            }
        }
    }
    return result;
}
/**
 *
 * @param {Array[[]]} board
 * @param {Array<Point>} points
 * @param {Number} pointOverlap
 */
function addToBoard(board, points, pointOverlap) {
    for (var point of points) {
        if (!(point.strVal in board)) {
            board[point.strVal] = 1;
        } else if (board[point.strVal] === 1) {
            pointOverlap += 1;
            board[point.strVal] += 1;
        } else {
            board[point.strVal] += 1;
        }
    }
    return pointOverlap;
}

class Point {
    constructor(strArray) {
        if (typeof strArray == "string") {
            this.strVal = strArray;
            var temp = strArray.split(",").map((x) => parseInt(x));
            this.x = temp[0];
            this.y = temp[1];
        } else {
            this.strVal = strArray.toString();
            this.x = strArray[0];
            this.y = strArray[1];
        }
    }
}
class Line {
    constructor(line) {
        this.start = new Point(line[0]);
        this.end = new Point(line[1]);
    }
}
