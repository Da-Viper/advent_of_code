const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
    }
    var lines = data.split(/\r?\n/);
    // console.log(lines);
    var firstpart = part1(lines);
    console.log(`the first ans is ${firstpart}`);
     var secondPart = part2(lines);
    console.log(`the first ans is ${secondPart}`);
});

/**
 *
 * @param {String} lines
 */
function part1(lines) {
    var posX = 0;
    var depth = 0;

    for (let index = 0; index < lines.length; index++) {
        var line = lines[index].split(" ");
        const direction = line[0],
            val = parseInt(line[1]);

        switch (direction.toLowerCase()) {
            case "forward":
                posX += val;
                break;
            case "down":
                depth += val;
                break;
            case "up":
                depth -= val;
                break;
            default:
                break;
        }
    }
    return posX * depth;
}

/**
 *
 * @param {String} lines
 */
function part2(lines) {
    var posX = 0;
    var depth = 0;
    var aim = 0;

    for (let index = 0; index < lines.length; index++) {
        var line = lines[index].split(" ");
        const direction = line[0],
            val = parseInt(line[1]);

        switch (direction.toLowerCase()) {
            case "forward":
                posX += val;
                depth += (val * aim);
                break;
            case "down":
                aim += val;
                break;
            case "up":
                aim -= val;
                break;
            default:
                break;
        }
    }
    return posX * depth;
}
