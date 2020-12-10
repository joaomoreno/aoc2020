const readline = require("readline");

function solve(adapters) {
  adapters.sort((a, b) => (a < b ? -1 : 1));

  let ones = 0;
  let threes = 1;
  let previous = 0;

  for (const adapter of adapters) {
    const diff = adapter - previous;

    if (diff === 1) {
      ones++;
    } else if (diff === 3) {
      threes++;
    }

    previous = adapter;
  }

  return ones * threes;
}

function parse(lines) {
  return lines.map((line) => parseInt(line));
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin });
  const lines = [];

  for await (const line of rl) {
    lines.push(line);
  }

  const puzzle = parse(lines);
  console.log(solve(puzzle));
}

main();
