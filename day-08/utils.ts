export interface JunctionBox {
  x: number;
  y: number;
  z: number;
}

export interface CircuitsResult {
  circuits: JunctionBox[][];
}

export interface LastConnectionResult {
  box1: JunctionBox;
  box2: JunctionBox;
}

export interface Connection {
  box1: JunctionBox;
  box2: JunctionBox;
  distance: number;
}

export const readInput = (input: string): JunctionBox[] => {
  return input.split("\n").map((item) => {
    const [x, y, z] = item.split(",");
    return { x: Number(x), y: Number(y), z: Number(z) };
  });
};

export const calculateDistance = (box1: JunctionBox, box2: JunctionBox): number => {
  const dx = box2.x - box1.x;
  const dy = box2.y - box1.y;
  const dz = box2.z - box1.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const getConnections = (junctionBoxes: JunctionBox[]): Array<Connection> => {
  const connections: Array<{
    box1: JunctionBox;
    box2: JunctionBox;
    distance: number;
  }> = [];

  junctionBoxes.forEach((box1, i) => {
    junctionBoxes.slice(i + 1).forEach((box2) => {
      const distance = calculateDistance(box1, box2);
      connections.push({
        box1,
        box2,
        distance,
      });
    });
  });

  connections.sort((a, b) => a.distance - b.distance);

  return connections;
};

export const findCircuitsForJunctionBoxes = (
  junctionBoxes: JunctionBox[],
  numberConnections: number = 10
): CircuitsResult => {
  const connections = getConnections(junctionBoxes);
  const shortestConnections = connections.slice(0, numberConnections);
  const unionFind = new UnionFind(junctionBoxes);
  shortestConnections.forEach((conn) => {
    unionFind.union(conn.box1, conn.box2);
  });

  const circuits = unionFind.getCircuits();
  return { circuits };
};

export const findLastConnectionToUnify = (
  junctionBoxes: JunctionBox[]
): LastConnectionResult => {
  const connections = getConnections(junctionBoxes);
  const unionFind = new UnionFind(junctionBoxes);
  const result = connections.reduce(
    (acc, conn) => {
      if (acc.circuitCount === 1) return acc;

      const wasUnified = unionFind.union(conn.box1, conn.box2);
      if (wasUnified) {
        return {
          circuitCount: acc.circuitCount - 1,
          lastConnection: { box1: conn.box1, box2: conn.box2 },
        };
      }
      return acc;
    },
    {
      circuitCount: junctionBoxes.length,
      lastConnection: null as LastConnectionResult | null,
    }
  );

  if (!result.lastConnection) {
    throw new Error("No connections were made");
  }

  return result.lastConnection;
};

class UnionFind {
  private parent: Map<string, string>;
  private rank: Map<string, number>;
  private boxes: Map<string, JunctionBox>;

  constructor(junctionBoxes: JunctionBox[]) {
    this.parent = new Map();
    this.rank = new Map();
    this.boxes = new Map();

    for (const box of junctionBoxes) {
      const key = this.getBoxKey(box);
      this.parent.set(key, key);
      this.rank.set(key, 0);
      this.boxes.set(key, box);
    }
  }

  private getBoxKey(box: JunctionBox): string {
    return `${box.x}-${box.y}-${box.z}`;
  }

  find(box: JunctionBox): string {
    const key = this.getBoxKey(box);
    return this.findByKey(key);
  }

  private findByKey(key: string): string {
    const parentKey = this.parent.get(key);
    if (!parentKey) {
      throw new Error(`Junction box with key ${key} not found`);
    }

    if (parentKey !== key) {
      this.parent.set(key, this.findByKey(parentKey));
    }

    return this.parent.get(key)!;
  }

  union(box1: JunctionBox, box2: JunctionBox): boolean {
    const rootKey1 = this.find(box1);
    const rootKey2 = this.find(box2);

    if (rootKey1 === rootKey2) return false;

    const rank1 = this.rank.get(rootKey1)!;
    const rank2 = this.rank.get(rootKey2)!;

    if (rank1 < rank2) {
      this.parent.set(rootKey1, rootKey2);
    } else if (rank1 > rank2) {
      this.parent.set(rootKey2, rootKey1);
    } else {
      this.parent.set(rootKey2, rootKey1);
      this.rank.set(rootKey1, rank1 + 1);
    }

    return true;
  }

  getCircuits(): JunctionBox[][] {
    const circuitMap = new Map<string, JunctionBox[]>();

    for (const [boxKey, box] of this.boxes) {
      const rootKey = this.findByKey(boxKey);

      if (!circuitMap.has(rootKey)) {
        circuitMap.set(rootKey, []);
      }

      circuitMap.get(rootKey)!.push(box);
    }

    return Array.from(circuitMap.values());
  }
}
