const fs = require("fs");
const path = require("path");

const sample = "test.txt";
const filename = "input.txt";

fs.readFile(path.join(__dirname, filename), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
    }
    let lines = data
        .split(/\n/)
        .map((x) => x.split("").map((y) => parseInt(y)));
    const result = lowPoints(lines);
    let result2 = part2(lines);
    console.log(`${result} is the number of 1 2, 7 , 8 `);
    console.log(`${result2}`);
});

function lowPoints(lines) {
    let rowEnd = lines.length;
    let colEnd = lines[0].length;
    let totalLowPoints = 0;

    for (let row = 0; row < rowEnd; row++) {
        for (let col = 0; col < colEnd; col++) {
            let currentVal = lines[row][col];
            let isLow = isLowPoint(row, col, lines);
            if (isLow) {
                totalLowPoints += ++currentVal;
            }
        }
    }
    return totalLowPoints;
}

function isLowPoint(row, col, board) {
    let rowEnd = board.length;
    let colEnd = board[0].length;
    let currentPos = board[row][col];
    let isLowPoint = true;

    if (row > 0) isLowPoint &&= currentPos < board[row - 1][col];
    if (row < rowEnd - 1) isLowPoint &&= currentPos < board[row + 1][col];

    if (col > 0) isLowPoint &&= currentPos < board[row][col - 1];
    if (col < colEnd - 1) isLowPoint &&= currentPos < board[row][col + 1];

    return isLowPoint;
}

function part2(lines) {
    let rowEnd = lines.length;
    let colEnd = lines[0].length;
    let isChecked = [...Array(rowEnd)].map((e) => Array(colEnd).fill(false));
    let totalBasings = [];
    for (let row = 0; row < rowEnd; row++) {
        for (let col = 0; col < colEnd; col++) {
            if (!isChecked[row][col]) {
                let basinSize = getBasin(row, col, isChecked, lines);
                totalBasings.push(basinSize);
            }
        }
    }

    totalBasings = totalBasings.sort((x, y) => y - x);
    let top3 = totalBasings.slice(0, 3);
    return top3.reduce((prev, curr) => prev * curr, 1);
}

function getBasin(row, col, checkedArray, board) {
    if (checkedArray[row][col]) return 0;
    checkedArray[row][col] = true;
    let currentPos = board[row][col];
    if (currentPos > 8) return 0;
    let rowEnd = board.length;
    let colEnd = board[0].length;
    let basinSize = 1;

    if (col > 0) basinSize += getBasin(row, col - 1, checkedArray, board);
    if (col < colEnd - 1)
        basinSize += getBasin(row, col + 1, checkedArray, board);

    if (row > 0) basinSize += getBasin(row - 1, col, checkedArray, board);
    if (row < rowEnd - 1)
        basinSize += getBasin(row + 1, col, checkedArray, board);

    return basinSize;
}
