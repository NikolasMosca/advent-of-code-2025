export enum Direction {
  LEFT = "L",
  RIGHT = "R",
}

export interface DialRotation {
  direction: Direction;
  clicks: number;
}

export const parseInput = (input: string): DialRotation[] =>
  input
    .trim()
    .split("\n")
    .map((command) => ({
      direction: command.at(0) as Direction,
      clicks: Number(command.slice(1)),
    }));

export const rotateDial = (dial: number, direction: Direction, clicks: number) => {
  if (direction === Direction.LEFT) {
    dial -= clicks;
  } else {
    dial += clicks;
  }

  if (dial < 0) {
    dial = (dial % 100) + 100;
  } else if (dial > 99) {
    dial = dial % 100;
  }

  if (dial === 100) {
    dial = 0;
  }

  return dial;
};
