const readline = require("readline");

function solve({ ids }) {
  ids = ids.reduce(
    (r, id, i) => (id === "x" ? r : [...r, { id, remainder: i % id }]),
    []
  );

  let result = ids[0].remainder;
  let factor = ids[0].id;

  for (let i = 1; i < ids.length; i++) {
    const { id, remainder } = ids[i];

    while (true) {
      if (id - (result % id) === remainder) {
        break;
      }

      result += factor;
    }

    factor *= id;
  }

  return result;
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
