import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { part1, part2 } from "./index";

const INPUT = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

describe("Day 5", () => {
  it("Part 1", () => {
    assert.strictEqual(part1(INPUT), 143);
  });

  it("Part 2", () => {
    assert.strictEqual(part2(INPUT), 123);
  });
});
