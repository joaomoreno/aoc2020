const readline = require("readline");

function canHoldShinyGold(puzzle, type) {
  if (type === "shiny gold") {
    return true;
  }

  const arr = puzzle.get(type);

  if (!arr || !arr.length) {
    return false;
  }

  return arr.some((v) => canHoldShinyGold(puzzle, v.type));
}

function solve(puzzle) {
  let result = 0;

  for (const type of puzzle.keys()) {
    if (type !== 'shiny gold' && canHoldShinyGold(puzzle, type)) {
      result++;
    }
  }

  return result;
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
