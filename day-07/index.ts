import { readFileSync } from "fs";
import { join } from "path";
import { parseInput, calculateBeam } from "./utils";

export const solvePart1 = (input: string): number => {
  const grid = parseInput(input);
  const result = calculateBeam(grid);
  return result.splitTimes;
};

export const solvePart2 = (input: string): number => {
  const grid = parseInput(input);
  const result = calculateBeam(grid);
  return result.timelines;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 7 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
