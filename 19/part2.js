const readline = require("readline");

const mem = new Map();

function asRegex(rules, ruleId) {
  function _asRegex(ruleId) {
    const rule = rules.get(ruleId);

    if (typeof rule === "string") {
      return rule;
    }

    return `(?:${rule
      .map((subrule) => subrule.map(asRegexMem).join(""))
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

  return `${asRegexMem(ruleId)}`;
}

function createMatcher(r42, r31) {
  const regexes = [];
  let r11 = `${r42}${r31}`;

  for (let i = 0; i < 5; i++) {
    regexes.push(new RegExp(`^(?:${r42})+(?:${r11})$`));
    r11 = `${r42}${r11}${r31}`;
  }

  return (message) => regexes.some((r) => r.test(message));
}

function solve({ rules, messages }) {
  const r42 = asRegex(rules, 42);
  const r31 = asRegex(rules, 31);
  const matches = createMatcher(r42, r31);

  return messages.reduce(
    (r, message) => r + (matches(message, r42, r31) ? 1 : 0),
    0
  );
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
