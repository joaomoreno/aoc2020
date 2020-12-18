const readline = require("readline");

function evaluate(expr) {
  if (Number.isInteger(expr)) {
    return expr;
  }

  let result = undefined;

  for (let i = 0; i < expr.ops.length; i++) {
    result = result ?? evaluate(expr.args[i]);
    const b = evaluate(expr.args[i + 1]);

    switch (expr.ops[i]) {
      case "+":
        result += b;
        break;
      case "*":
        result *= b;
        break;
    }
  }

  return result;
}

function solve(asts) {
  return asts.map(evaluate).reduce((r, v) => r + v, 0);
}

function parse(tokens) {
  let expr = { args: [], ops: [] };
  let stack = [];

  for (const token of tokens) {
    if (token === "(") {
      const newExpr = { args: [], ops: [] };
      expr.args.push(newExpr);
      stack.push(expr);
      expr = newExpr;
    } else if (token === ")") {
      expr = stack.pop();
    } else if (token === "+" || token === "*") {
      expr.ops.push(token);
    } else {
      expr.args.push(parseInt(token));
    }
  }

  return expr;
}

function* tokenize(line) {
  for (const match of line.matchAll(/[()+*]|\d+/g)) {
    yield match[0];
  }
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin });
  const lines = [];

  for await (const line of rl) {
    lines.push(line);
  }

  const asts = lines.map(tokenize).map(parse);
  console.log(solve(asts));
}

main();
