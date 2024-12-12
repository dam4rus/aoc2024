import fs from "node:fs";

export function depthCount(operatorCount: number, depth: number): number {
  let result = 1;
  for (let i = 0; i < depth - 1; i++) {
    result *= operatorCount;
  }
  return result;
}

function appendOperators(list: string[][], operators: string[], depth: number) {
  if (list.length <= 1) {
    return;
  }
  const operatorCount = depthCount(operators.length, depth);
  operators.forEach((operator, i) => {
    for (let l of list.slice(i * operatorCount, (i + 1) * operatorCount)) {
      l.push(operator);
    }
    appendOperators(
      list.slice(i * operatorCount, (i + 1) * operatorCount),
      operators,
      depth - 1,
    );
  });
}

export function generateOperators(
  operators: string[],
  depth: number,
): string[][] {
  if (depth <= 0) {
    return;
  }
  const list: string[][] = [];
  const operatorCount = depthCount(operators.length, depth);
  operators.forEach((operator, i) => {
    for (let i = 0; i < operatorCount; i++) {
      list.push([operator]);
    }
    appendOperators(
      list.slice(i * operatorCount, (i + 1) * operatorCount),
      operators,
      depth - 1,
    );
  });
  return list;
}

function sum(input: string, operators: string[]): number {
  return input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      const [testValueString, numberStrings] = line
        .split(":")
        .filter((value) => value.length > 0);
      const testValue = parseInt(testValueString);
      const numbers = numberStrings
        .split(" ")
        .filter((value) => value.length > 0)
        .map((number) => parseInt(number.trim()));
      return { testValue: testValue, numbers: numbers };
    })
    .filter(({ testValue, numbers }) => {
      for (let ops of generateOperators(operators, numbers.length - 1)) {
        const result = numbers.reduce((acc, value, i) => {
          if (ops[i - 1] === "*") {
            return acc * value;
          }
          if (ops[i - 1] === "||") {
            // console.log(`testValue = ${testValue}`);
            // console.log(`acc: ${acc}, value: ${value}`);
            // console.log(parseInt(acc.toString() + value.toString()));
            return parseInt(acc.toString() + value.toString());
          }
          return acc + value;
        });
        if (result === testValue) {
          return true;
        }
      }
      return false;
    })
    .reduce((acc, { testValue }) => acc + testValue, 0);
}

export function part1(input: string): number {
  return sum(input, ["+", "*"]);
}

export function part2(input: string): number {
  return sum(input, ["+", "*", "||"]);
}

const input = fs.readFileSync("input.txt").toString();
console.log(part1(input));
console.log(part2(input));
