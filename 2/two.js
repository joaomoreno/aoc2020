const readline = require("readline");

function solve({ pos1, pos2, letter, pwd }) {
  return (pwd[pos1 - 1] === letter) !== (pwd[pos2 - 1] === letter);
}

const lineRX = /^(\d+)-(\d+) (\w): (\w+)$/;

function parse(line) {
  const match = lineRX.exec(line);
  return {
    pos1: parseInt(match[1]),
    pos2: parseInt(match[2]),
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
