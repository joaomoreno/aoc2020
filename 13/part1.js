const readline = require("readline");

function solve({ timestamp, ids }) {
  let bestId,
    best = Number.POSITIVE_INFINITY;

  for (const id of ids) {
    const wait = id - (timestamp % id);

    if (wait < best) {
      best = wait;
      bestId = id;
    }
  }

  return bestId * best;
}

function parse(lines) {
  const timestamp = parseInt(lines[0]);
  const ids = lines[1].split(",").map((id) => (id === "x" ? id : parseInt(id)));
  return { timestamp, ids };
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
