import fs from "node:fs";

export function part1(input: string): number {
  const lines = input.split("\n").filter((line) => line.length > 0);
  let xmasCount = 0;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (x < lines.length - 3) {
        const word =
          lines[y][x] + lines[y][x + 1] + lines[y][x + 2] + lines[y][x + 3];
        if (word == "XMAS" || word == "SAMX") {
          xmasCount++;
        }
      }

      if (y < lines.length - 3) {
        const word =
          lines[y][x] + lines[y + 1][x] + lines[y + 2][x] + lines[y + 3][x];
        if (word == "XMAS" || word == "SAMX") {
          xmasCount++;
        }
      }

      if (x < lines.length - 3 && y < lines.length - 3) {
        const word =
          lines[y][x] +
          lines[y + 1][x + 1] +
          lines[y + 2][x + 2] +
          lines[y + 3][x + 3];
        if (word == "XMAS" || word == "SAMX") {
          xmasCount++;
        }
      }
      if (x >= 3 && y < lines.length - 3) {
        const word =
          lines[y][x] +
          lines[y + 1][x - 1] +
          lines[y + 2][x - 2] +
          lines[y + 3][x - 3];
        if (word == "XMAS" || word == "SAMX") {
          xmasCount++;
        }
      }
    }
  }
  return xmasCount;
}

export function part2(input: string): number {
  const lines = input.split("\n").filter((line) => line.length > 0);
  let xmasCount = 0;
  for (let y = 0; y < lines.length - 2; y++) {
    for (let x = 0; x < lines[y].length - 2; x++) {
      const firstWord = lines[y][x] + lines[y + 1][x + 1] + lines[y + 2][x + 2];
      const secondWord =
        lines[y][x + 2] + lines[y + 1][x + 1] + lines[y + 2][x];
      if (
        (firstWord == "MAS" || firstWord == "SAM") &&
        (secondWord == "MAS" || secondWord == "SAM")
      ) {
        xmasCount++;
      }
    }
  }
  return xmasCount;
}

const input = fs.readFileSync("input.txt").toString();
console.log(part1(input));
console.log(part2(input));
