export interface BestBattery {
  battery: number;
  index: number;
}

export const parseInput = (input: string): Array<Array<number>> =>
  input
    .trim()
    .split("\n")
    .map((batteryBank: string) =>
      batteryBank.split("").map((battery) => Number(battery))
    );

export const findBestBattery = (batteryBank: Array<number>): BestBattery =>
  batteryBank.reduce(
    ({ battery, index }, currentBattery, currentIndex) => ({
      battery: currentBattery > battery ? currentBattery : battery,
      index: currentBattery > battery ? currentIndex : index,
    }),
    {
      battery: 0,
      index: 0,
    }
  );

export const findLargestJoltageFromBatteryBank = (
  batteryBank: Array<number>,
  numberOfBatteries: number = 2
) =>
  batteryBank.reduce(
    ({ bestJoltage }, battery, index, batteryBank) => {
      if (batteryBank.length - index < numberOfBatteries) {
        return {
          bestJoltage,
        };
      }

      let currentIndex = index + 1;
      const batteryList = [battery];
      for (let i = 1; i < numberOfBatteries; i++) {
        const { battery, index: indexUsed } = findBestBattery([
          ...batteryBank.slice(
            currentIndex,
            batteryBank.length - (numberOfBatteries - batteryList.length - 1)
          ),
        ]);
        batteryList.push(battery);
        currentIndex = currentIndex + indexUsed + 1;
      }

      const joltage = Number(batteryList.join(""));
      return {
        bestJoltage: joltage > bestJoltage ? joltage : bestJoltage,
      };
    },
    {
      bestJoltage: 0,
    }
  );
