import fs from "node:fs"

function parseInput(input: string): number[][] {
  const numbers = input.split('\n').filter((line) => line.length > 0).map((line) => {
    const numbers = line.split('   ')
    const left = parseInt(numbers[0])
    const right = parseInt(numbers[1])
    return [left, right]
  })

  const leftNumbers = numbers.flatMap((numbers) => numbers[0])
  const rightNumbers = numbers.flatMap((numbers) => numbers[1])
  leftNumbers.sort()
  rightNumbers.sort()
  return [leftNumbers, rightNumbers]
}

export function part1(input: string): number {
  const [leftNumbers, rightNumbers] = parseInput(input)
  return leftNumbers.map((leftNumber, i) => Math.abs(leftNumber - rightNumbers[i])).reduce((acc, value) => {
    return acc + value
  })
}

export function part2(input: string): number {
  const [leftNumbers, rightNumbers] = parseInput(input)
  const rightNumberGrouped = rightNumbers.reduce((acc, value) => {
    acc.set(value, acc.get(value) + 1 || 1)
    return acc
  }, new Map<number, number>())

  return leftNumbers.map((leftNumber) => leftNumber * (rightNumberGrouped.get(leftNumber) || 0)).reduce((acc, value) => {
    return acc + value
  })
}

const input = fs.readFileSync('input.txt').toString()
console.log(part1(input))
console.log(part2(input))
