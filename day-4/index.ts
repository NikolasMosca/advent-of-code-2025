import { readFileSync } from "fs";
import { join } from "path";
import { parseInput, scanMap, removeAllAccessibleRolls } from "./utils";

export function solvePart1(input: string): number {
  const map = parseInput(input);
  const { rollsAccessedByForklift } = scanMap(map);
  return rollsAccessedByForklift;
}

export function solvePart2(input: string): number {
  const map = parseInput(input);
  const { totalRemoved } = removeAllAccessibleRolls(map);
  return totalRemoved;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 4 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
