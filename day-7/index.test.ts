import { describe, it, expect } from "vitest";
import { solvePart1, solvePart2 } from "./index";
import { parseInput, calculateBeam, findStarterPoint } from "./utils";

const exampleInput = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

describe("Day 7", () => {
  describe("parseInput", () => {
    it("should parse the input into a 2D grid", () => {
      const result = parseInput(exampleInput);

      // Should be a 2D array
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(Array.isArray(result[0])).toBe(true);

      // Each line should be split into individual characters
      const lines = exampleInput.trim().split("\n");
      expect(result.length).toBe(lines.length);
      expect(result[0].length).toBe(lines[0].length);

      // Check some specific positions
      // First line: ".......S......."
      expect(result[0][7]).toBe("S"); // S position
      expect(result[0][0]).toBe("."); // First dot

      // Third line (index 2): ".......^......."
      expect(result[2][7]).toBe("^"); // First splitter

      // Fifth line (index 4): "......^.^......"
      expect(result[4][6]).toBe("^"); // Left splitter
      expect(result[4][8]).toBe("^"); // Right splitter
    });

    it("should handle a simple grid", () => {
      const simpleInput = `..S..\n.....\n..^..`;
      const result = parseInput(simpleInput);

      expect(result.length).toBe(3);
      expect(result[0].length).toBe(5);
      expect(result[0][2]).toBe("S");
      expect(result[2][2]).toBe("^");
    });

    it("should preserve all characters correctly", () => {
      const result = parseInput(exampleInput);
      const lines = exampleInput.trim().split("\n");

      // Verify each line matches character by character
      lines.forEach((line, rowIndex) => {
        line.split("").forEach((char, colIndex) => {
          expect(result[rowIndex][colIndex]).toBe(char);
        });
      });
    });
  });

  describe("findStarterPoint", () => {
    it("should find the starter point in the example input", () => {
      const grid = parseInput(exampleInput);
      const result = findStarterPoint(grid);

      // S is at column 7 (0-indexed) on the first line
      expect(result).toEqual({ x: 7, y: 0 });
    });

    it("should find starter at top-left corner (0,0)", () => {
      const input = `S.....\n......\n......`;
      const grid = parseInput(input);
      const result = findStarterPoint(grid);

      expect(result).toEqual({ x: 0, y: 0 });
    });

    it("should find starter at bottom-right corner", () => {
      const input = `......\n......\n.....S`;
      const grid = parseInput(input);
      const result = findStarterPoint(grid);

      expect(result).toEqual({ x: 5, y: 2 });
    });

    it("should find starter in the middle of the grid", () => {
      const input = `.....\n..S..\n.....`;
      const grid = parseInput(input);
      const result = findStarterPoint(grid);

      expect(result).toEqual({ x: 2, y: 1 });
    });

    it("should find starter on the first row, last column", () => {
      const input = `.....S\n......\n......`;
      const grid = parseInput(input);
      const result = findStarterPoint(grid);

      expect(result).toEqual({ x: 5, y: 0 });
    });

    it("should find starter on the last row, first column", () => {
      const input = `......\n......\nS.....`;
      const grid = parseInput(input);
      const result = findStarterPoint(grid);

      expect(result).toEqual({ x: 0, y: 2 });
    });

    it("should find starter in a single-row grid", () => {
      const input = `..S..`;
      const grid = parseInput(input);
      const result = findStarterPoint(grid);

      expect(result).toEqual({ x: 2, y: 0 });
    });

    it("should find starter in a single-column grid", () => {
      const input = `.\n.\nS\n.\n.`;
      const grid = parseInput(input);
      const result = findStarterPoint(grid);

      expect(result).toEqual({ x: 0, y: 2 });
    });

    it("should find first starter when multiple S exist", () => {
      const input = `...S..\n......\n.S....`;
      const grid = parseInput(input);
      const result = findStarterPoint(grid);

      // Should find the first one (top row)
      expect(result).toEqual({ x: 3, y: 0 });
    });

    it("should throw error when no starter point exists", () => {
      const input = `......\n......\n......`;
      const grid = parseInput(input);

      expect(() => findStarterPoint(grid)).toThrow("Starter point not found");
    });

    it("should throw error for empty grid", () => {
      const grid: string[][] = [];

      expect(() => findStarterPoint(grid)).toThrow("Starter point not found");
    });

    it("should throw error for grid with only splitters", () => {
      const input = `^^^^^^\n^^^^^^\n^^^^^^`;
      const grid = parseInput(input);

      expect(() => findStarterPoint(grid)).toThrow("Starter point not found");
    });
  });

  describe("calculateBeam", () => {
    it("should calculate 21 split times for the example input", () => {
      const grid = parseInput(exampleInput);
      const result = calculateBeam(grid);

      expect(result).toHaveProperty("splitTimes");
      expect(result.splitTimes).toBe(21);
    });

    it("should return 0 split times for a grid with no splitters", () => {
      const noSplittersInput = `..S..\n.....\n.....`;
      const grid = parseInput(noSplittersInput);
      const result = calculateBeam(grid);

      expect(result.splitTimes).toBe(0);
    });

    it("should return 1 split time for a grid with one splitter", () => {
      const oneSplitterInput = `..S..\n.....\n..^..`;
      const grid = parseInput(oneSplitterInput);
      const result = calculateBeam(grid);

      expect(result.splitTimes).toBe(1);
    });

    it("should return 0 split times when beam passes between splitters", () => {
      // The beam passes between the splitters without hitting them
      const twoSplittersInput = `...S...\n.......\n..^.^..\n.......`;
      const grid = parseInput(twoSplittersInput);
      const result = calculateBeam(grid);

      /*
      [".",".",".","S",".",".","."]  <- S at x=3
      [".",".",".",".",".",".","."]
      [".",".","^",".","^",".","."]  <- splitters at x=2 and x=4
      [".",".",".",".",".",".","."]

      The beam descends at x=3, passing between the splitters
      */

      expect(result.splitTimes).toBe(0);
    });

    it("should return 3 split times when beam hits splitter then split beams hit more splitters", () => {
      // Beam hits first splitter, creates 2 beams, each hits another splitter
      const threeSplitInput = `...S...\n.......\n...^...\n.......\n..^.^..`;
      const grid = parseInput(threeSplitInput);
      const result = calculateBeam(grid);

      /*
      [".",".",".","S",".",".","."]  <- S at x=3
      [".",".",".",".",".",".","."]
      [".",".",".","^",".",".","."]  <- splitter at x=3 (beam hits it!)
      [".",".",".",".",".",".","."]
      [".",".","^",".","^",".","."]  <- splitters at x=2 and x=4

      1. Beam hits splitter at (3,2) -> splits into left (x=2) and right (x=4)
      2. Left beam hits splitter at (2,4) -> split #2
      3. Right beam hits splitter at (4,4) -> split #3
      */

      expect(result.splitTimes).toBe(3);
    });

    it("should handle beams that exit the manifold without hitting a splitter", () => {
      const exitingBeamInput = `..S..\n.....\n..^..\n.....\n.....`;
      const grid = parseInput(exitingBeamInput);
      const result = calculateBeam(grid);

      // One split, then the two beams exit on the left and right
      expect(result.splitTimes).toBe(1);
    });

    it("should handle a simple two-level split", () => {
      const simpleTwoLevelInput = `.S.\n...\n.^.\n...\n^.^`;
      const grid = parseInput(simpleTwoLevelInput);
      const result = calculateBeam(grid);

      // First split at row 2, creating 2 beams
      // Left beam hits splitter at row 4 (left position)
      // Right beam hits splitter at row 4 (right position)
      // Total: 1 (first split) + 1 (left split) + 1 (right split) = 3 splits
      expect(result.splitTimes).toBe(3);
    });
  });

  describe("Part 1", () => {
    it("should solve the example and return 21", () => {
      const result = solvePart1(exampleInput);
      expect(result).toBe(21);
    });
  });

  describe("Part 2 - Quantum Tachyon Manifold (Timelines)", () => {
    it("should calculate 40 timelines for the example input", () => {
      const grid = parseInput(exampleInput);
      const result = calculateBeam(grid);

      expect(result).toHaveProperty("timelines");
      expect(result.timelines).toBe(40);
    });

    it("should return 1 timeline for a grid with no splitters", () => {
      const noSplittersInput = `..S..\n.....\n.....`;
      const grid = parseInput(noSplittersInput);
      const result = calculateBeam(grid);

      // No splits means only 1 timeline
      expect(result.timelines).toBe(1);
    });

    it("should return 2 timelines for a grid with one splitter", () => {
      const oneSplitterInput = `..S..\n.....\n..^..`;
      const grid = parseInput(oneSplitterInput);
      const result = calculateBeam(grid);

      // One split creates 2 timelines (left and right)
      expect(result.timelines).toBe(2);
    });

    it("should handle beams exiting the manifold", () => {
      const exitingBeamInput = `..S..\n.....\n..^..\n.....\n.....`;
      const grid = parseInput(exitingBeamInput);
      const result = calculateBeam(grid);

      // One split creates 2 beams that both exit: 2 timelines
      expect(result.timelines).toBe(2);
    });

    it("should return 1 timeline when beam exits without hitting splitter", () => {
      const straightExitInput = `..S..\n.....\n.....`;
      const grid = parseInput(straightExitInput);
      const result = calculateBeam(grid);

      // Beam goes straight down and exits: 1 timeline
      expect(result.timelines).toBe(1);
    });
  });

  describe("Part 2 Integration", () => {
    it("should solve the example and return 40 timelines", () => {
      const result = solvePart2(exampleInput);
      expect(result).toBe(40);
    });
  });
});
