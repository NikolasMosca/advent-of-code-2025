import { readFileSync } from "fs";
import { join } from "path";
import { readInput, countPaths, countPathsThrough } from "./utils";

export const solvePart1 = (input: string): number => {
  const graph = readInput(input);
  return countPaths(graph, "you", "out");
};

export const solvePart2 = (input: string): number => {
  const graph = readInput(input);
  return countPathsThrough(graph, "svr", "out", ["dac", "fft"]);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 11 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
