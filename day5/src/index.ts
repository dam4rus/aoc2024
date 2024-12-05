import fs from "node:fs";

export function part1(input: string): number {
  const [orderInput, updatesInput] = input.split("\n\n");
  // console.log(`order: ${orderInput}`);
  // console.log(`updates: ${updatesInput}`);

  const orderMap = orderInput
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
  console.log(orderMap);

  return updatesInput
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split(",").map((n) => parseInt(n)))
    .filter((pages) => {
      for (let i = 0; i < pages.length - 1; i++) {
        const ordering = orderMap.get(pages[i]);
        if (ordering === undefined) {
          return false;
        }
        if (orderMap.get(pages[i]).includes(pages[i + 1])) {
          continue;
        }
        return false;
      }
      return true;
    })
    .map((pages) => pages[Math.floor(pages.length / 2)])
    .reduce((acc, value) => acc + value);
}

const input = fs.readFileSync("input.txt").toString();
console.log(part1(input));
