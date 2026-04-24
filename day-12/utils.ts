export enum CellType {
  BLOCK = "#",
  EMPTY = ".",
}

export type Shape = CellType[][];

export interface Region {
  width: number;
  height: number;
  requiredShapes: number[]; // Index is shape ID, value is quantity needed
}

export interface PuzzleInput {
  shapes: Shape[];
  regions: Region[];
}

export const readInput = (input: string): PuzzleInput => {
  const lines = input.trim().split("\n");

  const shapes: Shape[] = [];
  const regions: Region[] = [];

  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    const isShape = /^\d+:$/.test(line);
    const isRegion = /^\d+x\d+:/.test(line);

    if (isShape) {
      const shapeLines: string[] = [];
      i++;

      while (i < lines.length && lines[i].trim() !== "" && !/^\d+x\d+:/.test(lines[i])) {
        shapeLines.push(lines[i]);
        i++;
      }

      const shapeMatrix: CellType[][] = shapeLines.map((line) =>
        line.split("").map((char) => (char === "#" ? CellType.BLOCK : CellType.EMPTY))
      );

      shapes.push(shapeMatrix);
    } else if (isRegion) {
      const [dimensions, countsStr] = line.split(": ");
      const [width, height] = dimensions.split("x").map(Number);
      const requiredShapes = countsStr.split(" ").map(Number);

      regions.push({ width, height, requiredShapes });
      i++;
    } else {
      i++;
    }
  }

  return { shapes, regions };
};

export const canFitPresents = (region: Region, shapes: Shape[]): boolean => {
  const map: Shape = Array.from({ length: region.height }, () =>
    Array.from({ length: region.width }, () => CellType.EMPTY)
  );
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {}
  }
  return false;
};

export const rotateShape = (shape: Shape): Shape => {
  const rows = shape.length;
  const cols = shape[0].length;

  const rotated: Shape = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => CellType.EMPTY)
  );

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][i] = shape[rows - 1 - i][j];
    }
  }

  return rotated;
};

export const canPutHere = (map: Shape, i: number, j: number, shape: Shape) => {
  if (map.length - i < shape.length) {
    return false;
  }
  if (map[i].length - j < shape[0].length) {
    return false;
  }

  return true;
};
