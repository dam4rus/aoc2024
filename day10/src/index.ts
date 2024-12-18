import fs from "node:fs";
class Point {
  public constructor(
    public x: number,
    public y: number,
  ) {}
}

function climb(
  position: Point,
  lines: string[],
  currentHeight: number,
  peaks: Set<string>,
  currentTrail: Point[] | null = null,
  trails: Point[][] | null = null,
) {
  const heightAtPosition = parseInt(lines[position.y][position.x]);
  // console.log(`position: ${position.x}, ${position.y}`);
  // console.log(`height: ${heightAtPosition}`);
  // if (heightAtPosition === 8) {
  //   console.log(position);
  // }
  if (heightAtPosition !== currentHeight + 1) {
    return;
  }
  let trail = null;
  if (currentTrail !== null) {
    trail = [...currentTrail];
    trail.push(new Point(position.x, position.y));
  }
  if (heightAtPosition === 9) {
    peaks.add(JSON.stringify(position));
    if (trail != null && trails !== null) {
      trails.push(trail);
    }
    return;
  }
  if (position.x - 1 >= 0) {
    climb(
      new Point(position.x - 1, position.y),
      lines,
      heightAtPosition,
      peaks,
      trail,
      trails,
    );
  }
  if (position.y - 1 >= 0) {
    climb(
      new Point(position.x, position.y - 1),
      lines,
      heightAtPosition,
      peaks,
      trail,
      trails,
    );
  }
  if (position.x + 1 < lines[0].length) {
    climb(
      new Point(position.x + 1, position.y),
      lines,
      heightAtPosition,
      peaks,
      trail,
      trails,
    );
  }
  if (position.y + 1 < lines.length) {
    climb(
      new Point(position.x, position.y + 1),
      lines,
      heightAtPosition,
      peaks,
      trail,
      trails,
    );
  }
}
export function part1(input: string): number {
  const lines = input.split("\n").filter((line) => line.length > 0);
  return lines.reduce((acc, line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] == "0") {
        const peaks = new Set<string>();
        climb(new Point(x, y), lines, -1, peaks);
        // console.log(`Position: ${x}, ${y}`);
        // console.log(`Score: ${peaks.size}`);
        // console.log(peaks);
        acc += peaks.size;
      }
    }
    return acc;
  }, 0);
}

export function part2(input: string): number {
  const lines = input.split("\n").filter((line) => line.length > 0);
  return lines.reduce((acc, line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] == "0") {
        const peaks = new Set<string>();
        const trail: Point[] = [];
        const trails: Point[][] = [];
        climb(new Point(x, y), lines, -1, peaks, trail, trails);
        // console.log(`Position: ${x}, ${y}`);
        // console.log(`Score: ${peaks.size}`);
        // console.log(peaks);
        acc += trails.length;
      }
    }
    return acc;
  }, 0);
}

const input = fs.readFileSync("input.txt").toString();
console.log(part1(input));
console.log(part2(input));
