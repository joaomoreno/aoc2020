const readline = require("readline");

function* neighbors(x, y) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i !== 0 || j !== 0) {
        yield { x: x + i, y: y + j };
      }
    }
  }
}

function get(map, width, height, x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return ".";
  }
  return map[x + y * width];
}

function solve({ map, width, height }) {
  let changed;

  do {
    changed = false;
    let newMap = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        switch (get(map, width, height, x, y)) {
          case ".":
            newMap.push(".");
            break;
          case "L":
            if (
              ![...neighbors(x, y)]
                .map(({ x, y }) => get(map, width, height, x, y))
                .some((c) => c === "#")
            ) {
              newMap.push("#");
              changed = true;
            } else {
              newMap.push("L");
            }
            break;
          case "#":
            if (
              [...neighbors(x, y)]
                .map(({ x, y }) => get(map, width, height, x, y))
                .reduce((r, c) => r + (c === "#" ? 1 : 0), 0) >= 4
            ) {
              newMap.push("L");
              changed = true;
            } else {
              newMap.push("#");
            }
            break;
        }
      }
    }

    map = newMap.join("");
  } while (changed);

  return map.split("").reduce((r, c) => r + (c === "#" ? 1 : 0), 0);
}

function parse(lines) {
  return {
    width: lines[0].length,
    height: lines.length,
    map: lines.join(""),
  };
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
