const readline = require("readline");

function* getValidTickets({ rules, tickets }) {
  const isValid = (num) =>
    rules.some(({ ranges }) =>
      ranges.some(([from, to]) => num >= from && num <= to)
    );

  for (const ticket of tickets) {
    if (ticket.every(isValid)) {
      yield ticket;
    }
  }
}

function solve({ rules, ticket, neighbors }) {
  const validTickets = [...getValidTickets({ rules, tickets: neighbors })];
  const all = [];

  for (const rule of rules) {
    const exclude = [];

    for (const ticket of validTickets) {
      for (let index = 0; index < ticket.length; index++) {
        if (
          !rule.ranges.some(
            ([from, to]) => ticket[index] >= from && ticket[index] <= to
          )
        ) {
          exclude.push(index);
        }
      }
    }

    all.push({ rule, exclude, index: undefined });
  }

  const result = [...all];
  const done = new Set();

  while (all.length) {
    all.sort((a, b) => a.exclude.length - b.exclude.length);

    const head = all.pop();

    for (let i = 0; i < rules.length; i++) {
      if (!done.has(i) && head.exclude.indexOf(i) === -1) {
        done.add(i);
        head.index = i;
        break;
      }
    }
  }

  return result
    .filter((e) => e.rule.name.startsWith("departure"))
    .map((e) => ticket[e.index])
    .reduce((r, e) => r * e, 1);
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
