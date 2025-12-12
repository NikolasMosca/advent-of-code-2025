export type DeviceGraph = Map<string, string[]>;

export const readInput = (input: string): DeviceGraph => {
  const graph = new Map<string, string[]>();

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const [device, outputs] = line.split(": ");
      const outputList = outputs.split(" ");
      graph.set(device, outputList);
    });

  return graph;
};

export const countPaths = (
  graph: DeviceGraph,
  start: string,
  end: string,
  count: number = 0
): number => {
  const ways = graph.get(start) ?? [];
  if (ways?.includes(end)) {
    count++;
  }
  for (let i = 0; i < ways.length; i++) {
    count += countPaths(graph, ways[i], end);
  }
  return count;
};

export const countPathsThrough = (
  graph: DeviceGraph,
  start: string,
  end: string,
  mustVisit: string[],
  mustVisitSet?: Set<string>,
  visitedRequired?: Set<string>,
  visitedAll?: Set<string>,
  memo?: Map<string, number>
): number => {
  if (!mustVisitSet) {
    mustVisitSet = new Set(mustVisit);
    visitedRequired = new Set();
    visitedAll = new Set();
    memo = new Map();
  }

  const memoKey = `${start}-${Array.from(visitedRequired!).sort().join(',')}`;
  if (memo!.has(memoKey)) {
    return memo!.get(memoKey)!;
  }

  const ways = graph.get(start) ?? [];
  let count = 0;

  if (ways.includes(end)) {
    if (visitedRequired!.size === mustVisit.length) {
      count++;
    }
  }

  for (let i = 0; i < ways.length; i++) {
    const nextNode = ways[i];

    if (visitedAll!.has(nextNode)) {
      continue;
    }

    const isRequired = mustVisitSet.has(nextNode);
    if (isRequired) {
      visitedRequired!.add(nextNode);
    }
    visitedAll!.add(nextNode);

    count += countPathsThrough(
      graph,
      nextNode,
      end,
      mustVisit,
      mustVisitSet,
      visitedRequired,
      visitedAll,
      memo
    );

    if (isRequired) {
      visitedRequired!.delete(nextNode);
    }
    visitedAll!.delete(nextNode);
  }

  memo!.set(memoKey, count);
  return count;
};
