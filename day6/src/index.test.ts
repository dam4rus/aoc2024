import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { part1, part2 } from "./index";

const INPUT = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe("Day 6", () => {
  it("Part 1", () => {
    assert.strictEqual(part1(INPUT), 41);
  });
  it("Part 2", () => {
    assert.strictEqual(part2(INPUT), 6);
  });
});
