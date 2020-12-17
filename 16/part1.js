const readline = require("readline");

function solve({ rules, neighbors }) {
  const isValid = (num) =>
    rules.some(({ ranges }) =>
      ranges.some(([from, to]) => num >= from && num <= to)
    );

  let result = 0;

  for (const ticket of neighbors) {
    for (const num of ticket) {
      if (!isValid(num)) {
        result += num;
      }
    }
  }

  return result;
}

const ruleRx = /^([^:]+): (\d+)-(\d+) or (\d+)-(\d+)$/;

function parse(lines) {
  let state = "rules";
  const rules = [];
  let ticket;
  const neighbors = [];

  for (const line of lines) {
    switch (state) {
      case "rules":
        if (!line) {
          state = "ticket";
        } else {
          const match = ruleRx.exec(line);

          rules.push({
            name: match[1],
            ranges: [
              [parseInt(match[2]), parseInt(match[3])],
              [parseInt(match[4]), parseInt(match[5])],
            ],
          });
        }
        break;
      case "ticket":
        if (!line) {
          state = "neighbors";
        } else if (line !== "your ticket:") {
          ticket = line.split(",").map((n) => parseInt(n));
        }
        break;
      case "neighbors":
        if (line !== "nearby tickets:") {
          neighbors.push(line.split(",").map((n) => parseInt(n)));
        }
        break;
    }
  }

  return { rules, ticket, neighbors };
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
