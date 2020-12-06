const readline = require("readline");

function solveGroup(group) {
  return group.reduce((r, p) => {
    p.split("").forEach((l) => r.add(l));
    return r;
  }, new Set()).size;
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
