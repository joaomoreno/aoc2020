const readline = require("readline");

function find(nums, base) {
  const set = new Set();

  for (const num of nums) {
    const comp = base - num;

    if (set.has(comp)) {
      return comp * num;
    }

    set.add(num);
  }

  return undefined;
}

function solve(nums) {
  for (let i = 0; i < nums.length; i++) {
    const result = find(nums.slice(i), 2020 - nums[i]);

    if (result !== undefined) {
      return nums[i] * result;
    }
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
