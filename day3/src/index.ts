import fs from "node:fs";

export function part1(input: string): number {
  const regex = /mul\(([\d]{1,3}),([\d]{1,3})\)/g;
  let result: RegExpExecArray;
  let sum = 0;
  while ((result = regex.exec(input))) {
    sum += parseInt(result[1]) * parseInt(result[2]);
  }
  return sum;
}

export function part2(input: string, enabled: boolean): [number, boolean] {
  const regex = /do\(\)|don't\(\)|mul\(([\d]{1,3}),([\d]{1,3})\)/g;
  let result: RegExpExecArray;
  let sum = 0;
  while ((result = regex.exec(input))) {
    if (result[0] === "do()") {
      enabled = true;
    } else if (result[0] === "don't()") {
      enabled = false;
    } else if (enabled) {
      sum += parseInt(result[1]) * parseInt(result[2]);
    }
  }
  return [sum, enabled];
}

const input = fs.readFileSync("input.txt").toString();
const part1sum = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => part1(line))
  .reduce((acc, value) => acc + value);
console.log(part1sum);

const part2sum = input
  .split("\n")
  .filter((line) => line.length > 0)
  .reduce(
    (acc, value) => {
      const result = part2(value, acc[1]);
      return [acc[0] + result[0], result[1]];
    },
    [0, true] as [number, boolean],
  );
console.log(part2sum[0]);
