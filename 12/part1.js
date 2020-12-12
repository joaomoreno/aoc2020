const readline = require("readline");

const directions = ["N", "W", "S", "E"];

function rot(dir, degrees) {
  return directions[
    (directions.length + (directions.indexOf(dir) + degrees / 90)) %
      directions.length
  ];
}

function solve(puzzle) {
  let pos = [0, 0];
  let dir = "E";

  function move(inst) {
    switch (inst.action) {
      case "N":
        pos[1] -= inst.value;
        break;
      case "S":
        pos[1] += inst.value;
        break;
      case "E":
        pos[0] += inst.value;
        break;
      case "W":
        pos[0] -= inst.value;
        break;
      case "F":
        move({ ...inst, action: dir });
        break;
      case "L":
      case "R":
        dir = rot(dir, inst.action === "R" ? -inst.value : inst.value);
        break;
    }
  }

  for (const inst of puzzle) {
    move(inst);
  }

  return Math.abs(pos[0]) + Math.abs(pos[1]);
}

function parse(lines) {
  return lines.map((line) => ({
    action: line[0],
    value: parseInt(line.substr(1)),
  }));
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
