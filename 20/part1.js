const readline = require("readline");

function reverse(str) {
  return [...str].reverse().join("");
}

function asNumber(str) {
  return parseInt(
    str.replace(/./g, (v) => (v === "." ? 0 : 1)),
    2
  );
}

function processTile(tile) {
  const n = tile.image[0];
  const w = tile.image.map((r) => r[9]).join("");
  const s = tile.image[9];
  const e = tile.image.map((r) => r[0]).join("");

  const a = [asNumber(n), asNumber(w), asNumber(s), asNumber(e)];
  const b = [
    asNumber(reverse(n)),
    asNumber(reverse(e)),
    asNumber(reverse(s)),
    asNumber(reverse(w)),
  ];

  return { id: tile.id, a, b };
}

function solve(tiles) {
  const cornerTiles = [];
  tiles = tiles.map(processTile);

  for (const tile of tiles) {
    let count = 0;

    for (const edge of tile.a) {
      for (const other of tiles) {
        if (other === tile) {
          continue;
        }

        if (
          other.a.some((otherEdge) => otherEdge === edge) ||
          other.b.some((otherEdge) => otherEdge === edge)
        ) {
          count++;
        }
      }
    }

    if (count === 2) {
      cornerTiles.push(tile);
    }
  }

  return cornerTiles.reduce((r, tile) => r * tile.id, 1);
}

const tileIdRegex = /^Tile (\d+):$/;

function parse(lines) {
  const tiles = [];

  for (let i = 0; i < lines.length; i++) {
    const [, id] = tileIdRegex.exec(lines[i]);

    tiles.push({
      id: parseInt(id),
      image: lines.slice(i + 1, i + 11),
    });

    i += 11;
  }

  return tiles;
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
