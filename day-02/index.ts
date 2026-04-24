import { readFileSync } from "fs";
import { join } from "path";
import { parseInput, findRepeatedDigits } from "./utils";

export function solvePart1(input: string): number {
  const ranges = parseInput(input);
  const { total } = ranges.reduce(
    ({ total }, range) => {
      const { twice } = findRepeatedDigits(range);
      return {
        total: total + twice.reduce((prev, current) => prev + current, 0),
      };
    },
    {
      total: 0,
    }
  );

  return total;
}

export function solvePart2(input: string): number {
  const ranges = parseInput(input);
  const { total } = ranges.reduce(
    ({ total }, range) => {
      const { twice, threeTimes, fiveTimes, sevenTimes } = findRepeatedDigits(range);
      const allInvalid = new Set([...twice, ...threeTimes, ...fiveTimes, ...sevenTimes]);
      return {
        total: total + Array.from(allInvalid).reduce((prev, current) => prev + current, 0),
      };
    },
    {
      total: 0,
    }
  );

  return total;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 2 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
