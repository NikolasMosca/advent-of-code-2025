import { describe, it, expect } from "vitest";
import { solvePart1, solvePart2 } from "./index";
import {
  parseInput,
  scanMap,
  countRollsOfPaperAround,
  removeAllAccessibleRolls,
  CellType,
} from "./utils";

const exampleInput = `..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.`;

describe("Day 4", () => {
  describe("parseInput", () => {
    it("should parse the input correctly", () => {
      const result = parseInput(exampleInput);
      expect(result).toEqual([
        [".", ".", "x", "x", ".", "x", "x", "@", "x", "."],
        ["x", "@", "@", ".", "@", ".", "@", ".", "@", "@"],
        ["@", "@", "@", "@", "@", ".", "x", ".", "@", "@"],
        ["@", ".", "@", "@", "@", "@", ".", ".", "@", "."],
        ["x", "@", ".", "@", "@", "@", "@", ".", "@", "x"],
        [".", "@", "@", "@", "@", "@", "@", "@", ".", "@"],
        [".", "@", ".", "@", ".", "@", ".", "@", "@", "@"],
        ["x", ".", "@", "@", "@", ".", "@", "@", "@", "@"],
        [".", "@", "@", "@", "@", "@", "@", "@", "@", "."],
        ["x", ".", "x", ".", "@", "@", "@", ".", "x", "."],
      ]);
    });
  });

  describe("countRollsOfPaperAround", () => {
    it("should throw error if cell is not a RollsPaper", () => {
      const testMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      expect(() => countRollsOfPaperAround(testMap, 1, 1)).toThrow(
        "This cell isn't a RollsPaper"
      );
    });

    it("should throw error if cell is a ForkLift", () => {
      const testMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.ForkLift, CellType.Empty],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      expect(() => countRollsOfPaperAround(testMap, 1, 1)).toThrow(
        "This cell isn't a RollsPaper"
      );
    });

    it("should return empty Map when no rolls around center position", () => {
      const testMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.RollsPaper, CellType.Empty],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      const result = countRollsOfPaperAround(testMap, 1, 1);
      expect(result.size).toBe(0);
    });

    it("should return Map with all 8 adjacent rolls when surrounded", () => {
      const testMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
      ];
      const result = countRollsOfPaperAround(testMap, 1, 1);
      expect(result.size).toBe(8);
      expect(result.get("0-0")).toBe(1);
      expect(result.get("1-0")).toBe(1);
      expect(result.get("2-0")).toBe(1);
      expect(result.get("0-1")).toBe(1);
      expect(result.get("2-1")).toBe(1);
      expect(result.get("0-2")).toBe(1);
      expect(result.get("1-2")).toBe(1);
      expect(result.get("2-2")).toBe(1);
    });

    it("should handle top-left corner position (only 3 adjacent cells)", () => {
      const testMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.RollsPaper, CellType.Empty],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.Empty],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      const result = countRollsOfPaperAround(testMap, 0, 0);
      expect(result.size).toBe(3);
      expect(result.get("1-0")).toBe(1);
      expect(result.get("0-1")).toBe(1);
      expect(result.get("1-1")).toBe(1);
    });

    it("should handle top-right corner position (only 3 adjacent cells)", () => {
      const testMap: Array<CellType[]> = [
        [CellType.Empty, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.Empty, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      const result = countRollsOfPaperAround(testMap, 2, 0);
      expect(result.size).toBe(3);
      expect(result.get("1-0")).toBe(1);
      expect(result.get("1-1")).toBe(1);
      expect(result.get("2-1")).toBe(1);
    });

    it("should handle bottom-left corner position (only 3 adjacent cells)", () => {
      const testMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.Empty],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.Empty],
      ];
      const result = countRollsOfPaperAround(testMap, 0, 2);
      expect(result.size).toBe(3);
      expect(result.get("0-1")).toBe(1);
      expect(result.get("1-1")).toBe(1);
      expect(result.get("1-2")).toBe(1);
    });

    it("should handle bottom-right corner position (only 3 adjacent cells)", () => {
      const testMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.Empty, CellType.RollsPaper, CellType.RollsPaper],
      ];
      const result = countRollsOfPaperAround(testMap, 2, 2);
      expect(result.size).toBe(3);
      expect(result.get("1-1")).toBe(1);
      expect(result.get("2-1")).toBe(1);
      expect(result.get("1-2")).toBe(1);
    });

    it("should handle top edge position (only 5 adjacent cells)", () => {
      const testMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      const result = countRollsOfPaperAround(testMap, 1, 0);
      expect(result.size).toBe(5);
      expect(result.get("0-0")).toBe(1);
      expect(result.get("2-0")).toBe(1);
      expect(result.get("0-1")).toBe(1);
      expect(result.get("1-1")).toBe(1);
      expect(result.get("2-1")).toBe(1);
    });

    it("should handle bottom edge position (only 5 adjacent cells)", () => {
      const testMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
      ];
      const result = countRollsOfPaperAround(testMap, 1, 2);
      expect(result.size).toBe(5);
      expect(result.get("0-1")).toBe(1);
      expect(result.get("1-1")).toBe(1);
      expect(result.get("2-1")).toBe(1);
      expect(result.get("0-2")).toBe(1);
      expect(result.get("2-2")).toBe(1);
    });

    it("should handle left edge position (only 5 adjacent cells)", () => {
      const testMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.RollsPaper, CellType.Empty],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.Empty],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.Empty],
      ];
      const result = countRollsOfPaperAround(testMap, 0, 1);
      expect(result.size).toBe(5);
      expect(result.get("0-0")).toBe(1);
      expect(result.get("1-0")).toBe(1);
      expect(result.get("1-1")).toBe(1);
      expect(result.get("0-2")).toBe(1);
      expect(result.get("1-2")).toBe(1);
    });

    it("should handle right edge position (only 5 adjacent cells)", () => {
      const testMap: Array<CellType[]> = [
        [CellType.Empty, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.Empty, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.Empty, CellType.RollsPaper, CellType.RollsPaper],
      ];
      const result = countRollsOfPaperAround(testMap, 2, 1);
      expect(result.size).toBe(5);
      expect(result.get("1-0")).toBe(1);
      expect(result.get("2-0")).toBe(1);
      expect(result.get("1-1")).toBe(1);
      expect(result.get("1-2")).toBe(1);
      expect(result.get("2-2")).toBe(1);
    });

    it("should work when positioned on a RollsPaper cell and count surrounding rolls", () => {
      const testMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
      ];
      const result = countRollsOfPaperAround(testMap, 1, 1);
      expect(result.size).toBe(8);
    });

    it("should return Map with correct structure (string keys, number values)", () => {
      const testMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      const result = countRollsOfPaperAround(testMap, 1, 1);
      result.forEach((value, key) => {
        expect(typeof key).toBe("string");
        expect(typeof value).toBe("number");
        expect(key).toMatch(/^\d+-\d+$/);
        expect(value).toBe(1);
      });
    });

    it("should count only adjacent rolls, not the center position", () => {
      const testMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.RollsPaper, CellType.Empty],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      const result = countRollsOfPaperAround(testMap, 1, 1);
      expect(result.has("1-1")).toBe(false);
      expect(result.size).toBe(0);
    });

    it("should handle mixed cell types around position", () => {
      const testMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.ForkLift, CellType.Empty],
        [CellType.Empty, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.ForkLift, CellType.RollsPaper, CellType.Empty],
      ];
      const result = countRollsOfPaperAround(testMap, 1, 1);
      expect(result.size).toBe(3);
      expect(result.get("0-0")).toBe(1);
      expect(result.get("2-1")).toBe(1);
      expect(result.get("1-2")).toBe(1);
    });

    it("should work on larger map from example with RollsPaper position", () => {
      const map = parseInput(exampleInput);
      // Position (1,1) is a RollsPaper (@) in the example
      const result = countRollsOfPaperAround(map, 1, 1);
      expect(result.size).toBeGreaterThanOrEqual(0);
      result.forEach((value, key) => {
        expect(typeof key).toBe("string");
        expect(value).toBe(1);
      });
    });

    it("should throw error on larger map when position is not RollsPaper", () => {
      const map = parseInput(exampleInput);
      // Position (0,0) is Empty (.) in the example
      expect(() => countRollsOfPaperAround(map, 0, 0)).toThrow(
        "This cell isn't a RollsPaper"
      );
    });
  });

  describe("scanMap", () => {
    it("should return 0 for a dense map where all rolls have 4+ adjacent rolls", () => {
      const denseMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
      ];
      const result = scanMap(denseMap);
      expect(result.rollsAccessedByForklift).toBe(4);
    });

    it("should count all rolls when they all have < 4 adjacent rolls", () => {
      const sparseMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.Empty, CellType.RollsPaper],
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.RollsPaper, CellType.Empty, CellType.RollsPaper],
      ];
      const result = scanMap(sparseMap);
      expect(result.rollsAccessedByForklift).toBe(4);
    });

    it("should count only rolls with < 4 adjacent rolls", () => {
      const mixedMap: Array<CellType[]> = [
        [CellType.Empty, CellType.RollsPaper, CellType.Empty],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.Empty, CellType.RollsPaper, CellType.Empty],
      ];
      const result = scanMap(mixedMap);
      // Center roll has 4 adjacent, corners have 1 each
      // So 4 rolls should be accessible (the 4 outer ones)
      expect(result.rollsAccessedByForklift).toBe(4);
    });

    it("should correctly count accessible rolls in the original example", () => {
      const exampleInputOriginal = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
      const map = parseInput(exampleInputOriginal);
      const result = scanMap(map);
      expect(result.rollsAccessedByForklift).toBe(13);
    });

    it("should return 0 when there are no rolls of paper", () => {
      const emptyMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      const result = scanMap(emptyMap);
      expect(result.rollsAccessedByForklift).toBe(0);
    });

    it("should count all 4 corner rolls as accessible when isolated", () => {
      const testMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.Empty, CellType.RollsPaper],
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.RollsPaper, CellType.Empty, CellType.RollsPaper],
      ];
      const result = scanMap(testMap);
      expect(result.rollsAccessedByForklift).toBe(4);
    });

    it("should handle map with single roll of paper", () => {
      const singleRollMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.RollsPaper, CellType.Empty],
        [CellType.Empty, CellType.Empty, CellType.Empty],
      ];
      const result = scanMap(singleRollMap);
      expect(result.rollsAccessedByForklift).toBe(1);
    });
  });

  describe("Part 1", () => {
    it("should solve the example with total output of 13", () => {
      const exampleInputOriginal = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
      const result = solvePart1(exampleInputOriginal);
      expect(result).toBe(13);
    });
  });

  describe("Part 2", () => {
    const exampleInputOriginal = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

    it("should handle multiple iterations until no more accessible rolls", () => {
      const testMap: Array<CellType[]> = [
        [CellType.RollsPaper, CellType.RollsPaper],
        [CellType.RollsPaper, CellType.RollsPaper]
      ];
      const result = removeAllAccessibleRolls(testMap);
      // Each roll has 3 adjacent, so all should be removed in first iteration
      expect(result.totalRemoved).toBe(4);
      expect(result.iterations).toBe(1);
    });

    it("should track iteration details for cascade removal", () => {
      const map = parseInput(exampleInputOriginal);
      const result = removeAllAccessibleRolls(map);

      expect(result.totalRemoved).toBe(43);
      expect(result.iterations).toBeGreaterThan(1);
      expect(result.iterationDetails).toBeDefined();
      expect(result.iterationDetails.length).toBe(result.iterations);
    });

    it("should verify iteration sequence matches example", () => {
      const map = parseInput(exampleInputOriginal);
      const result = removeAllAccessibleRolls(map);

      // Expected sequence from the problem: 13, 12, 7, 5, 2, 1, 1, 1, 1
      const expectedSequence = [13, 12, 7, 5, 2, 1, 1, 1, 1];
      expect(result.iterationDetails.length).toBe(expectedSequence.length);

      result.iterationDetails.forEach((detail: any, index: number) => {
        expect(detail.removedCount).toBe(expectedSequence[index]);
      });
    });

    it("should return empty map when all rolls are removed", () => {
      const smallMap: Array<CellType[]> = [
        [CellType.RollsPaper]
      ];
      const result = removeAllAccessibleRolls(smallMap);
      expect(result.totalRemoved).toBe(1);
      expect(result.finalMap[0][0]).toBe(CellType.Empty);
    });

    it("should handle map with no rolls of paper", () => {
      const emptyMap: Array<CellType[]> = [
        [CellType.Empty, CellType.Empty],
        [CellType.Empty, CellType.Empty]
      ];
      const result = removeAllAccessibleRolls(emptyMap);
      expect(result.totalRemoved).toBe(0);
      expect(result.iterations).toBe(0);
    });

    it("should handle cross pattern where center becomes accessible after outer removal", () => {
      const crossMap: Array<CellType[]> = [
        [CellType.Empty, CellType.RollsPaper, CellType.Empty],
        [CellType.RollsPaper, CellType.RollsPaper, CellType.RollsPaper],
        [CellType.Empty, CellType.RollsPaper, CellType.Empty]
      ];
      const result = removeAllAccessibleRolls(crossMap);

      // First iteration: 4 outer rolls removed (each has 1 adjacent)
      // Second iteration: center roll removed (now has 0 adjacent)
      expect(result.totalRemoved).toBe(5);
      expect(result.iterations).toBe(2);
      expect(result.iterationDetails[0].removedCount).toBe(4);
      expect(result.iterationDetails[1].removedCount).toBe(1);
    });

    it("should solve the example with total output of 43", () => {
      const result = solvePart2(exampleInputOriginal);
      expect(result).toBe(43);
    });
  });
});
