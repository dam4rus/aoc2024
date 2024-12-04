import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { part1, part2 } from "./index";

const INPUT = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

describe("Day 4", () => {
  it("Part 1", () => {
    assert.strictEqual(part1(INPUT), 18);
  });
  it("Part 2", () => {
    assert.strictEqual(part2(INPUT), 9);
  });
});
