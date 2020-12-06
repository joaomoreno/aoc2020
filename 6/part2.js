const readline = require("readline");

function solveGroup(group) {
  const map = new Map();

  for (const person of group) {
    for (const answer of person) {
      map.set(answer, 1 + (map.get(answer) ?? 0));
    }
  }

  return [...map.entries()].reduce(
    (r, [_, c]) => r + (c === group.length ? 1 : 0),
    0
  );
}

function solve(groups) {
  return groups.reduce((r, g) => r + solveGroup(g), 0);
}

function parse(lines) {
  const groups = [];
  let group = [];

  for (const line of lines) {
    if (!line) {
      groups.push(group);
      group = [];
    } else {
      group.push(line);
    }
  }

  if (group.length) {
    groups.push(group);
  }

  return groups;
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
