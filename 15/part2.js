const readline = require("readline");

function solve(numbers) {
  let next;
  let lastDiff = undefined;
  const map = new Map();

  for (let i = 0; i < 30000000; i++) {
    next = 0;

    if (i < numbers.length) {
      next = numbers[i];
    } else if (lastDiff !== undefined) {
      next = lastDiff;
    }

    if (map.has(next)) {
      lastDiff = i - map.get(next);
    } else {
      lastDiff = undefined;
    }

    map.set(next, i);
  }

  return next;
}

function parse(lines) {
  return lines[0].split(",").map((n) => parseInt(n));
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
