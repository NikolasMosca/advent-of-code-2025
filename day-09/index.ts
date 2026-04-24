import { readFileSync } from "fs";
import { join } from "path";
import { getLargestRectangle, readInput } from "./utils";

export const solvePart1 = (input: string): number => {
  const coordinates = readInput(input);
  return getLargestRectangle(coordinates);
};

export const solvePart2 = (input: string) => {
  return "Tried but failed for no time to spend on optimization on heap memory";
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 9 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
