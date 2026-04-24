import { describe, it, expect } from "vitest";
import { solvePart1, solvePart2 } from "./index";
import { parseInput, parseInputForPart2, getResultFromCalculation } from "./utils";

const exampleInput = `123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +  `;

describe("Day 6", () => {
  describe("parseInput", () => {
    it("should parse the example input correctly", () => {
      const result = parseInput(exampleInput);
      expect(result).toEqual([
        { elements: [123, 45, 6], sign: "*" },
        { elements: [328, 64, 98], sign: "+" },
        { elements: [51, 387, 215], sign: "*" },
        { elements: [64, 23, 314], sign: "+" },
      ]);
    });

    it("should handle single column with multiplication", () => {
      const input = `10\n20\n*`;
      const result = parseInput(input);
      expect(result).toEqual([{ elements: [10, 20], sign: "*" }]);
    });

    it("should handle single column with addition", () => {
      const input = `5\n15\n+`;
      const result = parseInput(input);
      expect(result).toEqual([{ elements: [5, 15], sign: "+" }]);
    });

    it("should handle three numbers in a column", () => {
      const input = `100\n200\n300\n*`;
      const result = parseInput(input);
      expect(result).toEqual([{ elements: [100, 200, 300], sign: "*" }]);
    });

    it("should handle multiple columns with varying spacing", () => {
      const input = `10  200\n20   30\n*    +`;
      const result = parseInput(input);
      expect(result).toEqual([
        { elements: [10, 20], sign: "*" },
        { elements: [200, 30], sign: "+" },
      ]);
    });
  });

  describe("getResultFromCalculation", () => {
    it("should multiply numbers correctly", () => {
      const result = getResultFromCalculation([123, 45, 6], "*");
      expect(result).toBe(33210);
    });

    it("should add numbers correctly", () => {
      const result = getResultFromCalculation([328, 64, 98], "+");
      expect(result).toBe(490);
    });

    it("should handle single number with multiplication", () => {
      const result = getResultFromCalculation([42], "*");
      expect(result).toBe(42);
    });

    it("should handle single number with addition", () => {
      const result = getResultFromCalculation([42], "+");
      expect(result).toBe(42);
    });

    it("should handle two numbers with multiplication", () => {
      const result = getResultFromCalculation([10, 5], "*");
      expect(result).toBe(50);
    });

    it("should handle two numbers with addition", () => {
      const result = getResultFromCalculation([10, 5], "+");
      expect(result).toBe(15);
    });

    it("should handle multiplication with zero", () => {
      const result = getResultFromCalculation([10, 0, 5], "*");
      expect(result).toBe(0);
    });

    it("should handle addition with zero", () => {
      const result = getResultFromCalculation([10, 0, 5], "+");
      expect(result).toBe(15);
    });

    it("should handle large multiplication", () => {
      const result = getResultFromCalculation([51, 387, 215], "*");
      expect(result).toBe(4243455);
    });

    it("should handle large addition", () => {
      const result = getResultFromCalculation([64, 23, 314], "+");
      expect(result).toBe(401);
    });
  });

  describe("parseInputForPart2", () => {
    it("should parse the example input correctly (transposed, right-to-left)", () => {
      const result = parseInputForPart2(exampleInput);

      // Original input:
      // 123 328  51 64
      //  45 64  387 23
      //   6 98  215 314
      // *   +   *   +
      //
      // After transposing and reading right-to-left:
      // Rightmost problem: 4 + 431 + 623 = 1058
      // Second from right: 175 * 581 * 32 = 3253600
      // Third from right: 8 + 248 + 369 = 625
      // Leftmost problem: 356 * 24 * 1 = 8544
      expect(result).toEqual([
        { elements: [4, 431, 623], sign: "+" },
        { elements: [175, 581, 32], sign: "*" },
        { elements: [8, 248, 369], sign: "+" },
        { elements: [356, 24, 1], sign: "*" },
      ]);
    });

    it("should handle simple two-digit transposition", () => {
      // Input:
      // 12
      // 34
      // *
      // Transposed right-to-left:
      // Col 1 (right): '2', '4' → 24
      // Col 0 (left): '1', '3' → 13
      // Result: [24, 13] with '*'
      const input = `12\n34\n*`;
      const result = parseInputForPart2(input);
      expect(result).toEqual([{ elements: [24, 13], sign: "*" }]);
    });

    it("should handle numbers with different lengths (spaces matter)", () => {
      // Input:
      // 100
      //  50
      //   5
      // +
      // Transposed right-to-left:
      // Col 2 (right): '0', '0', '5' → 5
      // Col 1 (middle): '0', '5', ' ' → 50
      // Col 0 (left): '1', ' ', ' ' → 1
      // Result: [5, 50, 1] with '+'
      const input = `100\n 50\n  5\n+`;
      const result = parseInputForPart2(input);
      expect(result).toEqual([{ elements: [5, 5, 1], sign: "+" }]);
    });

    it("should handle single column problem", () => {
      // Input:
      // 123
      // 456
      // 789
      // +
      // Transposed right-to-left:
      // Col 2: '3', '6', '9' → 369
      // Col 1: '2', '5', '8' → 258
      // Col 0: '1', '4', '7' → 147
      // Result: [369, 258, 147] with '+'
      const input = `123\n456\n789\n+`;
      const result = parseInputForPart2(input);
      expect(result).toEqual([{ elements: [369, 258, 147], sign: "+" }]);
    });

    it("should verify rightmost problem calculation from example", () => {
      // Rightmost: 64, 23, 314 → transposed: 4 + 431 + 623
      const input = `64\n23\n314\n+`;
      const result = parseInputForPart2(input);
      expect(result).toEqual([{ elements: [4, 431, 623], sign: "+" }]);
      // Verify calculation
      const sum = getResultFromCalculation(result[0].elements, result[0].sign);
      expect(sum).toBe(1058);
    });

    it("should verify leftmost problem calculation from example", () => {
      // Leftmost: 123, 45, 6 → transposed: 356 * 24 * 1
      const input = `123\n 45\n  6\n*`;
      const result = parseInputForPart2(input);
      expect(result).toEqual([{ elements: [356, 24, 1], sign: "*" }]);
      // Verify calculation
      const product = getResultFromCalculation(result[0].elements, result[0].sign);
      expect(product).toBe(8544);
    });
  });

  describe("Part 1", () => {
    it("should solve the example and return 4277556", () => {
      const result = solvePart1(exampleInput);
      // 123 * 45 * 6 = 33210
      // 328 + 64 + 98 = 490
      // 51 * 387 * 215 = 4243455
      // 64 + 23 + 314 = 401
      // Grand total: 33210 + 490 + 4243455 + 401 = 4277556
      expect(result).toBe(4277556);
    });
  });

  describe("Part 2", () => {
    it("should solve the example and return 3263827", () => {
      const result = solvePart2(exampleInput);
      // After transposing and reading right-to-left:
      // 356 * 24 * 1 = 8544
      // 8 + 248 + 369 = 625
      // 175 * 581 * 32 = 3253600
      // 4 + 431 + 623 = 1058
      // Grand total: 8544 + 625 + 3253600 + 1058 = 3263827
      expect(result).toBe(3263827);
    });
  });
});
