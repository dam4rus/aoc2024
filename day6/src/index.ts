import fs from "node:fs";

enum Direction {
  Up,
  Right,
  Down,
  Left,
}

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

class Guard {
  constructor(
    public position: Point,
    public direction: Direction,
  ) {}

  public moveInGrid(grid: Grid): Guard {
    switch (this.direction) {
      case Direction.Up: {
        let obstaclesAhead = grid.obstacles
          .filter(
            (value) => value.x == this.position.x && value.y < this.position.y,
          )
          .sort((lhs, rhs) => {
            if (lhs.y > rhs.y) {
              return -1;
            } else if (lhs.y < rhs.y) {
              return 1;
            }
            return 0;
          });
        const newY = obstaclesAhead.length == 0 ? 0 : obstaclesAhead[0].y + 1;
        return new Guard({ x: this.position.x, y: newY }, Direction.Right);
      }
      case Direction.Right: {
        let obstaclesAhead = grid.obstacles
          .filter(
            (value) => value.x > this.position.x && value.y == this.position.y,
          )
          .sort((lhs, rhs) => {
            if (lhs.x < rhs.x) {
              return -1;
            } else if (lhs.x > rhs.x) {
              return 1;
            }
            return 0;
          });
        const newX =
          obstaclesAhead.length == 0 ? grid.width : obstaclesAhead[0].x - 1;
        return new Guard({ x: newX, y: this.position.y }, Direction.Down);
      }
      case Direction.Down: {
        let obstaclesAhead = grid.obstacles
          .filter(
            (value) => value.x == this.position.x && value.y > this.position.y,
          )
          .sort((lhs, rhs) => {
            if (lhs.y < rhs.y) {
              return -1;
            } else if (lhs.y > rhs.y) {
              return 1;
            }
            return 0;
          });
        const newY =
          obstaclesAhead.length == 0 ? grid.height : obstaclesAhead[0].y - 1;
        return new Guard({ x: this.position.x, y: newY }, Direction.Left);
      }
      case Direction.Left: {
        let obstaclesAhead = grid.obstacles
          .filter(
            (value) => value.x < this.position.x && value.y == this.position.y,
          )
          .sort((lhs, rhs) => {
            if (lhs.x > rhs.x) {
              return -1;
            } else if (lhs.x < rhs.x) {
              return 1;
            }
            return 0;
          });
        const newX = obstaclesAhead.length == 0 ? 0 : obstaclesAhead[0].x + 1;
        return new Guard({ x: newX, y: this.position.y }, Direction.Up);
      }
    }
  }

  public walk(grid: Grid): {
    visited: Set<string>;
    loop: boolean;
  } {
    let visitedPositions = new Set<string>([JSON.stringify(this.position)]);
    let path = new Set<string>([JSON.stringify(this)]);
    while (true) {
      switch (this.direction) {
        case Direction.Up: {
          const guardAfterMove = this.moveInGrid(grid);
          for (
            let y = this.position.y - 1;
            y >= guardAfterMove.position.y;
            y--
          ) {
            this.position.y = y;
            if (path.has(JSON.stringify(this))) {
              return { visited: visitedPositions, loop: true };
            }
            visitedPositions.add(JSON.stringify(this.position));
            path.add(JSON.stringify(this));
          }

          if (guardAfterMove.position.y === 0) {
            return { visited: visitedPositions, loop: false };
          }

          this.direction = guardAfterMove.direction;
          break;
        }
        case Direction.Right: {
          const guardAfterMove = this.moveInGrid(grid);
          for (
            let x = this.position.x + 1;
            x <= guardAfterMove.position.x;
            x++
          ) {
            this.position.x = x;
            if (path.has(JSON.stringify(this))) {
              return { visited: visitedPositions, loop: true };
            }
            visitedPositions.add(JSON.stringify(this.position));
            path.add(JSON.stringify(this));
          }

          if (guardAfterMove.position.x === grid.width) {
            return { visited: visitedPositions, loop: false };
          }

          this.direction = guardAfterMove.direction;
          break;
        }
        case Direction.Down: {
          const guardAfterMove = this.moveInGrid(grid);
          for (
            let y = this.position.y + 1;
            y <= guardAfterMove.position.y;
            y++
          ) {
            this.position.y = y;
            if (path.has(JSON.stringify(this))) {
              return { visited: visitedPositions, loop: true };
            }
            visitedPositions.add(JSON.stringify(this.position));
            path.add(JSON.stringify(this));
          }

          if (guardAfterMove.position.y === grid.height) {
            return { visited: visitedPositions, loop: false };
          }

          this.direction = guardAfterMove.direction;
          break;
        }
        case Direction.Left: {
          const guardAfterMove = this.moveInGrid(grid);
          for (
            let x = this.position.x - 1;
            x >= guardAfterMove.position.x;
            x--
          ) {
            this.position.x = x;
            if (path.has(JSON.stringify(this))) {
              return { visited: visitedPositions, loop: true };
            }
            visitedPositions.add(JSON.stringify(this.position));
            path.add(JSON.stringify(this));
          }

          if (guardAfterMove.position.x === 0) {
            return { visited: visitedPositions, loop: false };
          }
          this.position = guardAfterMove.position;
          this.direction = guardAfterMove.direction;
          break;
        }
      }
    }
  }
}

class Grid {
  public width: number;
  public height: number;
  constructor(
    public obstacles: Array<Point>,
    public startPosition: Point,
  ) {
    const { x: gridWidth, y: gridHeight } = obstacles.reduce(
      (acc, value) => {
        if (value.x > acc.x) {
          acc.x = value.x;
        }
        if (value.y > acc.y) {
          acc.y = value.y;
        }
        return acc;
      },
      { x: 0, y: 0 },
    );
    this.width = gridWidth;
    this.height = gridHeight;
  }

  public static fromInput(input: string): Grid {
    const lines = input.split("\n");
    let obstacles: Array<Point> = [];
    let startPosition: Point | null;
    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        const c = lines[y][x];
        if (c == "#") {
          obstacles.push({ x, y });
        } else if (c == "^") {
          startPosition = { x, y };
        }
      }
    }
    if (startPosition == null) {
      throw new Error("Could not find guard");
    }

    return new Grid(obstacles, startPosition);
  }
}

export function part1(input: string): number {
  const grid = Grid.fromInput(input);
  let guard = new Guard(grid.startPosition, Direction.Up);
  const { visited } = guard.walk(grid);
  return visited.size;
}

export function part2(input: string): number {
  const grid = Grid.fromInput(input);
  const { visited } = new Guard(
    new Point(grid.startPosition.x, grid.startPosition.y),
    Direction.Up,
  ).walk(grid);
  let loopCount = 0;
  for (let posJson of visited) {
    const position: Point = JSON.parse(posJson);
    const newGrid = new Grid(
      [...grid.obstacles],
      new Point(grid.startPosition.x, grid.startPosition.y),
    );
    newGrid.obstacles.push(position);
    const { loop } = new Guard(
      new Point(grid.startPosition.x, grid.startPosition.y),
      Direction.Up,
    ).walk(newGrid);
    if (loop) {
      loopCount++;
    }
  }
  return loopCount;
}

const input = fs.readFileSync("input.txt").toString();
console.log(part1(input));
console.log(part2(input));
