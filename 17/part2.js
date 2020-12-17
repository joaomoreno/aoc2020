const readline = require("readline");

function key(x, y, z, w) {
  if (Array.isArray(x)) {
    [x, y, z, w] = x;
  }
  return `${x},${y},${z},${w}`;
}

function value(str) {
  return str.split(",").map((v) => parseInt(v));
}

function* neighbors(x, y, z, w) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          if (i !== 0 || j !== 0 || k !== 0 || l !== 0) {
            yield key(x + i, y + j, z + k, w + l);
          }
        }
      }
    }
  }
}

function span(map) {
  const result = new Set();

  for (const [pos] of map) {
    result.add(pos);

    for (const around of neighbors(...value(pos))) {
      result.add(around);
    }
  }

  return result;
}

function solve(map) {
  for (let i = 0; i < 6; i++) {
    const nextMap = new Map();

    for (const cube of span(map)) {
      const activeNeighbors = [...neighbors(...value(cube))].reduce(
        (r, c) => r + (map.get(c) ? 1 : 0),
        0
      );

      if (map.get(cube)) {
        if (activeNeighbors === 2 || activeNeighbors === 3) {
          nextMap.set(cube, true);
        }
      } else {
        if (activeNeighbors === 3) {
          nextMap.set(cube, true);
        }
      }
    }

    map = nextMap;
  }

  return map.size;
}

function parse(lines) {
  const map = new Map();

  let y = 0;
  for (const line of lines) {
    let x = 0;
    for (const char of line.split("")) {
      map.set(key(x++, y, 0, 0), char === "#");
    }
    y++;
  }

  return map;
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
