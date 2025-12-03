import { readFileSync } from "fs";
import { join } from "path";
import { parseInput, findLargestJoltageFromBatteryBank } from "./utils";

export function solvePart1(input: string): number {
  const batteryBanks = parseInput(input);
  const { total } = batteryBanks.reduce(
    ({ total }, batteryBank) => {
      const { bestJoltage } = findLargestJoltageFromBatteryBank(batteryBank);
      return {
        total: total + bestJoltage,
      };
    },
    {
      total: 0,
    }
  );

  return total;
}

export function solvePart2(input: string): number {
  const batteryBanks = parseInput(input);
  const { total } = batteryBanks.reduce(
    ({ total }, batteryBank) => {
      const { bestJoltage } = findLargestJoltageFromBatteryBank(batteryBank, 12);
      return {
        total: total + bestJoltage,
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

  console.log("Day 3 - Advent of Code 2025");
  console.log("----------------------------");
  console.log("Part 1:", solvePart1(input));
  console.log("Part 2:", solvePart2(input));
}
