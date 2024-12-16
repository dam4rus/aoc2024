import fs from "node:fs";

class Block {
  public constructor(
    public id: number | null,
    public startIndex: number,
    public size: number,
  ) {}
}

class Sector {
  public spaces: (number | null)[] = [];
  public constructor(id: number, fileLength: number, freeSpace: number) {
    for (let i = 0; i < fileLength; i++) {
      this.spaces.push(id);
    }
    for (let i = 0; i < freeSpace; i++) {
      this.spaces.push(null);
    }
  }

  public isFull(): boolean {
    return this.spaces.every((value) => value != null);
  }

  public isAllBlockFree(): boolean {
    return this.spaces.every((value) => value == null);
  }

  public blocks(): Block[] {
    const blocks: Block[] = [];
    this.spaces.forEach((id, i) => {
      if (blocks.length === 0) {
        blocks.push(new Block(id, i, 1));
        return;
      }
      if (blocks[blocks.length - 1].id === id) {
        blocks[blocks.length - 1].size++;
        return;
      }
      blocks.push(new Block(id, i, 1));
    });
    return blocks;
  }

  public moveFrom(sector: Sector) {
    let swapIndex = null;
    for (let i = sector.spaces.length - 1; i >= 0; i--) {
      if (sector.spaces[i] != null) {
        swapIndex = i;
        break;
      }
    }
    if (swapIndex === null) {
      return;
    }

    for (let i = 0; i < this.spaces.length; i++) {
      if (this.spaces[i] != null) {
        continue;
      }
      this.spaces[i] = sector.spaces[swapIndex];
      sector.spaces[swapIndex] = null;
      swapIndex--;
      if (swapIndex < 0) {
        return;
      }
    }
  }

  public moveWholeFilesFrom(sector: Sector) {
    this.blocks()
      .filter((block) => block.id === null)
      .sort((lhs, rhs) => {
        if (lhs.size > rhs.size) {
          return -1;
        }
        if (lhs.size < rhs.size) {
          return 1;
        }
        return 0;
      })
      .forEach((freeBlock) => {
        sector
          .blocks()
          .filter((block) => block.id !== null)
          .forEach((fileBlock) => {
            if (freeBlock.size >= fileBlock.size) {
              for (let i = 0; i < fileBlock.size; i++) {
                this.spaces[freeBlock.startIndex + i] =
                  sector.spaces[fileBlock.startIndex + i];
                sector.spaces[fileBlock.startIndex + i] = null;
              }
            }
          });
      });
  }
}

function parseInput(input: string): Sector[] {
  const sectors: Sector[] = [];
  for (let i = 0; i < input.length; i += 2) {
    sectors.push(new Sector(i / 2, parseInt(input[i]), parseInt(input[i + 1])));
  }
  return sectors;
}

export function part1(input: string): number {
  const sectors = parseInput(input);
  let i = 0;
  let j = sectors.length - 1;
  while (true) {
    if (i >= j) {
      break;
    }
    sectors[i].moveFrom(sectors[j]);
    if (sectors[i].isFull()) {
      i++;
    }
    if (sectors[j].isAllBlockFree()) {
      j--;
    }
  }
  let position = 0;
  let result = 0;
  for (const sector of sectors) {
    for (const block of sector.spaces) {
      result += block === null ? 0 : block * position;
      position++;
    }
  }
  return result;
}

export function part2(input: string): number {
  const sectors = parseInput(input);
  for (let i = sectors.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      sectors[j].moveWholeFilesFrom(sectors[i]);

      if (sectors[i].isAllBlockFree()) {
        break;
      }
    }
  }
  let position = 0;
  let defragmented = "";
  let result = 0;
  for (const sector of sectors) {
    defragmented += "|";
    for (const block of sector.spaces) {
      result += block === null ? 0 : block * position;
      defragmented += block === null ? "[.]" : `[${block}]`;
      position++;
    }
  }

  return result;
}

const input = fs.readFileSync("input.txt").toString().split("\n")[0];
console.log(part1(input));
console.log(part2(input));
