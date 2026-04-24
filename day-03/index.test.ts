import { describe, it, expect } from "vitest";
import { solvePart1, solvePart2 } from "./index";
import { parseInput, findLargestJoltageFromBatteryBank, findBestBattery } from "./utils";

const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

describe("Day 3", () => {
  describe("parseInput", () => {
    it("should parse the input correctly", () => {
      const result = parseInput(exampleInput);
      expect(result).toEqual([
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1],
        [8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        [2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8],
        [8, 1, 8, 1, 8, 1, 9, 1, 1, 1, 1, 2, 1, 1, 1],
      ]);
    });
  });

  describe("findBestBattery", () => {
    it("should find the highest battery when it is at the beginning", () => {
      const bank = [9, 8, 7, 6, 5];
      const result = findBestBattery(bank);
      expect(result).toEqual({ battery: 9, index: 0 });
    });

    it("should find the highest battery when it is at the end", () => {
      const bank = [1, 2, 3, 4, 9];
      const result = findBestBattery(bank);
      expect(result).toEqual({ battery: 9, index: 4 });
    });

    it("should find the highest battery when it is in the middle", () => {
      const bank = [1, 2, 9, 4, 5];
      const result = findBestBattery(bank);
      expect(result).toEqual({ battery: 9, index: 2 });
    });

    it("should return the first occurrence when there are duplicate highest values", () => {
      const bank = [8, 9, 7, 9, 6];
      const result = findBestBattery(bank);
      expect(result).toEqual({ battery: 9, index: 1 });
    });

    it("should handle an array with all same values", () => {
      const bank = [5, 5, 5, 5];
      const result = findBestBattery(bank);
      expect(result).toEqual({ battery: 5, index: 0 });
    });

    it("should handle a single battery", () => {
      const bank = [7];
      const result = findBestBattery(bank);
      expect(result).toEqual({ battery: 7, index: 0 });
    });
  });

  describe("findLargestJoltageFromBatteryBank", () => {
    it("should find 98 as the largest joltage from bank 987654321111111", () => {
      const bank = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1];
      const result = findLargestJoltageFromBatteryBank(bank);
      expect(result.bestJoltage).toBe(98);
    });

    it("should find 89 as the largest joltage from bank 811111111111119", () => {
      const bank = [8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9];
      const result = findLargestJoltageFromBatteryBank(bank);
      expect(result.bestJoltage).toBe(89);
    });

    it("should find 78 as the largest joltage from bank 234234234234278", () => {
      const bank = [2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8];
      const result = findLargestJoltageFromBatteryBank(bank);
      expect(result.bestJoltage).toBe(78);
    });

    it("should find 92 as the largest joltage from bank 818181911112111", () => {
      const bank = [8, 1, 8, 1, 8, 1, 9, 1, 1, 1, 1, 2, 1, 1, 1];
      const result = findLargestJoltageFromBatteryBank(bank);
      expect(result.bestJoltage).toBe(92);
    });
  });

  describe("Part 1", () => {
    it("should solve the example with total output joltage of 357", () => {
      const result = solvePart1(exampleInput);
      expect(result).toBe(357);
    });
  });

  describe("findLargestJoltageFromBatteryBank with 12 batteries", () => {
    it("should find 987654321111 as the largest joltage from bank 987654321111111", () => {
      const bank = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1];
      const result = findLargestJoltageFromBatteryBank(bank, 12);
      expect(result.bestJoltage).toBe(987654321111);
    });

    it("should find 811111111119 as the largest joltage from bank 811111111111119", () => {
      const bank = [8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9];
      const result = findLargestJoltageFromBatteryBank(bank, 12);
      expect(result.bestJoltage).toBe(811111111119);
    });

    it("should find 434234234278 as the largest joltage from bank 234234234234278", () => {
      const bank = [2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8];
      const result = findLargestJoltageFromBatteryBank(bank, 12);
      expect(result.bestJoltage).toBe(434234234278);
    });

    it("should find 888911112111 as the largest joltage from bank 818181911112111", () => {
      const bank = [8, 1, 8, 1, 8, 1, 9, 1, 1, 1, 1, 2, 1, 1, 1];
      const result = findLargestJoltageFromBatteryBank(bank, 12);
      expect(result.bestJoltage).toBe(888911112111);
    });
  });

  describe("Part 2", () => {
    it("should solve the example with total output joltage of 3121910778619", () => {
      const result = solvePart2(exampleInput);
      expect(result).toBe(3121910778619);
    });
  });
});
