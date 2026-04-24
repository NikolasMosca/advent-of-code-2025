import { describe, it, expect } from "vitest";
import { readInput, canFitPresents, CellType, canPutHere, rotateShape } from "./utils";
import { solvePart1 } from "./index";

const exampleInput = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

describe("Day 12: Christmas Tree Farm", () => {
  describe("readInput", () => {
    it("should parse shapes correctly", () => {
      const { shapes, regions } = readInput(exampleInput);

      expect(shapes).toHaveLength(6);

      const B = CellType.BLOCK;
      const E = CellType.EMPTY;

      // Check shape 0: ###
      //                ##.
      //                ##.
      expect(shapes[0]).toEqual([
        [B, B, B],
        [B, B, E],
        [B, B, E]
      ]);

      // Check shape 1: ###
      //                ##.
      //                .##
      expect(shapes[1]).toEqual([
        [B, B, B],
        [B, B, E],
        [E, B, B]
      ]);

      // Check shape 2: .##
      //                ###
      //                ##.
      expect(shapes[2]).toEqual([
        [E, B, B],
        [B, B, B],
        [B, B, E]
      ]);

      // Check shape 3: ##.
      //                ###
      //                ##.
      expect(shapes[3]).toEqual([
        [B, B, E],
        [B, B, B],
        [B, B, E]
      ]);

      // Check shape 4: ###
      //                #..
      //                ###
      expect(shapes[4]).toEqual([
        [B, B, B],
        [B, E, E],
        [B, B, B]
      ]);

      // Check shape 5: ###
      //                .#.
      //                ###
      expect(shapes[5]).toEqual([
        [B, B, B],
        [E, B, E],
        [B, B, B]
      ]);
    });

    it("should parse regions correctly", () => {
      const { shapes, regions } = readInput(exampleInput);

      expect(regions).toHaveLength(3);

      // First region: 4x4: 0 0 0 0 2 0
      expect(regions[0]).toEqual({
        width: 4,
        height: 4,
        requiredShapes: [0, 0, 0, 0, 2, 0]
      });

      // Second region: 12x5: 1 0 1 0 2 2
      expect(regions[1]).toEqual({
        width: 12,
        height: 5,
        requiredShapes: [1, 0, 1, 0, 2, 2]
      });

      // Third region: 12x5: 1 0 1 0 3 2
      expect(regions[2]).toEqual({
        width: 12,
        height: 5,
        requiredShapes: [1, 0, 1, 0, 3, 2]
      });
    });

    it("should handle simple shape", () => {
      const input = `0:
##
##

2x2: 1`;

      const { shapes, regions } = readInput(input);

      const B = CellType.BLOCK;

      expect(shapes).toHaveLength(1);
      expect(shapes[0]).toEqual([
        [B, B],
        [B, B]
      ]);
      expect(regions).toHaveLength(1);
      expect(regions[0]).toEqual({
        width: 2,
        height: 2,
        requiredShapes: [1]
      });
    });

    it("should handle multiple shapes with different sizes", () => {
      const input = `0:
#

1:
##
##

2:
###
#..

3x3: 1 1 1`;

      const { shapes, regions } = readInput(input);

      const B = CellType.BLOCK;
      const E = CellType.EMPTY;

      expect(shapes).toHaveLength(3);
      expect(shapes[0]).toEqual([[B]]);
      expect(shapes[1]).toEqual([
        [B, B],
        [B, B]
      ]);
      expect(shapes[2]).toEqual([
        [B, B, B],
        [B, E, E]
      ]);
      expect(regions[0]).toEqual({
        width: 3,
        height: 3,
        requiredShapes: [1, 1, 1]
      });
    });
  });

  describe("canFitPresents", () => {
    it("should return true for empty region (no presents required)", () => {
      const input = `0:
##

3x3: 0`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(true);
    });

    it("should return true for a simple case with one shape fitting exactly", () => {
      const input = `0:
##
##

2x2: 1`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(true);
    });

    it("should return true when single shape fits with room to spare", () => {
      const input = `0:
##
##

3x3: 1`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(true);
    });

    it("should return false when shape is too wide for region", () => {
      const input = `0:
####

2x2: 1`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(false);
    });

    it("should return false when shape is too tall for region", () => {
      const input = `0:
##
##
##

2x2: 1`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(false);
    });

    it("should return true when two small shapes fit side by side", () => {
      const input = `0:
##
##

4x2: 2`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(true);
    });

    it("should return false when two shapes cannot both fit", () => {
      const input = `0:
##
##

3x2: 2`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(false);
    });

    it("should handle shapes with EMPTY cells that allow overlapping placement", () => {
      const input = `0:
#.
##

1:
.#
##

2x2: 1 1`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(true);
    });

    it("should return true for first region in example (4x4 with two shape-4 presents)", () => {
      const { shapes, regions } = readInput(exampleInput);
      expect(canFitPresents(regions[0], shapes)).toBe(true);
    });

    it("should return true for second region in example (12x5 with various presents)", () => {
      const { shapes, regions } = readInput(exampleInput);
      expect(canFitPresents(regions[1], shapes)).toBe(true);
    });

    it("should return false for third region in example (12x5 with too many presents)", () => {
      const { shapes, regions } = readInput(exampleInput);
      expect(canFitPresents(regions[2], shapes)).toBe(false);
    });

    it("should handle multiple different shapes fitting together", () => {
      const input = `0:
###

1:
#
#
#

3x3: 1 1`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(true);
    });

    it("should return true when shapes can be rotated to fit", () => {
      const input = `0:
###
#..

3x2: 1`;

      const { shapes, regions } = readInput(input);
      expect(canFitPresents(regions[0], shapes)).toBe(true);
    });
  });

  describe("rotateShape", () => {
    it("should rotate a 2x2 square shape 90 degrees clockwise", () => {
      const B = CellType.BLOCK;
      const E = CellType.EMPTY;

      const shape: CellType[][] = [
        [B, E],
        [B, B]
      ];

      const rotated = rotateShape(shape);

      expect(rotated).toEqual([
        [B, B],
        [E, B]
      ]);
    });

    it("should rotate a 3x2 rectangular shape 90 degrees clockwise", () => {
      const B = CellType.BLOCK;
      const E = CellType.EMPTY;

      const shape: CellType[][] = [
        [B, B, B],
        [B, E, E]
      ];

      const rotated = rotateShape(shape);

      expect(rotated).toEqual([
        [B, B],
        [E, B],
        [E, B]
      ]);
    });

    it("should rotate a 1x3 shape correctly", () => {
      const B = CellType.BLOCK;

      const shape: CellType[][] = [
        [B, B, B]
      ];

      const rotated = rotateShape(shape);

      expect(rotated).toEqual([
        [B],
        [B],
        [B]
      ]);
    });

    it("should rotate a 3x1 shape correctly", () => {
      const B = CellType.BLOCK;

      const shape: CellType[][] = [
        [B],
        [B],
        [B]
      ];

      const rotated = rotateShape(shape);

      expect(rotated).toEqual([
        [B, B, B]
      ]);
    });

    it("should rotate a complex shape with EMPTY cells", () => {
      const B = CellType.BLOCK;
      const E = CellType.EMPTY;

      const shape: CellType[][] = [
        [B, B, E],
        [B, B, B],
        [B, B, E]
      ];

      const rotated = rotateShape(shape);

      expect(rotated).toEqual([
        [B, B, B],
        [B, B, B],
        [E, B, E]
      ]);
    });

    it("should rotate 4 times to get back to original", () => {
      const B = CellType.BLOCK;
      const E = CellType.EMPTY;

      const original: CellType[][] = [
        [B, B, B],
        [B, E, E]
      ];

      let rotated = original;
      for (let i = 0; i < 4; i++) {
        rotated = rotateShape(rotated);
      }

      expect(rotated).toEqual(original);
    });
  });

  describe("canPutHere", () => {
    const B = CellType.BLOCK;
    const E = CellType.EMPTY;

    it("should return true when shape fits exactly at position (0,0)", () => {
      const map: CellType[][] = [
        [E, E, E],
        [E, E, E],
        [E, E, E]
      ];

      const shape: CellType[][] = [
        [B, B],
        [B, B]
      ];

      expect(canPutHere(map, 0, 0, shape)).toBe(true);
    });

    it("should return true when shape fits at position (1,1)", () => {
      const map: CellType[][] = [
        [E, E, E],
        [E, E, E],
        [E, E, E]
      ];

      const shape: CellType[][] = [
        [B, B],
        [B, B]
      ];

      expect(canPutHere(map, 1, 1, shape)).toBe(true);
    });

    it("should return false when shape is too tall for position", () => {
      const map: CellType[][] = [
        [E, E, E],
        [E, E, E],
        [E, E, E]
      ];

      const shape: CellType[][] = [
        [B, B],
        [B, B],
        [B, B]
      ];

      expect(canPutHere(map, 1, 0, shape)).toBe(false);
    });

    it("should return false when shape is too wide for position", () => {
      const map: CellType[][] = [
        [E, E, E],
        [E, E, E],
        [E, E, E]
      ];

      const shape: CellType[][] = [
        [B, B, B, B]
      ];

      expect(canPutHere(map, 0, 0, shape)).toBe(false);
    });

    it("should return false when shape extends beyond bottom edge", () => {
      const map: CellType[][] = [
        [E, E, E],
        [E, E, E]
      ];

      const shape: CellType[][] = [
        [B, B],
        [B, B]
      ];

      expect(canPutHere(map, 1, 0, shape)).toBe(false);
    });

    it("should return false when shape extends beyond right edge", () => {
      const map: CellType[][] = [
        [E, E, E],
        [E, E, E]
      ];

      const shape: CellType[][] = [
        [B, B, B]
      ];

      expect(canPutHere(map, 0, 1, shape)).toBe(false);
    });

    it("should return true for 1x1 shape at any valid position", () => {
      const map: CellType[][] = [
        [E, E],
        [E, E]
      ];

      const shape: CellType[][] = [
        [B]
      ];

      expect(canPutHere(map, 0, 0, shape)).toBe(true);
      expect(canPutHere(map, 0, 1, shape)).toBe(true);
      expect(canPutHere(map, 1, 0, shape)).toBe(true);
      expect(canPutHere(map, 1, 1, shape)).toBe(true);
    });

    it("should return false for 1x1 shape outside boundaries", () => {
      const map: CellType[][] = [
        [E, E],
        [E, E]
      ];

      const shape: CellType[][] = [
        [B]
      ];

      expect(canPutHere(map, 2, 0, shape)).toBe(false);
      expect(canPutHere(map, 0, 2, shape)).toBe(false);
    });

    it("should handle shape with EMPTY cells correctly", () => {
      const map: CellType[][] = [
        [E, E, E],
        [E, E, E]
      ];

      const shape: CellType[][] = [
        [B, E],
        [B, B]
      ];

      expect(canPutHere(map, 0, 0, shape)).toBe(true);
      expect(canPutHere(map, 0, 1, shape)).toBe(true);
      expect(canPutHere(map, 0, 2, shape)).toBe(false);
    });
  });

  describe("solvePart1", () => {
    it("should return 2 for the example input", () => {
      expect(solvePart1(exampleInput)).toBe(2);
    });

    it("should return 0 when no regions can fit their presents", () => {
      const input = `0:
####
####

2x2: 1`;

      expect(solvePart1(input)).toBe(0);
    });

    it("should return 1 when only one region fits", () => {
      const input = `0:
##
##

2x2: 1
2x2: 2`;

      expect(solvePart1(input)).toBe(1);
    });

    it("should return correct count for multiple valid regions", () => {
      const input = `0:
##
##

2x2: 1
4x2: 2
3x2: 2`;

      expect(solvePart1(input)).toBe(2);
    });
  });
});
