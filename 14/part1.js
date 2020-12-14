const readline = require("readline");

function createMask(mask) {
  const justOnes = mask.replace(/X/g, "0");
  const ones = new Uint32Array(2);
  ones[1] = parseInt(justOnes.slice(0, justOnes.length - 32), 2);
  ones[0] = parseInt(justOnes.slice(justOnes.length - 32), 2);

  const justZeros = mask.replace(/X/g, "1");
  const zeros = new Uint32Array(2);
  zeros[1] = ~parseInt(justZeros.slice(0, justZeros.length - 32), 2);
  zeros[0] = ~parseInt(justZeros.slice(justZeros.length - 32), 2);

  return (value) => {
    const result = new BigUint64Array([BigInt(value)]);
    const asUint32 = new Uint32Array(result.buffer, 0, 2);
    asUint32[0] = ~(~(asUint32[0] | ones[0]) | zeros[0]);
    asUint32[1] = ~(~(asUint32[1] | ones[1]) | zeros[1]);
    return result;
  };
}

function solve(program) {
  const memory = new Map();
  let mask = createMask("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

  for (const inst of program) {
    switch (inst.type) {
      case "mask":
        mask = createMask(inst.mask);
        break;
      case "mem":
        memory.set(inst.addr, mask(inst.value));
        break;
    }
  }

  return [...memory.values()]
    .map((array) => array[0])
    .reduce((r, v) => r + v, BigInt(0))
    .toString();
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
