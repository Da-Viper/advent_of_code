const fs = require("fs");
const sample = "day3/test.txt";
const mainFile = "day3/input.txt";

fs.readFile(mainFile, "utf-8", (err, data) => {
    if (err) {
        console.error(err);
    }
    var lines = data.split(/\r?\n/);
    // console.log(lines);
    var firstpart = part1(lines);
    console.log(`the first ans is ${firstpart}`);
    var secondPart = part2(lines);
    console.log(`the second ans is ${secondPart}`);
});

/**
 *
 * @param {string[]} lines
 */
function part1(lines) {
    let firstVal = lines[0].split("").length;
    var gamma = new Array(firstVal).fill(0);
    var epsilon = new Array(firstVal).fill(0);
    var gamsilon = new Array(firstVal).fill(0);

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index].split("");

        for (let eIndex = 0; eIndex < element.length; eIndex++) {
            if (element[eIndex] === "0") {
                gamsilon[eIndex] -= 1;
            }
            if (element[eIndex] === "1") {
                gamsilon[eIndex] += 1;
            }
        }
    }

    console.log(gamsilon);
    for (let index = 0; index < gamsilon.length; index++) {
        if (gamsilon[index] > 0) {
            gamma[index] = 1;
            epsilon[index] = 0;
        } else {
            gamma[index] = 0;
            epsilon[index] = 1;
        }
    }
    gamma = parseInt(gamma.join(""), 2);
    epsilon = parseInt(epsilon.join(""), 2);

    return gamma * epsilon;
}

/**
 *
 * @param {string[]} lines
 */
function part2(lines) {
    let interations = lines[0].length;
    var sLines = lines;
    for (let index = 0; index < interations; index++) {
        var commonNo = mostOccuringNo(sLines, index, true);
        var sLines = sLines.filter((x) => x.charAt(index) == commonNo);
        if (sLines.length == 1) {
            break;
        }

        console.log(`the most common in index ${index} is ${commonNo}`);
    }
    for (let index = 0; index < interations; index++) {
        var commonNo = mostOccuringNo(lines, index, false);
        var lines = lines.filter((x) => x[index] == commonNo);
        if (lines.length == 1) {
            break;
        }

        console.log(`the most common in index ${index} is ${commonNo}`);
    }
    var oxygenGen = parseInt(sLines[0], 2);
    var CO2 = parseInt(lines[0], 2);
    console.log(`the most common in index ${oxygenGen} is ${CO2}`);
    return oxygenGen * CO2;
}

function commonNOs(x) {
    var commonNo = "1";
    var index = x[1];
    var iseq = commonNo == index;
    return iseq;
}
/**
 *
 * @param {string[]} lines
 * @param {Number} pos
 * @param {boolean} isOxygen
 *
 */
function mostOccuringNo(lines, pos, isOxygen) {
    var occur = 0;
    for (let index = 0; index < lines.length; index++) {
        const element = lines[index];
        switch (element[pos]) {
            case "1":
                occur += 1;
                break;
            case "0":
                occur -= 1;
                break;
            default:
                break;
        }
    }
    if (isOxygen) {
        return occur >= 0 ? "1" : "0";
    }
    return occur >= 0 ? "0" : "1";
}
