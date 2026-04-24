export interface Range {
  start: number;
  end: number;
}

export interface RepeatedDigitsResult {
  twice: number[];
  threeTimes: number[];
  fiveTimes: number[];
  sevenTimes: number[];
}

export const parseInput = (input: string): Range[] =>
  input
    .trim()
    .split(",")
    .map((rangeWithDash: string) => ({
      start: Number(rangeWithDash.split("-")[0]),
      end: Number(rangeWithDash.split("-")[1]),
    }));

export const isDigitRepeat = (number: number, times: number) => {
  const stringNumber = String(number);
  if (stringNumber.length % times !== 0) {
    return false;
  }
  const segment = Math.floor(stringNumber.length / times);
  const firstSegment = stringNumber.slice(0, segment);
  for (let i = 1; i < times; i++) {
    const nextSegment = stringNumber.slice(segment * i, segment * (i + 1));
    if (firstSegment !== nextSegment) {
      return false;
    }
  }
  return true;
};

export const findRepeatedDigits = ({ start, end }: Range): RepeatedDigitsResult => {
  const twice = [];
  const threeTimes = [];
  const fiveTimes = [];
  const sevenTimes = [];

  for (let number = start; number <= end; number++) {
    if (isDigitRepeat(number, 2)) {
      twice.push(number);
    }
    if (isDigitRepeat(number, 3)) {
      threeTimes.push(number);
    }
    if (isDigitRepeat(number, 5)) {
      fiveTimes.push(number);
    }
    if (isDigitRepeat(number, 7)) {
      sevenTimes.push(number);
    }
  }

  return { twice, threeTimes, fiveTimes, sevenTimes };
};
