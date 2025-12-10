import { readFileSync } from "fs";
import { join } from "path";
import {
  readInput,
  findCircuitsForJunctionBoxes,
  findLastConnectionToUnify,
} from "./utils";

export const solvePart1 = (input: string): number => {
  const junctionBoxes = readInput(input);
  const result = findCircuitsForJunctionBoxes(junctionBoxes, 1000);

  const sortedSizes = result.circuits
    .map((circuit) => circuit.length)
    .sort((a, b) => b - a);

  return sortedSizes[0] * sortedSizes[1] * sortedSizes[2];
};

export const solvePart2 = (input: string): number => {
  const junctionBoxes = readInput(input);
  const lastConnection = findLastConnectionToUnify(junctionBoxes);

  return lastConnection.box1.x * lastConnection.box2.x;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 8 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
