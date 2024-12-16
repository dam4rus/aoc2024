import fs from "node:fs";
class Point {
  public constructor(
    public x: number,
    public y: number,
  ) {}

  public manhattanDistance(point: Point): ManhattanDistance {
    return new ManhattanDistance(point.x - this.x, point.y - this.y);
  }

  public isInGrid(gridWidth: number, gridHeight: number): boolean {
    return (
      this.x >= 0 && this.y >= 0 && this.x < gridWidth && this.y < gridHeight
    );
  }
}

class ManhattanDistance {
  public constructor(
    public x: number,
    public y: number,
  ) {}
}

function parseInput(input: string): {
  gridWidth: number;
  gridHeight: number;
  antennas: Map<string, [Point]>;
} {
  const lines = input.split("\n").filter((line) => line.length > 0);
  const gridWidth = lines[0].length;
  const gridHeight = lines.length;

  const antennas = lines.reduce((acc, line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] != ".") {
        if (acc.has(line[x])) {
          acc.get(line[x]).push(new Point(x, y));
        } else {
          acc.set(line[x], [new Point(x, y)]);
        }
      }
    }
    return acc;
  }, new Map<string, [Point]>());
  return {
    gridWidth,
    gridHeight,
    antennas,
  };
}

export function part1(input: string): number {
  const { gridWidth, gridHeight, antennas } = parseInput(input);
  const antiNodePositions = new Set<string>();
  for (const [_, positions] of antennas.entries()) {
    positions.forEach((position1, i) => {
      positions
        .filter((_, j) => i != j)
        .forEach((position2) => {
          const distance = position1.manhattanDistance(position2);

          const antiNodePosition = new Point(
            position2.x + distance.x,
            position2.y + distance.y,
          );
          if (antiNodePosition.isInGrid(gridWidth, gridHeight)) {
            antiNodePositions.add(JSON.stringify(antiNodePosition));
          }
        });
    });
  }
  // console.log(antiNodePositions);
  return antiNodePositions.size;
}

export function part2(input: string): number {
  const { gridWidth, gridHeight, antennas } = parseInput(input);
  const antiNodePositions = new Set<string>();
  for (const [_, positions] of antennas.entries()) {
    positions.forEach((position1, i) => {
      positions
        .filter((_, j) => i != j)
        .forEach((position2) => {
          const distance = position1.manhattanDistance(position2);

          let lastPosition = position1;
          while (true) {
            const antiNodePosition = new Point(
              lastPosition.x + distance.x,
              lastPosition.y + distance.y,
            );
            if (!antiNodePosition.isInGrid(gridWidth, gridHeight)) {
              break;
            }
            antiNodePositions.add(JSON.stringify(antiNodePosition));
            lastPosition = antiNodePosition;
          }
        });
    });
  }
  // console.log(antiNodePositions);
  return antiNodePositions.size;
}

const input = fs.readFileSync("input.txt").toString();
console.log(part1(input));
console.log(part2(input));
