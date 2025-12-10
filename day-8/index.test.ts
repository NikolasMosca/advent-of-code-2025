import { describe, it, expect } from "vitest";
import { solvePart1, solvePart2 } from "./index";
import {
  readInput,
  findCircuitsForJunctionBoxes,
  findLastConnectionToUnify,
  JunctionBox,
} from "./utils";

const exampleInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

describe("Day 8", () => {
  describe("readInput", () => {
    it("should parse the input into an array of junction boxes", () => {
      const result = readInput(exampleInput);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(20);
    });

    it("should parse the first junction box correctly", () => {
      const result = readInput(exampleInput);

      expect(result[0]).toEqual({ x: 162, y: 817, z: 812 });
    });

    it("should parse the last junction box correctly", () => {
      const result = readInput(exampleInput);

      expect(result[19]).toEqual({ x: 425, y: 690, z: 689 });
    });

    it("should parse all junction boxes with correct structure", () => {
      const result = readInput(exampleInput);

      result.forEach((box) => {
        expect(box).toHaveProperty("x");
        expect(box).toHaveProperty("y");
        expect(box).toHaveProperty("z");
        expect(typeof box.x).toBe("number");
        expect(typeof box.y).toBe("number");
        expect(typeof box.z).toBe("number");
      });
    });

    it("should handle a single junction box", () => {
      const singleInput = `100,200,300`;
      const result = readInput(singleInput);

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ x: 100, y: 200, z: 300 });
    });

    it("should handle multiple junction boxes with different values", () => {
      const multiInput = `1,2,3\n4,5,6\n7,8,9`;
      const result = readInput(multiInput);

      expect(result.length).toBe(3);
      expect(result[0]).toEqual({ x: 1, y: 2, z: 3 });
      expect(result[1]).toEqual({ x: 4, y: 5, z: 6 });
      expect(result[2]).toEqual({ x: 7, y: 8, z: 9 });
    });
  });

  describe("findCircuitsForJunctionBoxes", () => {
    it("should return an object with a circuits property", () => {
      const junctionBoxes = readInput(exampleInput);
      const result = findCircuitsForJunctionBoxes(junctionBoxes);
      expect(result).toHaveProperty("circuits");
      expect(Array.isArray(result.circuits)).toBe(true);
    });

    it("should have circuits where each circuit is an array of junction boxes", () => {
      const junctionBoxes = readInput(exampleInput);
      const result = findCircuitsForJunctionBoxes(junctionBoxes);

      result.circuits.forEach((circuit) => {
        expect(Array.isArray(circuit)).toBe(true);
        circuit.forEach((box) => {
          expect(box).toHaveProperty("x");
          expect(box).toHaveProperty("y");
          expect(box).toHaveProperty("z");
        });
      });
    });

    it("should create circuits after making 10 shortest connections (example)", () => {
      // After making the ten shortest connections, there are 11 circuits:
      // - one circuit which contains 5 junction boxes
      // - one circuit which contains 4 junction boxes
      // - two circuits which contain 2 junction boxes each
      // - seven circuits which each contain a single junction box
      const junctionBoxes = readInput(exampleInput);
      const result = findCircuitsForJunctionBoxes(junctionBoxes);

      // After 10 connections, we should have 11 circuits (20 boxes - 10 connections + 1)
      // Each connection merges two separate circuits into one
      expect(result.circuits.length).toBe(11);
    });

    it("should have the correct circuit sizes after 10 connections (example)", () => {
      const junctionBoxes = readInput(exampleInput);
      const result = findCircuitsForJunctionBoxes(junctionBoxes);

      const sizes = result.circuits.map((c) => c.length).sort((a, b) => b - a);

      // Should have: 5, 4, 2, 2, 1, 1, 1, 1, 1, 1, 1
      expect(sizes[0]).toBe(5); // largest circuit
      expect(sizes[1]).toBe(4); // second largest
      expect(sizes[2]).toBe(2); // third largest (one of the two size-2 circuits)
      expect(sizes[3]).toBe(2); // the other size-2 circuit

      // Seven circuits of size 1
      const sizeOnes = sizes.filter((s) => s === 1);
      expect(sizeOnes.length).toBe(7);
    });

    it("should handle a simple case with 3 junction boxes", () => {
      const simpleInput = `0,0,0\n1,1,1\n10,10,10`;
      const junctionBoxes = readInput(simpleInput);
      const result = findCircuitsForJunctionBoxes(junctionBoxes);

      // Should have circuits property
      expect(result).toHaveProperty("circuits");
      expect(Array.isArray(result.circuits)).toBe(true);

      // Total number of junction boxes across all circuits should be 3
      const totalBoxes = result.circuits.reduce(
        (sum, circuit) => sum + circuit.length,
        0
      );
      expect(totalBoxes).toBe(3);
    });
  });

  describe("Part 1", () => {
    it("should solve the example and return 40", () => {
      const junctionBoxes = readInput(exampleInput);
      const result = findCircuitsForJunctionBoxes(junctionBoxes);
      const sortedSizes = result.circuits
        .map((circuit) => circuit.length)
        .sort((a, b) => b - a);

      expect(sortedSizes[0] * sortedSizes[1] * sortedSizes[2]).toBe(40);
    });
  });

  describe("findLastConnectionToUnify", () => {
    it("should return an object with box1 and box2 properties", () => {
      const junctionBoxes = readInput(exampleInput);
      const result = findLastConnectionToUnify(junctionBoxes);

      expect(result).toHaveProperty("box1");
      expect(result).toHaveProperty("box2");
      expect(result.box1).toHaveProperty("x");
      expect(result.box1).toHaveProperty("y");
      expect(result.box1).toHaveProperty("z");
      expect(result.box2).toHaveProperty("x");
      expect(result.box2).toHaveProperty("y");
      expect(result.box2).toHaveProperty("z");
    });

    it("should return the correct last connection for the example", () => {
      const junctionBoxes = readInput(exampleInput);
      const result = findLastConnectionToUnify(junctionBoxes);

      const box1Coords = [result.box1.x, result.box1.y, result.box1.z];
      const box2Coords = [result.box2.x, result.box2.y, result.box2.z];

      const expected1 = [216, 146, 977];
      const expected2 = [117, 168, 530];

      const isCorrect =
        (box1Coords[0] === expected1[0] &&
          box1Coords[1] === expected1[1] &&
          box1Coords[2] === expected1[2] &&
          box2Coords[0] === expected2[0] &&
          box2Coords[1] === expected2[1] &&
          box2Coords[2] === expected2[2]) ||
        (box1Coords[0] === expected2[0] &&
          box1Coords[1] === expected2[1] &&
          box1Coords[2] === expected2[2] &&
          box2Coords[0] === expected1[0] &&
          box2Coords[1] === expected1[1] &&
          box2Coords[2] === expected1[2]);

      expect(isCorrect).toBe(true);
    });

    it("should connect until there is only 1 circuit", () => {
      const junctionBoxes = readInput(exampleInput);
      const lastConnection = findLastConnectionToUnify(junctionBoxes);

      const allConnections: Array<{
        box1: JunctionBox;
        box2: JunctionBox;
        distance: number;
      }> = [];

      junctionBoxes.forEach((box1, i) => {
        junctionBoxes.slice(i + 1).forEach((box2) => {
          const distance = Math.sqrt(
            (box2.x - box1.x) ** 2 +
              (box2.y - box1.y) ** 2 +
              (box2.z - box1.z) ** 2
          );
          allConnections.push({ box1, box2, distance });
        });
      });

      allConnections.sort((a, b) => a.distance - b.distance);

      const result = findCircuitsForJunctionBoxes(
        junctionBoxes,
        allConnections.length
      );
      expect(result.circuits.length).toBe(1);
    });

    it("should handle a simple case with 3 junction boxes", () => {
      const simpleInput = `0,0,0\n10,0,0\n5,0,0`;
      const junctionBoxes = readInput(simpleInput);
      const result = findLastConnectionToUnify(junctionBoxes);

      expect(result).toHaveProperty("box1");
      expect(result).toHaveProperty("box2");
    });
  });

  describe("Part 2", () => {
    it("should solve the example and return 25272", () => {
      const result = solvePart2(exampleInput);
      expect(result).toBe(25272);
    });
  });
});
