import { describe, it, expect } from "vitest";
import { solvePart1, solvePart2 } from "./index";
import { parseInput, checkIfIngredientIsFresh, countFreshIngredientIdsFromRanges } from "./utils";

const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

describe("Day 5", () => {
  describe("parseInput", () => {
    it("should parse the input correctly", () => {
      const result = parseInput(exampleInput);
      expect(result).toEqual({
        ranges: [
          { start: 3, end: 5 },
          { start: 10, end: 14 },
          { start: 12, end: 18 },
          { start: 16, end: 20 },
        ],
        ingredients: [1, 5, 8, 11, 17, 32],
      });
    });
  });

  describe("checkIfIngredientIsFresh", () => {
    const { ranges } = parseInput(exampleInput);

    it("should return false for ingredient ID 1 (spoiled)", () => {
      const result = checkIfIngredientIsFresh(ranges, 1);
      expect(result).toBe(false);
    });

    it("should return true for ingredient ID 5 (fresh, falls into range 3-5)", () => {
      const result = checkIfIngredientIsFresh(ranges, 5);
      expect(result).toBe(true);
    });

    it("should return false for ingredient ID 8 (spoiled)", () => {
      const result = checkIfIngredientIsFresh(ranges, 8);
      expect(result).toBe(false);
    });

    it("should return true for ingredient ID 11 (fresh, falls into range 10-14)", () => {
      const result = checkIfIngredientIsFresh(ranges, 11);
      expect(result).toBe(true);
    });

    it("should return true for ingredient ID 17 (fresh, falls into range 16-20 and 12-18)", () => {
      const result = checkIfIngredientIsFresh(ranges, 17);
      expect(result).toBe(true);
    });

    it("should return false for ingredient ID 32 (spoiled)", () => {
      const result = checkIfIngredientIsFresh(ranges, 32);
      expect(result).toBe(false);
    });
  });

  describe("countFreshIngredientIdsFromRanges", () => {
    it("should return 14 for the example ranges (3-5, 10-14, 16-20, 12-18)", () => {
      const { ranges } = parseInput(exampleInput);
      const result = countFreshIngredientIdsFromRanges(ranges);
      expect(result).toBe(14);
    });

    it("should return 0 for empty ranges array", () => {
      const result = countFreshIngredientIdsFromRanges([]);
      expect(result).toBe(0);
    });

    it("should return 3 for a single range 1-3", () => {
      const result = countFreshIngredientIdsFromRanges([{ start: 1, end: 3 }]);
      expect(result).toBe(3);
    });

    it("should return 1 for a single element range 5-5", () => {
      const result = countFreshIngredientIdsFromRanges([{ start: 5, end: 5 }]);
      expect(result).toBe(1);
    });

    it("should return 6 for non-overlapping ranges 1-3 and 5-7", () => {
      const result = countFreshIngredientIdsFromRanges([
        { start: 1, end: 3 },
        { start: 5, end: 7 },
      ]);
      expect(result).toBe(6);
    });

    it("should return 6 for adjacent ranges 1-3 and 4-6", () => {
      const result = countFreshIngredientIdsFromRanges([
        { start: 1, end: 3 },
        { start: 4, end: 6 },
      ]);
      expect(result).toBe(6);
    });

    it("should return 5 for partially overlapping ranges 1-3 and 3-5", () => {
      const result = countFreshIngredientIdsFromRanges([
        { start: 1, end: 3 },
        { start: 3, end: 5 },
      ]);
      expect(result).toBe(5);
    });

    it("should return 5 for completely overlapping ranges 1-5 and 2-4", () => {
      const result = countFreshIngredientIdsFromRanges([
        { start: 1, end: 5 },
        { start: 2, end: 4 },
      ]);
      expect(result).toBe(5);
    });

    it("should handle multiple overlapping ranges correctly 1-10, 5-15, 12-20", () => {
      const result = countFreshIngredientIdsFromRanges([
        { start: 1, end: 10 },
        { start: 5, end: 15 },
        { start: 12, end: 20 },
      ]);
      expect(result).toBe(20);
    });

    it("should handle triple overlapping ranges correctly 1-10, 5-15, 7-12", () => {
      // 1-10: [1,2,3,4,5,6,7,8,9,10]
      // 5-15: [5,6,7,8,9,10,11,12,13,14,15]
      // 7-12: [7,8,9,10,11,12]
      // Union: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] = 15 IDs
      const result = countFreshIngredientIdsFromRanges([
        { start: 1, end: 10 },
        { start: 5, end: 15 },
        { start: 7, end: 12 },
      ]);
      expect(result).toBe(15);
    });

    it("should handle four overlapping ranges with complex overlaps 1-5, 3-8, 6-10, 9-12", () => {
      // 1-5: [1,2,3,4,5]
      // 3-8: [3,4,5,6,7,8]
      // 6-10: [6,7,8,9,10]
      // 9-12: [9,10,11,12]
      // Union: [1,2,3,4,5,6,7,8,9,10,11,12] = 12 IDs
      const result = countFreshIngredientIdsFromRanges([
        { start: 1, end: 5 },
        { start: 3, end: 8 },
        { start: 6, end: 10 },
        { start: 9, end: 12 },
      ]);
      expect(result).toBe(12);
    });

    it("should handle ranges with nested overlaps 1-20, 5-15, 8-12, 10-11", () => {
      // All ranges nested within 1-20
      // Union should be [1..20] = 20 IDs
      const result = countFreshIngredientIdsFromRanges([
        { start: 1, end: 20 },
        { start: 5, end: 15 },
        { start: 8, end: 12 },
        { start: 10, end: 11 },
      ]);
      expect(result).toBe(20);
    });
  });

  describe("Part 1", () => {
    it("should solve the example and return 3 fresh ingredients", () => {
      const result = solvePart1(exampleInput);
      expect(result).toBe(3);
    });
  });

  describe("Part 2", () => {
    it("should solve the example and return 14 fresh ingredient IDs", () => {
      const result = solvePart2(exampleInput);
      expect(result).toBe(14);
    });
  });
});
