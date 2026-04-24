export interface Range {
  start: number;
  end: number;
}

export type Ingredient = number;

export interface InputResult {
  ranges: Range[];
  ingredients: Ingredient[];
}

export const parseInput = (input: string): InputResult => {
  const [rangeString, ingredientString] = input.trim().split("\n\n");
  const ranges = rangeString
    .split("\n")
    .map((range) => {
      const [start, end] = range.split("-").map((item) => Number(item));
      return { start, end };
    })
    .sort((a, b) => a.start - b.start);
  return {
    ranges,
    ingredients: ingredientString.split("\n").map((item) => Number(item)),
  };
};

export const checkIfIngredientIsFresh = (
  ranges: Range[],
  ingredientId: Ingredient
): boolean => {
  return Boolean(
    ranges.find(({ start, end }) => ingredientId >= start && ingredientId <= end)
  );
};

export const countFreshIngredientIdsFromRanges = (ranges: Range[]): number => {
  if (ranges.length === 0) return 0;

  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged = sorted.reduce((mergedRanges, range) => {
    if (mergedRanges.length === 0) return [range];

    const last = mergedRanges[mergedRanges.length - 1];
    if (range.start <= last.end + 1) {
      mergedRanges[mergedRanges.length - 1] = {
        start: last.start,
        end: Math.max(last.end, range.end),
      };
    } else {
      mergedRanges.push(range);
    }

    return mergedRanges;
  }, [] as Range[]);

  return merged.reduce((total, { start, end }) => total + (end - start + 1), 0);
};
