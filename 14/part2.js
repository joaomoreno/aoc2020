const readline = require("readline");

function* getMaskAddresses(addr, mask, from = 0) {
  const to = mask.indexOf("X", from);

  if (to === -1) {
    return yield addr.substr(from);
  }

  const prefix = addr.substring(from, to);

  for (const suffix of getMaskAddresses(addr, mask, to + 1)) {
    yield `${prefix}${"0"}${suffix}`;
    yield `${prefix}${"1"}${suffix}`;
  }
}

function solve(program) {
  const memory = new Map();

  for (const inst of program) {
    switch (inst.type) {
      case "mask":
        mask = inst.mask;
        break;
      case "mem":
        const addr = inst.addr
          .toString(2)
          .padStart(36, "0")
          .replace(/./g, (c, i) => (mask[i] === "1" ? "1" : c));

        for (const maskedAddr of getMaskAddresses(addr, mask)) {
          memory.set(maskedAddr, inst.value);
        }

        break;
    }
  }

  return [...memory.values()].reduce((r, v) => r + v, 0).toString();
}

const maskRX = /^mask = ([01X]{36})$/;
const memRX = /^mem\[(\d+)\] = (\d+)$/;

function parse(lines) {
  return lines.map((line) => {
    const maskInst = maskRX.exec(line);
    if (maskInst) {
      return { type: "mask", mask: maskInst[1] };
    }
    const memInst = memRX.exec(line);
    return {
      type: "mem",
      addr: parseInt(memInst[1]),
      value: parseInt(memInst[2]),
    };
  });
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
