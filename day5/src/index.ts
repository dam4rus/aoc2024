import fs from "node:fs";

function getOrderMap(input: string): Map<number, number[]> {
  const orderMap = input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split("|"))
    .map(([leftPage, rightPage]) => [parseInt(leftPage), parseInt(rightPage)])
    .reduce((acc, [leftPage, rightPage]) => {
      let updateBefore = acc.get(leftPage) || [];
      updateBefore.push(rightPage);
      acc.set(leftPage, updateBefore);
      return acc;
    }, new Map<number, number[]>());
  // console.log(orderMap);
  return orderMap;
}

function partitionUpdates(
  input: string,
  orderMap: Map<number, number[]>,
): { validUpdates: number[][]; invalidUpdates: number[][] } {
  return input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split(",").map((n) => parseInt(n)))
    .reduce(
      (acc, pages) => {
        for (let i = 0; i < pages.length - 1; i++) {
          const ordering = orderMap.get(pages[i]);
          if (ordering !== undefined && ordering.includes(pages[i + 1])) {
            continue;
          }
          acc.invalidUpdates.push(pages);
          return acc;
        }
        acc.validUpdates.push(pages);
        return acc;
      },
      { validUpdates: [], invalidUpdates: [] },
    );
}

export function part1(input: string): number {
  const [orderInput, updatesInput] = input.split("\n\n");

  const { validUpdates } = partitionUpdates(
    updatesInput,
    getOrderMap(orderInput),
  );
  return validUpdates
    .map((pages) => pages[Math.floor(pages.length / 2)])
    .reduce((acc, value) => acc + value);
}

export function part2(input: string): number {
  const [orderInput, updatesInput] = input.split("\n\n");

  const orderMap = getOrderMap(orderInput);
  const { invalidUpdates } = partitionUpdates(updatesInput, orderMap);

  // console.log(validUpdates);
  // console.log(invalidUpdates);
  return invalidUpdates
    .map((pages) => {
      for (let i = 0; i < pages.length - 1; i++) {
        for (let j = i + 1; j < pages.length; j++) {
          const ordering = orderMap.get(pages[i]);
          if (ordering !== undefined && ordering.includes(pages[j])) {
            continue;
          }
          // console.log(`Before swap: ${pages}`);
          const temp = pages[j];
          pages[j] = pages[i];
          pages[i] = temp;
          // console.log(`After swap: ${pages}`);
        }
      }
      return pages;
    })
    .map((pages) => pages[Math.floor(pages.length / 2)])
    .reduce((acc, value) => acc + value);
}

const input = fs.readFileSync("input.txt").toString();
console.log(part1(input));
console.log(part2(input));
