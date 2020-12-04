const readline = require("readline");

function isInRange(x, min, max) {
  return x >= min && x <= max;
}

function hasRequiredFields(passport) {
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

function isValid(passport) {
  if (!hasRequiredFields(passport)) {
    return false;
  } else if (
    !/^\d{4}$/.test(passport.byr) ||
    !isInRange(parseInt(passport.byr), 1920, 2002)
  ) {
    return false;
  } else if (
    !/^\d{4}$/.test(passport.iyr) ||
    !isInRange(parseInt(passport.iyr), 2010, 2020)
  ) {
    return false;
  } else if (
    !/^\d{4}$/.test(passport.eyr) ||
    !isInRange(parseInt(passport.eyr), 2020, 2030)
  ) {
    return false;
  }

  const hgtMatch = /^(\d+)(cm|in)$/.exec(passport.hgt);

  if (!hgtMatch) {
    return false;
  }

  const [, hgt, hgtUnit] = hgtMatch;

  if (hgtUnit === "cm" && !isInRange(parseInt(hgt), 150, 193)) {
    return false;
  } else if (hgtUnit === "in" && !isInRange(parseInt(hgt), 59, 76)) {
    return false;
  }

  if (!/^#[0-9a-f]{6}$/.test(passport.hcl)) {
    return false;
  } else if (!/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(passport.ecl)) {
    return false;
  } else if (!/^\d{9}$/.test(passport.pid)) {
    return false;
  }

  return true;
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
