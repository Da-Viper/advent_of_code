// import fs from "fs";
// const fs = require('fs')
const fs = require("fs");
const { cursorTo } = require("readline");

fs.readFile("input.txt", "utf-8", (err, data) => {
    console.log("hi there");
    if (err) {
        console.error(err);
    }
    var lines = data.split("\n").map(x=> parseInt(x));   

    isLarger(lines);
    isLarger2(lines);
});

/**
 *  Check how many times the current lines is greater than the previous line
 * @param {String} lines
 */
function isLarger(lines) {
    var prevLine = lines[0];
    var isLargerCount = 0;

    for (let index = 1; index < lines.length; index++) {
        var curLine = parseInt(lines[index]);

        if (curLine > prevLine) isLargerCount++;

        prevLine = curLine;
    }
    console.log(`The first part is ${isLargerCount}`);
}
/**
 *
 * @param {String} lines
 */
function isLarger2(lines) {
    var prevLine = lines.slice(0, 3);
    var isLargerCount = 0;
    var prevVar = prevLine.reduce((x, y) => x + y);

    for (let index = 1; index < lines.length - 3; index++) {
        var currentVar = lines
            .slice(index, index + 3)
            .map(x=> parseInt(x))
            .reduce((x, y) => x + y);

        if (currentVar > prevVar) isLargerCount++;
        prevLine = currentVar;
    }

    console.log(`The second part is ${isLargerCount}`);
}
