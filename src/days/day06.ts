import { getFilename, readFile } from "../util/readFile";
import { log, logTable } from "../util/log";
import { assertNever } from "../util/assertions";

const Day = "06";

const wait = () => new Promise((resolve) => setTimeout(resolve, 25));

const directionOrder = ["north", "east", "south", "west"];
const Direction = {
  north: 0,
  east: 1,
  south: 2,
  west: 3,
};

const direction: Record<number, string> = {
  0: "^",
  1: ">",
  2: "v",
  3: "<",
};

class Map {
  private orientation = Direction.north;
  private position = { x: -1, y: -1 };
  private traveledMap: string[][];
  private exitFound = false;

  constructor(private map: string[][]) {
    this.map = map;
    this.traveledMap = map;
    this.findStart();
  }

  private findStart() {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] === "^") {
          this.position = { x, y };
          return;
        }
      }
    }
  }

  private nextPosition(x: number, y: number) {
    const position = { x, y };

    if (this.orientation === Direction.north) {
      position.y -= 1;
    }
    if (this.orientation === Direction.east) {
      position.x += 1;
    }
    if (this.orientation === Direction.south) {
      position.y += 1;
    }
    if (this.orientation === Direction.west) {
      position.x -= 1;
    }

    return position;
  }

  private atBoundary() {
    const { x, y } = this.position;
    const lookAhead = this.nextPosition(x, y);

    if (
      this.map[lookAhead.y] === undefined ||
      this.map[lookAhead.y][lookAhead.x] === undefined
    ) {
      this.exitFound = true;
    } else {
      if (this.map[lookAhead.y][lookAhead.x] === "#") {
        return true;
      }
    }
  }

  private step() {
    this.traveledMap[this.position.y][this.position.x] = "X";

    if (this.atBoundary()) {
      this.turn();
      return;
    }

    const { x, y } = this.position;
    // this.map[y][x] = "X";
    const next = this.nextPosition(x, y);
    this.position = next;
    // this.map[next.y][next.x] = `${direction[this.orientation]}`;
  }

  private turn() {
    switch (this.orientation) {
      case Direction.north:
        this.orientation = Direction.east;
        break;
      case Direction.east:
        this.orientation = Direction.south;
        break;
      case Direction.south:
        this.orientation = Direction.west;
        break;
      case Direction.west:
        this.orientation = Direction.north;
        break;
      default:
        assertNever(this.orientation as never, "Invalid orientation");
    }
  }

  private async debug() {
    await wait();
    // console.clear();
    // logTable({ data: this.traveledMap });
    log(
      "Position: ",
      this.position,
      direction[this.orientation],
      this.traveledMap[this.position.y][this.position.x]
    );
  }

  public async findExit() {
    while (!this.exitFound) {
      this.step();
    }
  }

  public distinctPositions() {
    let count = 0;
    for (let y = 0; y < this.traveledMap.length; y++) {
      for (let x = 0; x < this.traveledMap[y].length; x++) {
        if (this.traveledMap[y][x] === "X") {
          count++;
        }
      }
    }

    return count;
  }
}

export const partOne = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);
  const mapData = data.split("\n").map((line) => line.split(""));

  const map = new Map(mapData);
  map.findExit();
  const answer = map.distinctPositions();
  log("Part One number of distinct positions: ", answer);
};
export const partTwo = () => console.log("Not implemented");
