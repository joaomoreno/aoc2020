const readline = require("readline");

function solve(seats) {
  return Math.max(...seats);
}

const map = {
  B: "1",
  F: "0",
  R: "1",
  L: "0",
};

function parse(lines) {
  return lines
    .map((line) => line.replace(/./g, (c) => map[c]))
    .map((bin) => parseInt(bin, 2));
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
