import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { part1, part2 } from "./index";

const INPUT = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe("Day 2", () => {
  it("Part 1", () => {
    console.log("Part 1 test");
    const reports = INPUT.split("\n")
      .filter((line) => line.length > 0)
      .map((line) => line.split(" ").map((level) => parseInt(level)));

    const safeReports = part1(reports);
    assert.strictEqual(safeReports, 2);
  });
  it("Part 2", () => {
    console.log("Part 2 test");
    const reports = INPUT.split("\n")
      .filter((line) => line.length > 0)
      .map((line) => line.split(" ").map((level) => parseInt(level)));

    const safeReports = part2(reports);
    assert.strictEqual(safeReports, 4);
  });
});
