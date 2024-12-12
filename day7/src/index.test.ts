import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { part1, part2, depthCount, generateOperators } from "./index";

const INPUT = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe("Day 7", () => {
  it("depth 1"),
    () => {
      assert.strictEqual(depthCount(2, 1), 1);
    };
  it("depth 1 with 3 operator"),
    () => {
      assert.strictEqual(depthCount(3, 1), 1);
    };
  it("depth 2"),
    () => {
      assert.strictEqual(depthCount(2, 2), 2);
    };
  it("depth 2 with 3 operator"),
    () => {
      assert.strictEqual(depthCount(3, 2), 9);
    };
  it("depth 3"),
    () => {
      assert.strictEqual(depthCount(2, 3), 4);
    };
  it("depth 4"),
    () => {
      assert.strictEqual(depthCount(2, 4), 8);
    };
  it("generate operators 1", () => {
    assert.deepStrictEqual(generateOperators(["+", "*"], 1), [["+"], ["*"]]);
  });
  it("generate operators 1", () => {
    assert.deepStrictEqual(generateOperators(["+", "*", "||"], 1), [
      ["+"],
      ["*"],
      ["||"],
    ]);
  });

  it("generate operators 2", () => {
    assert.deepStrictEqual(generateOperators(["+", "*"], 2), [
      ["+", "+"],
      ["+", "*"],
      ["*", "+"],
      ["*", "*"],
    ]);
  });
  it("generate operators 2", () => {
    assert.deepStrictEqual(generateOperators(["+", "*", "||"], 2), [
      ["+", "+"],
      ["+", "*"],
      ["+", "||"],
      ["*", "+"],
      ["*", "*"],
      ["*", "||"],
      ["||", "+"],
      ["||", "*"],
      ["||", "||"],
    ]);
  });
  it("generate operators 3", () => {
    assert.deepStrictEqual(generateOperators(["+", "*"], 3), [
      ["+", "+", "+"],
      ["+", "+", "*"],
      ["+", "*", "+"],
      ["+", "*", "*"],
      ["*", "+", "+"],
      ["*", "+", "*"],
      ["*", "*", "+"],
      ["*", "*", "*"],
    ]);
  });
  it("generator operator 4", () => {
    assert.deepStrictEqual(generateOperators(["+", "*"], 4), [
      ["+", "+", "+", "+"],
      ["+", "+", "+", "*"],
      ["+", "+", "*", "+"],
      ["+", "+", "*", "*"],
      ["+", "*", "+", "+"],
      ["+", "*", "+", "*"],
      ["+", "*", "*", "+"],
      ["+", "*", "*", "*"],
      ["*", "+", "+", "+"],
      ["*", "+", "+", "*"],
      ["*", "+", "*", "+"],
      ["*", "+", "*", "*"],
      ["*", "*", "+", "+"],
      ["*", "*", "+", "*"],
      ["*", "*", "*", "+"],
      ["*", "*", "*", "*"],
    ]);
  });
  it("Part 1", () => {
    assert.strictEqual(part1(INPUT), 3749);
  });
  it("Part 2", () => {
    assert.strictEqual(part2(INPUT), 11387);
  });
});
