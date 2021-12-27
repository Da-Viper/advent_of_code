const fs = require("fs");
const sample = "day06/test.txt";
const filename = "day06/input.txt";

fs.readFile(filename, "utf-8", (err, data) => {
    if (err) {
        console.error(err);
    }

    var fishList = data.split(",");
    var fishDict = parseFishes(fishList);
    var days = 18;
    var fishDict = reproduce(fishDict, days);

    var numOfFishes = fishDict[99];
    console.log(`${numOfFishes} is the number of fishes`);
});

function parseFishes(fishlist) {
    // can use an array but did not feel like it.
    fishDict = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 99: 0 };
    for (fish of fishlist) {
        fishDict[fish] += 1;
        fishDict[99] += 1;
    }
    return fishDict;
}
/**
 *
 * @param {object} fishDict
 * @param {Number} days
 */
function reproduce(fishDict, days) {
    for (let day = 0; day < days; day++) {
        var temp = fishDict[0];

        for (let i = 0; i < 9; i++) {
            fishDict[i] = fishDict[i + 1];
        }
        fishDict[6] += temp;
        fishDict[8] = temp
        fishDict[99] += temp;
    }
    return fishDict;
}

