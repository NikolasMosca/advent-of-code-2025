export interface Coordinate {
  x: number;
  y: number;
}

export const readInput = (input: string): Coordinate[] => {
  return input.split("\n").map((item) => {
    const [x, y] = item.split(",");
    return { x: Number(x), y: Number(y) };
  });
};

export const getRectAreaBetweenTwoCoordinates = (a: Coordinate, b: Coordinate) => {
  const width = Math.abs(a.x - b.x) + 1;
  const height = Math.abs(a.y - b.y) + 1;
  return width * height;
};

export const getLargestRectangle = (coordinates: Coordinate[]) =>
  coordinates.reduce((best, a, index, list) => {
    const area = list.slice(index + 1).reduce((best, b) => {
      const area = getRectAreaBetweenTwoCoordinates(a, b);
      return area > best ? area : best;
    }, 0);
    return area > best ? area : best;
  }, 0);
