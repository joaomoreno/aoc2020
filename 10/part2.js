const readline = require("readline");

const mem = new Map();

function solve(adapters, index = 0) {
  if (index == adapters.length - 1) {
    return 1;
  } else if (mem.has(index)) {
    return mem.get(index);
  }

  let result = 0;

  for (let diff = 1; diff <= 3; diff++) {
    if (
      index < adapters.length - diff &&
      adapters[index + diff] - adapters[index] <= 3
    ) {
      result += solve(adapters, index + diff);
    }
  }

  mem.set(index, result);
  return result;
}

function parse(lines) {
  const result = lines
    .map((line) => parseInt(line))
    .sort((a, b) => (a < b ? -1 : 1));
  return [0, ...result, result[result.length - 1] + 3];
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
