const readline = require("readline");

function asRegex(rules, ruleId) {
  const mem = new Map();

  function _asRegex(ruleId) {
    const rule = rules.get(ruleId);

    if (typeof rule === "string") {
      return rule;
    }

    return `(${rule
      .map((subrule) => subrule.map(_asRegex).join(""))
      .join("|")})`;
  }

  function asRegexMem(ruleId) {
    if (mem.has(ruleId)) {
      return mem.get(ruleId);
    }

    const result = _asRegex(ruleId);
    mem.set(ruleId, result);
    return result;
  }

  return new RegExp(`^${asRegexMem(ruleId)}$`);
}

function solve({ rules, messages }) {
  const regex = asRegex(rules, 0);
  return messages.reduce((r, message) => r + (regex.test(message) ? 1 : 0), 0);
}

const ruleRx = /^(\d+): (.*)$/;
const literalRx = /^"(\w)"$/;
const subruleRx = /\d+/g;

function parse(lines) {
  let state = "rules";
  const result = {
    rules: new Map(),
    messages: [],
  };

  for (const line of lines) {
    switch (state) {
      case "rules":
        if (!line) {
          state = "messages";
        } else {
          const [, id, _subrules] = ruleRx.exec(line);
          const literal = literalRx.exec(_subrules);

          if (literal) {
            result.rules.set(parseInt(id), literal[1]);
          } else {
            const subrules = _subrules
              .split("|")
              .map((subrule) =>
                [...subrule.matchAll(subruleRx)].map(([id]) => parseInt(id))
              );

            result.rules.set(parseInt(id), subrules);
          }
        }
        break;
      case "messages":
        result.messages.push(line);
        break;
    }
  }

  return result;
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
