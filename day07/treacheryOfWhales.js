const fs = require("fs");
const path = require("path");

const sample = "test.txt";
const filename = "input.txt";

fs.readFile(path.join(__dirname, sample), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
    }
    var lines = data.split(",").map((x) => parseInt(x));
    var result = part1(lines);
    var result2 = part2(lines);
    console.log(`${result} is where the crabs align at `);
    console.log(`${result2} is where the crabs align at `);
});

function part1(input) {
    var input = input.sort((x, y) => x - y);
    var ans = median(input);
    console.log(`the point is ${ans}`);
    var result = 0;
    for (const num of input) {
        result += Math.abs(ans - num);
    }
    return result;
}

function part2(input) {
    var inputMode = mean(input);

    var result = 0;
    for (const num of input) {
        var steps = Math.abs(inputMode - num);
        var form = (steps * (1 + steps)) / 2;
        result += form;
    }
    return result;
}
function mean(input) {
    var sum = input.reduce((a, b) => a + b);
    var length = input.length;
    var result = sum / length;

    console.log(`the result are : ${result}, ${Math.floor(result)}`);

    return result % 2 === 0 ? result : result >> 0;
}
/**
 *
 * @param {number[]} input
 */
function median(input) {
    var result = input.length / 2;
    return result % 2 === 0 ? input[result] : input[result >> 0];
}
