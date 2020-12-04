const readline = require("readline");

function solve(puzzle) {
  let pos = [0, 0];
  let trees = 0;

  while (pos[1] < puzzle.length) {
    if (puzzle[pos[1]][pos[0] % puzzle[0].length] === "#") {
      trees++;
    }

    pos = [pos[0] + 3, pos[1] + 1];
  }

  return trees;
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
