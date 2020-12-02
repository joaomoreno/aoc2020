const readline = require("readline");

function solve({ min, max, letter, pwd }) {
  let count = 0;

  for (const l of pwd) {
    if (l === letter) {
      count++;
    }
  }

  return count >= min && count <= max;
}

const lineRX = /^(\d+)-(\d+) (\w): (\w+)$/;

function parse(line) {
  const match = lineRX.exec(line);
  return {
    min: parseInt(match[1]),
    max: parseInt(match[2]),
    letter: match[3],
    pwd: match[4],
  };
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin });
  const input = [];

  for await (const line of rl) {
    input.push(parse(line));
  }

  let count = 0;

  for (const puzzle of input) {
    if (solve(puzzle)) {
      count++;
    }
  }

  console.log(count);
}

main();
