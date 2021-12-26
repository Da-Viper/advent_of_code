const fs = require("fs");
// const sample = "day3/test.txt";
const sample = "day4/test.txt";
const filename = "day4/input.txt";

fs.readfile(filename, "utf-8", (err, data) => {
    if (err) {
        console.error(err);
    }
    const lines = data.split(/\n\s*\n/);
    var { guesses, gameBoards } = getGuessAndGameBoard(lines);
    const firstpart = part1(guesses, gameBoards);
    console.log(`the first ans is ${firstpart}`);
    const secondPart = part2(guesses, gameBoards);
    console.log(`the second ans is ${secondPart}`);
});

function getGuessAndGameBoard(lines) {
    var guesses = lines[0].split(",").map((x) => parseInt(x));
    var gameBoards = [];

    for (let index = 1; index < lines.length; index++) {
        gameBoards.push(new Bingo(lines[index]));
    }
    return { guesses, gameBoards };
}
/**
 *
 * @param {string[]} lines
 */
function part1(guesses, gameBoards) {
    for (let index = 0; index < guesses.length; index++) {
        var guess = guesses[index];

        gameBoards.map((x) => x.mark(guess));
        if (index < 4) continue;

        var winningIndex = -1;
        var unmarkedSum = 0;
        var winning = [];
        gameBoards.map((x) => {
            winning.push(x.checkRowAndColumn());
        });

        winningIndex = winning.findIndex((x) => x == true);
        if (winningIndex !== -1) {
            unmarkedSum = gameBoards[winningIndex].sumOfUnmarked();
            console.log(`the guess and sum is ${unmarkedSum} ${guess}`);
            return unmarkedSum * guess;
        }
    }

    return -1;
}
/**
 *
 * @param {Number[]} guesses
 * @param {Array<Bingo>} gameBoards
 * @returns
 */
function part2(guesses, gameBoards) {
    for (let index = 0; index < guesses.length; index++) {
        var guess = guesses[index];

        gameBoards.map((x) => x.mark(guess));
        if (index < 4) continue;

        var unmarkedSum = 0;
        for (let i = 0; i < gameBoards.length; i++) {
            gameBoards[i].hasWon = gameBoards[i].checkRowAndColumn();
            if (!gameBoards[i].hasWon) continue;

            if (gameBoards.length !== 1) {
                gameBoards.splice(i, 1);
            } else {
                unmarkedSum = gameBoards[i].sumOfUnmarked();
                return unmarkedSum * guess;
            }
        }
    }
    return -1;
}
class Bingo {
    /**
     * Constructor
     * @param {String} stringValue
     */
    constructor(stringValue) {
        this.board = [];
        this.hasWon = false;
        var rows = stringValue.split(/\r*\n/);
        for (let index = 0; index < rows.length; index++) {
            const currentRow = rows[index]
                .trim()
                .split(/\s+/)
                .map((n) => parseInt(n));

            var row = [];
            for (let k = 0; k < currentRow.length; k++) {
                row.push({ num: currentRow[k], marked: false });
            }
            this.board.push(row);
        }
    }
    /**
     *
     * @param {Number} val the values set as guessed
     */
    mark(val) {
        // this.board.forEach((row) =>
        //     row.forEach((pos) => {
        //         if (pos.num === val) pos.marked = true;
        //     })
        // );
        for (var row of this.board) {
            for (var pos of row) {
                if (pos.num === val) pos.marked = true;
            }
        }
    }

    sumOfUnmarked() {
        var sum = 0;
        for (var row of this.board) {
            for (var pos of row) {
                if (pos.marked == false) sum += pos.num;
            }
        }
        return sum;
    }
    checkRowAndColumn() {
        for (let i = 0; i < this.board.length; i++) {
            // check if row is complete
            if (this.board[i].every((x) => x.marked === true)) return true;

            // check if column is complete
            if (this.board.map((row) => row[i]).every((x) => x.marked === true))
                return true;
        }
        return false;
    }
}
