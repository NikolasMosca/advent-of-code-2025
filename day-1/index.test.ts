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
      const { dial, zeroCount } = rotateDial(11, Direction.RIGHT, 8);
      expect(dial).toBe(19);
      expect(zeroCount).toBe(0);
    });
    it("should rotate left correctly", () => {
      const { dial, zeroCount } = rotateDial(19, Direction.LEFT, 19);
      expect(dial).toBe(0);
      expect(zeroCount).toBe(1);
    });
    it("should rotate left with circle management correctly", () => {
      const { dial, zeroCount } = rotateDial(5, Direction.LEFT, 10);
      expect(dial).toBe(95);
      expect(zeroCount).toBe(1);
    });
    it("should rotate right with circle management correctly", () => {
      const { dial, zeroCount } = rotateDial(95, Direction.RIGHT, 5);
      expect(dial).toBe(0);
      expect(zeroCount).toBe(1);
    });

    describe("example sequence", () => {
      it("should rotate from 50 L68 to 82", () => {
        const { dial, zeroCount } = rotateDial(50, Direction.LEFT, 68);
        expect(dial).toBe(82);
        expect(zeroCount).toBe(1);
      });
      it("should rotate from 82 L30 to 52", () => {
        const { dial, zeroCount } = rotateDial(82, Direction.LEFT, 30);
        expect(dial).toBe(52);
        expect(zeroCount).toBe(0);
      });
      it("should rotate from 52 R48 to 0", () => {
        const { dial, zeroCount } = rotateDial(52, Direction.RIGHT, 48);
        expect(dial).toBe(0);
        expect(zeroCount).toBe(1);
      });
      it("should rotate from 0 L5 to 95", () => {
        const { dial, zeroCount } = rotateDial(0, Direction.LEFT, 5);
        expect(dial).toBe(95);
        expect(zeroCount).toBe(0);
      });
      it("should rotate from 95 R60 to 55", () => {
        const { dial, zeroCount } = rotateDial(95, Direction.RIGHT, 60);
        expect(dial).toBe(55);
        expect(zeroCount).toBe(1);
      });
      it("should rotate from 55 L55 to 0", () => {
        const { dial, zeroCount } = rotateDial(55, Direction.LEFT, 55);
        expect(dial).toBe(0);
        expect(zeroCount).toBe(1);
      });
      it("should rotate from 0 L1 to 99", () => {
        const { dial, zeroCount } = rotateDial(0, Direction.LEFT, 1);
        expect(dial).toBe(99);
        expect(zeroCount).toBe(0);
      });
      it("should rotate from 99 L99 to 0", () => {
        const { dial, zeroCount } = rotateDial(99, Direction.LEFT, 99);
        expect(dial).toBe(0);
        expect(zeroCount).toBe(1);
      });
      it("should rotate from 0 R14 to 14", () => {
        const { dial, zeroCount } = rotateDial(0, Direction.RIGHT, 14);
        expect(dial).toBe(14);
        expect(zeroCount).toBe(0);
      });
      it("should rotate from 14 L82 to 32", () => {
        const { dial, zeroCount } = rotateDial(14, Direction.LEFT, 82);
        expect(dial).toBe(32);
        expect(zeroCount).toBe(1);
      });
    });

    describe("large rotations (> 100)", () => {
      it("should rotate from 50 R963 to 13", () => {
        const { dial, zeroCount } = rotateDial(50, Direction.RIGHT, 963);
        expect(dial).toBe(13);
        expect(zeroCount).toBe(10);
      });
      it("should rotate from 0 L412 to 88", () => {
        const { dial, zeroCount } = rotateDial(0, Direction.LEFT, 412);
        expect(dial).toBe(88);
        expect(zeroCount).toBe(4);
      });
      it("should rotate from 50 L661 to 89", () => {
        const { dial, zeroCount } = rotateDial(50, Direction.LEFT, 661);
        expect(dial).toBe(89);
        expect(zeroCount).toBe(7);
      });
      it("should rotate from 0 R835 to 35", () => {
        const { dial, zeroCount } = rotateDial(0, Direction.RIGHT, 835);
        expect(dial).toBe(35);
        expect(zeroCount).toBe(8);
      });
      it("should rotate from 99 R200 to 99", () => {
        const { dial, zeroCount } = rotateDial(99, Direction.RIGHT, 200);
        expect(dial).toBe(99);
        expect(zeroCount).toBe(2);
      });
      it("should rotate from 5 L305 to 0", () => {
        const { dial, zeroCount } = rotateDial(5, Direction.LEFT, 305);
        expect(dial).toBe(0);
        expect(zeroCount).toBe(4);
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
      expect(result).toBe(6);
    });
  });
});
