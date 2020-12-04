const readline = require("readline");

function solveSlope(puzzle, slope) {
  let pos = [0, 0];
  let trees = 0;

  while (pos[1] < puzzle.length) {
    if (puzzle[pos[1]][pos[0] % puzzle[0].length] === "#") {
      trees++;
    }

    pos = [pos[0] + slope[0], pos[1] + slope[1]];
  }

  return trees;
}

function solve(puzzle) {
  return (
    solveSlope(puzzle, [1, 1]) *
    solveSlope(puzzle, [3, 1]) *
    solveSlope(puzzle, [5, 1]) *
    solveSlope(puzzle, [7, 1]) *
    solveSlope(puzzle, [1, 2])
  );
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin });
  const puzzle = [];

  for await (const line of rl) {
    puzzle.push(line);
  }

  console.log(solve(puzzle));
}

main();
