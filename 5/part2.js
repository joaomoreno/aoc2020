const readline = require("readline");

function solve(seats) {
  seats = new Set(seats);
  let start = true;

  for (let seat = 0; seat < 1024; seat++) {
    if (!seats.has(seat)) {
      if (!start) {
        return seat;
      }
    } else {
      start = false;
    }
  }
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
