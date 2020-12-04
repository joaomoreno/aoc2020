const readline = require("readline");

function isValid(passport) {
  return (
    "byr" in passport &&
    "iyr" in passport &&
    "eyr" in passport &&
    "hgt" in passport &&
    "hcl" in passport &&
    "ecl" in passport &&
    "pid" in passport /* &&
    ("cid" in passport) */
  );
}

function solve(passports) {
  return passports.reduce((r, p) => r + (isValid(p) ? 1 : 0), 0);
}

function parse(lines) {
  const passports = [];
  let current = undefined;

  for (const line of lines) {
    if (!line) {
      if (current) {
        passports.push(current);
        current = undefined;
      }
    } else {
      if (!current) {
        current = {};
      }

      const regex = /([^: ]+):([^: ]+)/g;
      let match;

      while ((match = regex.exec(line))) {
        current[match[1]] = match[2];
      }
    }
  }

  if (current) {
    passports.push(current);
  }

  return passports;
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
