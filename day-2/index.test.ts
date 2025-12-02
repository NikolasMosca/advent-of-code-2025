import { describe, it, expect } from "vitest";
import { solvePart1, solvePart2 } from "./index";
import { parseInput, findRepeatedDigits, isDigitRepeat } from "./utils";

const exampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

describe("Day 1", () => {
  describe("parseInput", () => {
    it("should parse the input correctly", () => {
      const result = parseInput(exampleInput);
      expect(result).toEqual([
        { start: 11, end: 22 },
        { start: 95, end: 115 },
        { start: 998, end: 1012 },
        { start: 1188511880, end: 1188511890 },
        { start: 222220, end: 222224 },
        { start: 1698522, end: 1698528 },
        { start: 446443, end: 446449 },
        { start: 38593856, end: 38593862 },
        { start: 565653, end: 565659 },
        { start: 824824821, end: 824824827 },
        { start: 2121212118, end: 2121212124 },
      ]);
    });
  });

  describe("isDigitRepeat", () => {
    describe("repeated twice (times = 2)", () => {
      it("should return true for 11 (1 repeated twice)", () => {
        expect(isDigitRepeat(11, 2)).toBe(true);
      });

      it("should return true for 22 (2 repeated twice)", () => {
        expect(isDigitRepeat(22, 2)).toBe(true);
      });

      it("should return true for 55 (5 repeated twice)", () => {
        expect(isDigitRepeat(55, 2)).toBe(true);
      });

      it("should return true for 6464 (64 repeated twice)", () => {
        expect(isDigitRepeat(6464, 2)).toBe(true);
      });

      it("should return true for 123123 (123 repeated twice)", () => {
        expect(isDigitRepeat(123123, 2)).toBe(true);
      });

      it("should return true for 1010 (10 repeated twice)", () => {
        expect(isDigitRepeat(1010, 2)).toBe(true);
      });

      it("should return true for 1188511885 (11885 repeated twice)", () => {
        expect(isDigitRepeat(1188511885, 2)).toBe(true);
      });

      it("should return false for 12 (not repeated)", () => {
        expect(isDigitRepeat(12, 2)).toBe(false);
      });

      it("should return false for 123 (not repeated)", () => {
        expect(isDigitRepeat(123, 2)).toBe(false);
      });

      it("should return false for 1234 (not repeated)", () => {
        expect(isDigitRepeat(1234, 2)).toBe(false);
      });
    });

    describe("repeated three times (times = 3)", () => {
      it("should return true for 111 (1 repeated three times)", () => {
        expect(isDigitRepeat(111, 3)).toBe(true);
      });

      it("should return true for 999 (9 repeated three times)", () => {
        expect(isDigitRepeat(999, 3)).toBe(true);
      });

      it("should return true for 777 (7 repeated three times)", () => {
        expect(isDigitRepeat(777, 3)).toBe(true);
      });

      it("should return true for 123123123 (123 repeated three times)", () => {
        expect(isDigitRepeat(123123123, 3)).toBe(true);
      });

      it("should return true for 824824824 (824 repeated three times)", () => {
        expect(isDigitRepeat(824824824, 3)).toBe(true);
      });

      it("should return false for 112 (not repeated three times)", () => {
        expect(isDigitRepeat(112, 3)).toBe(false);
      });

      it("should return false for 123124 (not repeated three times)", () => {
        expect(isDigitRepeat(123124, 3)).toBe(false);
      });
    });

    describe("repeated five times (times = 5)", () => {
      it("should return true for 2121212121 (21 repeated five times)", () => {
        expect(isDigitRepeat(2121212121, 5)).toBe(true);
      });

      it("should return true for 1212121212 (12 repeated five times)", () => {
        expect(isDigitRepeat(1212121212, 5)).toBe(true);
      });

      it("should return true for 3333333333 (33 repeated five times)", () => {
        expect(isDigitRepeat(3333333333, 5)).toBe(true);
      });

      it("should return false for 1212121213 (not repeated five times)", () => {
        expect(isDigitRepeat(1212121213, 5)).toBe(false);
      });
    });

    describe("repeated seven times (times = 7)", () => {
      it("should return true for 1111111 (1 repeated seven times)", () => {
        expect(isDigitRepeat(1111111, 7)).toBe(true);
      });

      it("should return true for 2222222 (2 repeated seven times)", () => {
        expect(isDigitRepeat(2222222, 7)).toBe(true);
      });

      it("should return true for 12121212121212 (12 repeated seven times)", () => {
        expect(isDigitRepeat(12121212121212, 7)).toBe(true);
      });

      it("should return false for 1111112 (not repeated seven times)", () => {
        expect(isDigitRepeat(1111112, 7)).toBe(false);
      });
    });

    describe("edge cases", () => {
      it("should return false for single digit numbers", () => {
        expect(isDigitRepeat(5, 2)).toBe(false);
      });

      it("should return false for numbers with odd length when checking twice", () => {
        expect(isDigitRepeat(123, 2)).toBe(false);
      });

      it("should return false for 101 (has leading zero pattern)", () => {
        expect(isDigitRepeat(101, 2)).toBe(false);
      });

      it("should handle large numbers correctly", () => {
        expect(isDigitRepeat(123456123456, 2)).toBe(true);
      });
    });
  });

  describe("findRepeatedDigits", () => {
    it("should find invalid IDs in range 11-22 (11 and 22)", () => {
      const result = findRepeatedDigits({ start: 11, end: 22 });
      expect(result.twice).toEqual([11, 22]);
    });

    it("should find invalid ID in range 95-115 (99)", () => {
      const result = findRepeatedDigits({ start: 95, end: 115 });
      expect(result.twice).toEqual([99]);
    });

    it("should find invalid ID in range 998-1012 (1010)", () => {
      const result = findRepeatedDigits({ start: 998, end: 1012 });
      expect(result.twice).toEqual([1010]);
    });

    it("should find invalid ID in range 1188511880-1188511890 (1188511885)", () => {
      const result = findRepeatedDigits({ start: 1188511880, end: 1188511890 });
      expect(result.twice).toEqual([1188511885]);
    });

    it("should find invalid ID in range 222220-222224 (222222)", () => {
      const result = findRepeatedDigits({ start: 222220, end: 222224 });
      expect(result.twice).toEqual([222222]);
    });

    it("should find no invalid IDs in range 1698522-1698528", () => {
      const result = findRepeatedDigits({ start: 1698522, end: 1698528 });
      expect(result.twice).toEqual([]);
    });

    it("should find invalid ID in range 446443-446449 (446446)", () => {
      const result = findRepeatedDigits({ start: 446443, end: 446449 });
      expect(result.twice).toEqual([446446]);
    });

    it("should find invalid ID in range 38593856-38593862 (38593859)", () => {
      const result = findRepeatedDigits({ start: 38593856, end: 38593862 });
      expect(result.twice).toEqual([38593859]);
    });

    it("should identify 55 as invalid (5 repeated twice)", () => {
      const result = findRepeatedDigits({ start: 50, end: 60 });
      expect(result.twice).toContain(55);
    });

    it("should identify 6464 as invalid (64 repeated twice)", () => {
      const result = findRepeatedDigits({ start: 6460, end: 6470 });
      expect(result.twice).toContain(6464);
    });

    it("should identify 123123 as invalid (123 repeated twice)", () => {
      const result = findRepeatedDigits({ start: 123120, end: 123130 });
      expect(result.twice).toContain(123123);
    });

    it("should not include numbers with leading zeroes (0101 is not valid)", () => {
      const result = findRepeatedDigits({ start: 100, end: 110 });
      // 101 is a valid ID but not invalid, so it should not be in the list
      expect(result.twice).not.toContain(101);
    });

    it("should handle single digit range without invalid IDs", () => {
      const result = findRepeatedDigits({ start: 1, end: 9 });
      expect(result.twice).toEqual([]);
    });

    // Tests for threeTimes property
    it("should find 111 in range 95-115 (111 repeated three times)", () => {
      const result = findRepeatedDigits({ start: 95, end: 115 });
      expect(result.threeTimes).toContain(111);
    });

    it("should find 999 in range 998-1012 (999 repeated three times)", () => {
      const result = findRepeatedDigits({ start: 998, end: 1012 });
      expect(result.threeTimes).toContain(999);
    });

    it("should find 824824824 in range 824824821-824824827 (824 repeated three times)", () => {
      const result = findRepeatedDigits({ start: 824824821, end: 824824827 });
      expect(result.threeTimes).toContain(824824824);
    });

    it("should identify 123123123 as invalid (123 repeated three times)", () => {
      const result = findRepeatedDigits({ start: 123123120, end: 123123130 });
      expect(result.threeTimes).toContain(123123123);
    });

    it("should identify 777 as invalid (7 repeated three times)", () => {
      const result = findRepeatedDigits({ start: 770, end: 780 });
      expect(result.threeTimes).toContain(777);
    });

    // Tests for fiveTimes property
    it("should find 2121212121 in range 2121212118-2121212124 (21 repeated five times)", () => {
      const result = findRepeatedDigits({ start: 2121212118, end: 2121212124 });
      expect(result.fiveTimes).toContain(2121212121);
    });

    it("should identify 1212121212 as invalid (12 repeated five times)", () => {
      const result = findRepeatedDigits({ start: 1212121210, end: 1212121215 });
      expect(result.fiveTimes).toContain(1212121212);
    });

    it("should identify 3333333333 as invalid (3 repeated five times)", () => {
      const result = findRepeatedDigits({ start: 3333333330, end: 3333333335 });
      expect(result.fiveTimes).toContain(3333333333);
    });

    // Tests for sevenTimes property
    it("should identify 1111111 as invalid (1 repeated seven times)", () => {
      const result = findRepeatedDigits({ start: 1111110, end: 1111115 });
      expect(result.sevenTimes).toContain(1111111);
    });

    it("should identify 2222222 as invalid (2 repeated seven times)", () => {
      const result = findRepeatedDigits({ start: 2222220, end: 2222225 });
      expect(result.sevenTimes).toContain(2222222);
    });

    it("should identify 12121212121212 as invalid (12 repeated seven times)", () => {
      const result = findRepeatedDigits({ start: 12121212121210, end: 12121212121215 });
      expect(result.sevenTimes).toContain(12121212121212);
    });

    // Edge cases: ranges with no threeTimes, fiveTimes, or sevenTimes
    it("should find no threeTimes in range 1698522-1698528", () => {
      const result = findRepeatedDigits({ start: 1698522, end: 1698528 });
      expect(result.threeTimes).toEqual([]);
    });

    it("should find no fiveTimes in range 11-22", () => {
      const result = findRepeatedDigits({ start: 11, end: 22 });
      expect(result.fiveTimes).toEqual([]);
    });

    it("should find no sevenTimes in range 11-22", () => {
      const result = findRepeatedDigits({ start: 11, end: 22 });
      expect(result.sevenTimes).toEqual([]);
    });
  });

  describe("Part 1", () => {
    it("should solve the example", () => {
      const result = solvePart1(exampleInput);
      expect(result).toBe(1227775554);
    });
  });

  describe("Part 2", () => {
    it("should solve the example", () => {
      const result = solvePart2(exampleInput);
      expect(result).toBe(4174379265);
    });
  });
});
