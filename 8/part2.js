const readline = require("readline");

function run(program) {
  const pcs = new Set();
  let accumulator = 0;
  let pc = 0;

  while (pc >= 0 && pc < program.length) {
    if (pcs.has(pc)) {
      throw new Error("infinite loop");
    }

    pcs.add(pc);

    const { op, arg } = program[pc];

    switch (op) {
      case "nop":
        pc++;
        break;
      case "acc":
        accumulator += arg;
        pc++;
        break;
      case "jmp":
        pc += arg;
        break;
    }
  }

  return accumulator;
}

function solve(program) {
  for (const instruction of program) {
    const op = instruction.op;

    if (op === "jmp") {
      instruction.op = "nop";
    } else if (op === "nop") {
      instruction.op = "jmp";
    } else {
      continue;
    }

    try {
      return run(program);
    } catch {
      instruction.op = op;
    }
  }
}

const regex = /^(\w+) ([+-]\d+)$/;

function parse(lines) {
  return lines
    .map((line) => regex.exec(line))
    .map(([, op, arg]) => ({ op, arg: parseInt(arg) }));
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
