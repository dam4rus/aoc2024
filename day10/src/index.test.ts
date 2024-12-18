import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { part1, part2 } from "./index";

const INPUT = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

describe("Day 10", () => {
  it("Part 1", () => {
    assert.strictEqual(part1(INPUT), 36);
  });
  it("Part 2", () => {
    assert.strictEqual(part2(INPUT), 81);
  });
});
