import { readFileSync } from "fs";
import { join } from "path";
import { parseInput, parseInputForPart2, getResultFromCalculation } from "./utils";

export function solvePart1(input: string): number {
  const problems = parseInput(input);
  const results = problems.map(({ elements, sign }) =>
    getResultFromCalculation(elements, sign)
  );
  return results.reduce((sum, result) => sum + result, 0);
}

export function solvePart2(input: string): number {
  const problems = parseInputForPart2(input);
  const results = problems.map(({ elements, sign }) =>
    getResultFromCalculation(elements, sign)
  );
  return results.reduce((sum, result) => sum + result, 0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 6 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
