import { describe, it, expect } from "vitest";
import { solvePart1, solvePart2 } from "./index";
import { Direction, parseInput, rotateDial } from "./utils";

const exampleInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

describe("Day 1", () => {
  describe("parseInput", () => {
    it("should parse the input correctly", () => {
      const result = parseInput(exampleInput);
      expect(result).toEqual([
        { direction: "L", clicks: 68 },
        { direction: "L", clicks: 30 },
        { direction: "R", clicks: 48 },
        { direction: "L", clicks: 5 },
        { direction: "R", clicks: 60 },
        { direction: "L", clicks: 55 },
        { direction: "L", clicks: 1 },
        { direction: "L", clicks: 99 },
        { direction: "R", clicks: 14 },
        { direction: "L", clicks: 82 },
      ]);
    });
  });

  describe("rotateDial", () => {
    it("should rotate right correctly", () => {
      const newDial = rotateDial(11, Direction.RIGHT, 8);
      expect(newDial).toBe(19);
    });
    it("should rotate left correctly", () => {
      const newDial = rotateDial(19, Direction.LEFT, 19);
      expect(newDial).toBe(0);
    });
    it("should rotate left with circle management correctly", () => {
      const newDial = rotateDial(5, Direction.LEFT, 10);
      expect(newDial).toBe(95);
    });
    it("should rotate right with circle management correctly", () => {
      const newDial = rotateDial(95, Direction.RIGHT, 5);
      expect(newDial).toBe(0);
    });

    describe("example sequence", () => {
      it("should rotate from 50 L68 to 82", () => {
        const newDial = rotateDial(50, Direction.LEFT, 68);
        expect(newDial).toBe(82);
      });
      it("should rotate from 82 L30 to 52", () => {
        const newDial = rotateDial(82, Direction.LEFT, 30);
        expect(newDial).toBe(52);
      });
      it("should rotate from 52 R48 to 0", () => {
        const newDial = rotateDial(52, Direction.RIGHT, 48);
        expect(newDial).toBe(0);
      });
      it("should rotate from 0 L5 to 95", () => {
        const newDial = rotateDial(0, Direction.LEFT, 5);
        expect(newDial).toBe(95);
      });
      it("should rotate from 95 R60 to 55", () => {
        const newDial = rotateDial(95, Direction.RIGHT, 60);
        expect(newDial).toBe(55);
      });
      it("should rotate from 55 L55 to 0", () => {
        const newDial = rotateDial(55, Direction.LEFT, 55);
        expect(newDial).toBe(0);
      });
      it("should rotate from 0 L1 to 99", () => {
        const newDial = rotateDial(0, Direction.LEFT, 1);
        expect(newDial).toBe(99);
      });
      it("should rotate from 99 L99 to 0", () => {
        const newDial = rotateDial(99, Direction.LEFT, 99);
        expect(newDial).toBe(0);
      });
      it("should rotate from 0 R14 to 14", () => {
        const newDial = rotateDial(0, Direction.RIGHT, 14);
        expect(newDial).toBe(14);
      });
      it("should rotate from 14 L82 to 32", () => {
        const newDial = rotateDial(14, Direction.LEFT, 82);
        expect(newDial).toBe(32);
      });
    });

    describe("large rotations (> 100)", () => {
      it("should rotate from 50 R963 to 13", () => {
        const newDial = rotateDial(50, Direction.RIGHT, 963);
        expect(newDial).toBe(13);
      });
      it("should rotate from 0 L412 to 88", () => {
        const newDial = rotateDial(0, Direction.LEFT, 412);
        expect(newDial).toBe(88);
      });
      it("should rotate from 50 L661 to 89", () => {
        const newDial = rotateDial(50, Direction.LEFT, 661);
        expect(newDial).toBe(89);
      });
      it("should rotate from 0 R835 to 35", () => {
        const newDial = rotateDial(0, Direction.RIGHT, 835);
        expect(newDial).toBe(35);
      });
      it("should rotate from 99 R200 to 99", () => {
        const newDial = rotateDial(99, Direction.RIGHT, 200);
        expect(newDial).toBe(99);
      });
      it("should rotate from 5 L305 to 0", () => {
        const newDial = rotateDial(5, Direction.LEFT, 305);
        expect(newDial).toBe(0);
      });
    });
  });

  describe("Part 1", () => {
    it("should solve the example", () => {
      const result = solvePart1(exampleInput);
      expect(result).toBe(3);
    });
  });

  describe("Part 2", () => {
    it("should solve the example", () => {
      const result = solvePart2(exampleInput);
      expect(result).toBe(0);
    });
  });
});
