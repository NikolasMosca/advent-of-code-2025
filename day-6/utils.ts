export type OperationSign = "+" | "*";

export interface Problem {
  elements: number[];
  sign: OperationSign;
}

interface ColumnData {
  columns: string[][];
  sign: OperationSign[];
}

interface GroupedData {
  items: Problem[];
  sign: OperationSign;
  signIndex: number;
  itemIndex: number;
}

export const parseInput = (input: string): Problem[] => {
  const data = input.split("\n").reduce(
    (data, row) => {
      row
        .split(" ")
        .filter((item) => item.length > 0)
        .forEach((item, index) => {
          if (!data.columns[index]) {
            data.columns[index] = [];
          }
          data.columns[index].push(item);
        });
      return data;
    },
    {
      columns: [] as Array<string[]>,
    }
  );

  return data.columns.map((item) => ({
    elements: item.slice(0, item.length - 1).map((item) => Number(item)),
    sign: item.at(-1)! as OperationSign,
  }));
};

export const parseInputForPart2 = (input: string): Problem[] => {
  const data = input.split("\n").map((row) => row.split(""));

  const maxLength = data.reduce(
    (max, row) => (row.length > max ? row.length : max),
    0
  );

  const transposed = [];
  for (let i = 0; i < maxLength; i++) {
    const column = [];
    for (let j = 0; j < data.length; j++) {
      column.push(data[j][i] ?? " ");
    }
    transposed.push(column);
  }

  const rightToLeft = transposed.reverse();
  const columnsData = rightToLeft.reduce<ColumnData>(
    (acc, row, index) => {
      const sign = row.find((item) => ["+", "*"].includes(item));
      const filteredRow = row.filter(
        (item) => item !== " " && !isNaN(Number(item))
      );

      if (!acc.columns[index]) {
        acc.columns[index] = [];
      }

      filteredRow.forEach((item) => {
        acc.columns[index].push(item);
      });

      if (sign) {
        acc.sign[index] = sign as OperationSign;
      }

      return acc;
    },
    {
      columns: [],
      sign: [],
    }
  );

  const grouped = columnsData.columns.reduce<GroupedData>(
    (acc, column, index) => {
      const currentSign = columnsData.sign[index];

      if (column.length === 0) {
        if (acc.items[acc.itemIndex]?.elements.length > 0) {
          acc.itemIndex++;
        }
        return acc;
      }

      if (!acc.items[acc.itemIndex]) {
        acc.items[acc.itemIndex] = {
          elements: [],
          sign: acc.sign,
        };
      }

      acc.items[acc.itemIndex].elements.push(Number(column.join("")));

      if (currentSign) {
        acc.items[acc.itemIndex].sign = currentSign;
        acc.sign = currentSign;
      }

      return acc;
    },
    {
      items: [],
      sign: columnsData.sign.find((s) => s !== undefined) as OperationSign,
      signIndex: 0,
      itemIndex: 0,
    }
  );

  return grouped.items;
};

export const getResultFromCalculation = (
  elements: number[],
  sign: OperationSign
): number => {
  if (sign === "+") {
    return elements.reduce((total, item) => total + item, 0);
  }
  if (sign === "*") {
    return elements.reduce(
      (total, item, index) => (total === 0 && index === 0 ? 1 : total) * item,
      0
    );
  }
  return 0;
};
