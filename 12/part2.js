const readline = require("readline");

const cost = [1, 0, -1, 0];
const sint = [0, 1, 0, -1];

function rot(dir, degrees) {
  const rots = (4 + degrees / 90) % 4;
  const cos = cost[rots];
  const sin = sint[rots];
  const result = [dir[0] * cos - dir[1] * sin, dir[0] * sin + dir[1] * cos];
  return result;
}

function mul(vec, f) {
  return [vec[0] * f, vec[1] * f];
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

function solve(puzzle) {
  let pos = [0, 0];
  let dir = [10, -1];

  function move(inst) {
    switch (inst.action) {
      case "N":
        dir[1] -= inst.value;
        break;
      case "S":
        dir[1] += inst.value;
        break;
      case "E":
        dir[0] += inst.value;
        break;
      case "W":
        dir[0] -= inst.value;
        break;
      case "F":
        pos = add(pos, mul(dir, inst.value));
        break;
      case "L":
      case "R":
        dir = rot(dir, inst.action === "L" ? -inst.value : inst.value);
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
