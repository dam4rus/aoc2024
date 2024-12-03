import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { part1, part2 } from "./index";

describe("Day 3", () => {
  it("Part 1", () => {
    const INPUT = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
    assert.strictEqual(part1(INPUT), 161);
  });
  it("Part 2", () => {
    const INPUT = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
    assert.strictEqual(part2(INPUT, true)[0], 48);
  });
});
