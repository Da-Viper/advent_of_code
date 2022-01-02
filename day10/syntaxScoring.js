const fs = require("fs");
const path = require("path");

const sample = "test.txt";
const filename = "input.txt";
const charPair = {
    "{": "}",
    "(": ")",
    "[": "]",
    "<": ">",
};

fs.readFile(path.join(__dirname, filename), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
    }
    let lines = data.split(/\n/).map((x) => x.split(""));
    const result = part1(lines);
    let result2 = part2(lines);
    console.log(`part 1 ans is: ${result} `);
    console.log(`part 2 ans is ${result2}`);
});

/**
 *
 * @param {string[]} input
 */
function part1(input) {
    let score = 0;
    const charValues = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
    };
    for (const line of input) {
        const [corruptChar, _] = lineCorruptChar(line);
        score += charWorth(corruptChar, charValues);
    }
    return score;
}

function part2(input) {
    let scores = [];
    const charValue = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4,
    };

    for (let line of input) {
        const [corruptChar, stack] = lineCorruptChar(line);
        if (lineCorruptChar(line) === " ") {
            continue;
        }
        let points = 0;
        while (stack.length > 0) {
            points *= 5;
            points += charWorth(stack.pop(), charValue);
        }

        if (points !== 0) scores.push(points);
    }
    scores = scores.sort((a, b) => a - b);
    return scores[(scores.length / 2) >> 0];
}

function charWorth(char, dict) {
    if (!(char in dict)) {
        return 0;
    }
    return dict[char];
}

/**
 *
 * @param {string[]} line
 */
function lineCorruptChar(line) {
    let leftChars = Object.keys(charPair);
    let stack = [];
    for (let char of line) {
        if (leftChars.includes(char)) {
            stack.push(charPair[char]);
            continue;
        }
        let last = stack[stack.length - 1];
        if (last !== char) return [char, []];
        stack.pop();
    }
    return [" ", stack];
}
