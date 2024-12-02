import fs from "node:fs";

function isSafeLevel(
  level: number,
  nextLevel: number,
  incremental: boolean,
): boolean {
  if (incremental) {
    if (nextLevel <= level || nextLevel - level > 3) {
      return false;
    }
  } else {
    if (nextLevel >= level || level - nextLevel > 3) {
      return false;
    }
  }
  return true;
}

function isSafe(levels: number[]): boolean {
  const incremental = levels[1] - levels[0] > 0;
  for (let i = 0; i < levels.length - 1; i++) {
    if (!isSafeLevel(levels[i], levels[i + 1], incremental)) {
      return false;
    }
  }
  return true;
}

export function part1(reports: number[][]): number {
  return reports
    .map((levels) => isSafe(levels))
    .reduce((acc, isSafe) => (isSafe ? acc + 1 : acc), 0);
}

export function part2(reports: number[][]): number {
  return reports
    .map((levels) => {
      if (isSafe(levels)) {
        return true;
      }
      for (let i = 0; i < levels.length; i++) {
        if (isSafe(levels.slice(0, i).concat(levels.slice(i + 1)))) {
          return true;
        }
      }
      return false;
    })
    .reduce((acc, isSafe) => (isSafe ? acc + 1 : acc), 0);
}

const input = fs.readFileSync("input.txt").toString();
const reports = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => line.split(" ").map((level) => parseInt(level)));
console.log(part1(reports));
console.log(part2(reports));
