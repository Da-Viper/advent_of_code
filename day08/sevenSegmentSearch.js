const fs = require("fs");
const path = require("path");

const sample = "test.txt";
const filename = "input.txt";

fs.readFile(path.join(__dirname, filename), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
    }
    let lines = data.split(/\n/);
    const result = part1(lines);
    let result2 = part2(lines);
    console.log(`${result} is the number of 1 2, 7 , 8 `);
    console.log(`${result2} is where the crabs align at `);
});

/**
 *
 * @param {string[]} lines
 */
function part1(lines) {
    const segment1478 = [2, 4, 3, 7];
    let numAppear = 0;

    for (let line of lines) {
        let [_, output] = line.split("|").map((x) => x.trim());
        let splitOutput = output.split(" ");

        for (let val of splitOutput) {
            if (segment1478.includes(val.length)) numAppear++;
        }
    }
    return numAppear;
}
/**
 *
 * @param {string} line
 */
function parseLine(line) {

    let [patterns, output] = line.split(" | ").map((x) => {
        x = x.trim();
        return x.split(" ");
    });

    let pDict = {};
    for (let i = 0; i < patterns.length; i++) {
        let pat = patterns[i];
        switch (pat.length) {
            case 2:
                pDict[1] = new Set(pat);
                break;
            case 4:
                pDict[4] = new Set(pat);
                break;
            case 3:
                pDict[7] = new Set(pat);
                break;
            case 7:
                pDict[8] = new Set(pat);
                break;
            default:
                break;
        }
    }
    let numStr = "";

    for (let value of output) {
        let vSet = new Set(value);
        switch (value.length) {
            case 2:
                numStr += "1";
                break;
            case 3:
                numStr += "7";
                break;
            case 4:
                numStr += "4";
                break;
            case 5:
                if (intersectLen(pDict[1], vSet) === 2) {
                    numStr += "3";
                } else if (unionLen(pDict[4], vSet) === 7) {
                    numStr += "2";
                } else {
                    numStr += "5";
                }
                break;
            case 6:
                if (intersectLen(pDict[1], vSet) === 1) {
                    numStr += "6";
                } else if (intersectLen(pDict[4], vSet) === 4) {
                    numStr += "9";
                } else {
                    numStr += "0";
                }
                break;
            case 7:
                numStr += "8";
                break;
            default:
                break;
        }
    }

    return parseInt(numStr);
}

function intersectLen(setA, setB) {
    let _intersection = new Set();
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection.size;
}

function unionLen(setA, setB) {
    let _union = new Set(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union.size;
}

function part2(input) {
    let result = 0;
    for (let line of input) {
        let lineVal = parseLine(line);
        result += lineVal;
    }
    return result;
}
