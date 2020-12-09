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

function findInvalidValue(length, values) {
  for (let i = length; i < values.length; i++) {
    if (!isValid(length, values, i)) {
      return values[i];
    }
  }
}

function findContiguousSumSet(values, needle) {
  let start = 0;
  let end = 1;
  let sum = values[start];

  while (end < values.length) {
    if (sum === needle) {
      return values.slice(start, end);
    } else if (sum < needle) {
      sum += values[end++];
    } else {
      sum -= values[start++];
    }
  }
}

function solve({ length, values }) {
  const value = findInvalidValue(length, values);
  const set = findContiguousSumSet(values, value);
  return Math.min(...set) + Math.max(...set);
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
