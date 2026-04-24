import { readFileSync } from "fs";
import { join } from "path";
import { parseInput, rotateDial } from "./utils";

export function solvePart1(input: string): number {
  const dialRotations = parseInput(input);
  const { password } = dialRotations.reduce(
    ({ dial, password }, { direction, clicks }) => {
      const { dial: updatedDial } = rotateDial(dial, direction, clicks);
      return {
        dial: updatedDial,
        password: updatedDial === 0 ? password + 1 : password,
      };
    },
    {
      dial: 50,
      password: 0,
    }
  );

  return password;
}

export function solvePart2(input: string): number {
  const dialRotations = parseInput(input);
  const { password } = dialRotations.reduce(
    ({ dial, password }, { direction, clicks }) => {
      const { dial: updatedDial, zeroCount } = rotateDial(dial, direction, clicks);
      return {
        dial: updatedDial,
        password: password + zeroCount,
      };
    },
    {
      dial: 50,
      password: 0,
    }
  );

  return password;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(join(import.meta.dirname, "input.txt"), "utf-8");

  console.log("Day 1 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
