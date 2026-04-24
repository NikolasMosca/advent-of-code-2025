import { describe, it, expect } from "vitest";
import { solvePart1, solvePart2 } from "./index";
import {
  getLargestRectangle,
  getRectAreaBetweenTwoCoordinates,
  readInput,
} from "./utils";

const exampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

describe("Day 8", () => {
  describe("readInput", () => {
    it("should parse the input into an array of coordinates", () => {
      const result = readInput(exampleInput);

      expect(result).toStrictEqual([
        { x: 7, y: 1 },
        { x: 11, y: 1 },
        { x: 11, y: 7 },
        { x: 9, y: 7 },
        { x: 9, y: 5 },
        { x: 2, y: 5 },
        { x: 2, y: 3 },
        { x: 7, y: 3 },
      ]);
    });
  });

  describe("getRectAreaBetweenTwoCoordinates", () => {
    it("should get the correct area", () => {
      const result = getRectAreaBetweenTwoCoordinates({ x: 2, y: 5 }, { x: 9, y: 7 });
      expect(result).toBe(24);
    });
    it("should get the correct area", () => {
      const result = getRectAreaBetweenTwoCoordinates({ x: 7, y: 1 }, { x: 11, y: 7 });
      expect(result).toBe(35);
    });
    it("should get the correct area", () => {
      const result = getRectAreaBetweenTwoCoordinates({ x: 7, y: 3 }, { x: 2, y: 3 });
      expect(result).toBe(6);
    });
  });

  describe("getLargestRectangle", () => {
    it("should get the correct area", () => {
      const result = getLargestRectangle([
        { x: 7, y: 1 },
        { x: 11, y: 1 },
        { x: 11, y: 7 },
        { x: 9, y: 7 },
        { x: 9, y: 5 },
        { x: 2, y: 5 },
        { x: 2, y: 3 },
        { x: 7, y: 3 },
      ]);
      expect(result).toBe(50);
    });
  });
});
