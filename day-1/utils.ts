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
  let zeroCount = 0;

  if (dial === 0) {
    zeroCount = Math.floor(clicks / 100);
  } else {
    const firstZero = direction === Direction.RIGHT ? 100 - dial : dial;
    if (clicks >= firstZero) {
      zeroCount = 1 + Math.floor((clicks - firstZero) / 100);
    }
  }

  let newDial = direction === Direction.LEFT ? dial - clicks : dial + clicks;

  if (newDial < 0) {
    const mod = newDial % 100;
    newDial = mod === 0 ? 0 : mod + 100;
  } else if (newDial >= 100) {
    newDial = newDial % 100;
  }

  return {
    dial: newDial,
    zeroCount,
  };
};
