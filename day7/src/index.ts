import fs from "node:fs";

export function depthCount(depth: number): number {
  let result = 1;
  for (let i = 0; i < depth - 1; i++) {
    result *= 2;
  }
  return result;
}

function appendOperators(list: string[][], depth: number) {
  if (list.length <= 1) {
    return;
  }
  const operatorCount = depthCount(depth);
  for (let i = 0; i < Math.floor(list.length / 2); i++) {
    list[i].push("+");
  }
  for (let i = Math.floor(list.length / 2); i < list.length; i++) {
    list[i].push("*");
  }
  appendOperators(list.slice(0, operatorCount), depth - 1);
  appendOperators(list.slice(operatorCount), depth - 1);
}

export function generateOperators(depth: number): string[][] {
  if (depth <= 0) {
    return;
  }
  const list: string[][] = [];
  const operatorCount = depthCount(depth);
  for (let i = 0; i < operatorCount; i++) {
    list.push(["+"]);
  }
  for (let i = 0; i < operatorCount; i++) {
    list.push(["*"]);
  }
  appendOperators(list.slice(0, operatorCount), depth - 1);
  appendOperators(list.slice(operatorCount), depth - 1);
  return list;
}

export function part1(input: string): number {
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
      // console.log(`test value: ${testValue}`);
      // console.log(numbers.length - 1);
      // console.log(generateOperators(numbers.length - 1));
      for (let operators of generateOperators(numbers.length - 1)) {
        // console.log(operators);
        const result = numbers.reduce((acc, value, i) => {
          // console.log(i);
          // console.log(operators[i - 1]);
          if (operators[i - 1] == "*") {
            return acc * value;
          }
          return acc + value;
        });
        // console.log(result);
        if (result === testValue) {
          return true;
        }
      }
      return false;
    })
    .reduce((acc, { testValue }) => acc + testValue, 0);
}

const input = fs.readFileSync("input.txt").toString();
console.log(part1(input));
