const readline = require("readline");

function isValid(length, values, index) {
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (
        values[index - length + i] + values[index - length + j] ===
        values[index]
      ) {
        return true;
      }
    }
  }

  return false;
}

function solve({ length, values }) {
  for (let i = length; i < values.length; i++) {
    if (!isValid(length, values, i)) {
      return values[i];
    }
  }
}

function parse(lines) {
  const [length, ...values] = lines.map((line) => parseInt(line));
  return { length, values };
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
