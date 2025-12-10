export type Grid = string[][];

export interface BeamResult {
  splitTimes: number;
  beams: Map<string, Beam>;
  timelines: number;
}

export interface Beam {
  x: number;
  y: number;
  count: number;
}

export enum CellType {
  BEAM = "|",
  SPLITTER = "^",
  STARTER = "S",
  EMPTY = ".",
}

export const parseInput = (input: string): Grid => {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
};

export const findStarterPoint = (grid: Grid): { x: number; y: number } => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === CellType.STARTER) {
        return {
          x,
          y,
        };
      }
    }
  }
  throw new Error("Starter point not found");
};

export const calculateBeam = (grid: Grid): BeamResult => {
  const starterPoint = findStarterPoint(grid);
  const beams: Map<string, Beam> = new Map();
  const splitBeams: Map<string, boolean> = new Map();
  beams.set(`${starterPoint.x}-${starterPoint.y}`, {
    x: starterPoint.x,
    y: starterPoint.y,
    count: 1,
  });

  for (let y = starterPoint.y + 1; y < grid.length; y++) {
    [...beams.keys()].forEach((key) => {
      const beam = beams.get(key)!;
      const newKey = `${beam.x}-${y}`;
      beams.delete(key);

      // If the cell is empty beam continue the run
      if (grid[y][beam.x] === CellType.EMPTY) {
        const existingCount = beams.get(newKey)?.count ?? 0;
        beams.set(newKey, { ...beam, y, count: existingCount + beam.count });
        return;
      }

      // If the cell is a splitter then split the beam
      if (grid[y][beam.x] === CellType.SPLITTER) {
        splitBeams.set(newKey, true);
        if (beam.x > 0) {
          const newKey = `${beam.x - 1}-${y}`;
          const beamCount = beams.get(newKey)?.count ?? 0;
          beams.set(`${beam.x - 1}-${y}`, {
            x: beam.x - 1,
            y,
            count: beamCount + beam.count,
          });
        }
        if (beam.x < grid[beam.y].length - 1) {
          const newKey = `${beam.x + 1}-${y}`;
          const beamCount = beams.get(newKey)?.count ?? 0;
          beams.set(`${beam.x + 1}-${y}`, {
            x: beam.x + 1,
            y,
            count: beamCount + beam.count,
          });
        }
        return;
      }
    });
  }

  const timelines = [...beams.values()].reduce((total, beam) => total + beam.count, 0);
  return { splitTimes: splitBeams.size, beams, timelines };
};
