const readline = require("readline");

function solve(puzzle, type = "shiny gold") {
  return puzzle
    .get(type)
    .reduce((r, { type, count }) => r + count + count * solve(puzzle, type), 0);
}

const regex = /^(\w+ \w+) bags contain (.*)\.$/;
const innerRegex = /(\d+) (\w+ \w+) bags?/g;

function parse(lines) {
  const puzzle = new Map();

  for (const line of lines) {
    const [, outer, inner] = regex.exec(line);

    if (inner[2] === "no other") {
      puzzle.set(outer, []);
    } else {
      const value = [];
      let match;
      while ((match = innerRegex.exec(inner))) {
        value.push({ type: match[2], count: parseInt(match[1]) });
      }
      puzzle.set(outer, value);
    }
  }

  return puzzle;
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
