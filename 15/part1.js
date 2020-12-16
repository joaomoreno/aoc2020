const readline = require("readline");

function solve(numbers) {
  const result = [];

  for (let i = 0; i < 2020; i++) {
    if (i < numbers.length) {
      result.push(numbers[i]);
    } else {
      const last = result[result.length - 1];
      const index = result.lastIndexOf(last, result.length - 2);

      if (index === -1) {
        result.push(0);
      } else {
        result.push(i - index - 1);
      }
    }
  }

  return result[result.length - 1];
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
