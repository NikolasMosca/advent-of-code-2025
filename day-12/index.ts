import { readFileSync } from "fs";
import { join } from "path";
import { readInput, canFitPresents } from "./utils";

export const solvePart1 = (input: string): number => {
  const { shapes, regions } = readInput(input);

  let validRegions = 0;
  for (const region of regions) {
    if (canFitPresents(region, shapes)) {
      validRegions++;
    }
  }

  return validRegions;
};

export const solvePart2 = (input: string): number => {
  // Part 2 will be implemented after understanding the requirements
  return 0;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 12 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
