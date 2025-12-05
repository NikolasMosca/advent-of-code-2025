import { readFileSync } from "fs";
import { join } from "path";
import {
  checkIfIngredientIsFresh,
  countFreshIngredientIdsFromRanges,
  parseInput,
} from "./utils";

export function solvePart1(input: string): number {
  const { ranges, ingredients } = parseInput(input);
  return ingredients.reduce((freshIngredients, ingredientId) => {
    return freshIngredients + Number(checkIfIngredientIsFresh(ranges, ingredientId));
  }, 0);
}

export function solvePart2(input: string): number {
  const { ranges } = parseInput(input);
  return countFreshIngredientIdsFromRanges(ranges);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 5 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
