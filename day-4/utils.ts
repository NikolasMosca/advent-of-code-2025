export enum CellType {
  ForkLift = "x",
  Empty = ".",
  RollsPaper = "@",
}

export interface ScanMapResult {
  rollsAccessedByForklift: number;
  accessibleRolls: Array<number[]>;
}

export interface RemoveAllAccessibleRollsResult {
  totalRemoved: number;
  iterations: number;
  iterationDetails: Array<{ removedCount: number }>;
  finalMap: Array<CellType[]>;
}

export const parseInput = (input: string): Array<CellType[]> =>
  input
    .trim()
    .split("\n")
    .map((line: string) => line.split("") as CellType[]);

export const countRollsOfPaperAround = (
  map: Array<CellType[]>,
  x: number,
  y: number,
  range: number = 1
): Map<string, number> => {
  const result = new Map<string, number>();

  if (map[y][x] !== CellType.RollsPaper) {
    throw new Error("This cell isn't a RollsPaper");
  }

  for (let currentX = x - range; currentX <= x + range; currentX++) {
    for (let currentY = y - range; currentY <= y + range; currentY++) {
      if (currentX === x && currentY === y) continue;
      if (map?.[currentY]?.[currentX] === CellType.RollsPaper) {
        result.set(`${currentX}-${currentY}`, 1);
      }
    }
  }

  return result;
};

export const scanMap = (map: Array<CellType[]>): ScanMapResult => {
  const { accessibleRolls } = map.reduce(
    (data, row, y) => {
      row.forEach((_, x) => {
        try {
          const rollsPaperFound = countRollsOfPaperAround(map, x, y);
          if (rollsPaperFound.size < 4) {
            data.accessibleRolls.set(`${x}-${y}`, 1);
          }
        } catch (e) {}
      });
      return data;
    },
    {
      accessibleRolls: new Map<string, number>(),
    }
  );

  return {
    rollsAccessedByForklift: accessibleRolls.size,
    accessibleRolls: [...accessibleRolls.keys()].map((key) =>
      key.split("-").map((index) => Number(index))
    ),
  };
};

export const removeAllAccessibleRolls = (
  map: Array<CellType[]>
): RemoveAllAccessibleRollsResult => {
  let currentMap = map.map(row => [...row]);
  let totalRolls = 0;
  let accessibleRollsFound = 0;
  const iterationDetails: Array<{ removedCount: number }> = [];

  do {
    const { rollsAccessedByForklift, accessibleRolls } = scanMap(currentMap);
    accessibleRolls.forEach(([x, y]) => (currentMap[y][x] = CellType.Empty));
    accessibleRollsFound = accessibleRolls.length;

    if (accessibleRollsFound > 0) {
      totalRolls += rollsAccessedByForklift;
      iterationDetails.push({ removedCount: rollsAccessedByForklift });
    }
  } while (accessibleRollsFound > 0);

  return {
    totalRemoved: totalRolls,
    iterations: iterationDetails.length,
    iterationDetails,
    finalMap: currentMap,
  };
};
