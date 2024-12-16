import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { part1, part2 } from "./index";

const INPUT = "2333133121414131402";

describe("Day 9", () => {
  it("Part 1", () => {
    assert.strictEqual(part1(INPUT), 1928);
  });
  it("Part 2", () => {
    assert.strictEqual(part2(INPUT), 2858);
  });
});
