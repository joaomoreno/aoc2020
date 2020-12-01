const readline = require("readline");

function solve(nums) {
  const set = new Set();

  for (const num of nums) {
    const comp = 2020 - num;

    if (set.has(comp)) {
      return comp * num;
    }

    set.add(num);
  }
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin });
  const nums = [];

  for await (const line of rl) {
    nums.push(parseInt(line));
  }

  console.log(solve(nums));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
