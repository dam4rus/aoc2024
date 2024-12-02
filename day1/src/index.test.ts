import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {part1, part2} from './index';

const INPUT = `3   4
4   3
2   5
1   3
3   9
3   3`

describe('Day 1', () => {
  it('Part 1', () => {
    assert.strictEqual(part1(INPUT), 11)
  })

  it('Part 2', () => {
    assert.strictEqual(part2(INPUT), 31)
  })
})


