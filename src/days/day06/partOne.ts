import { getFilename, readFile } from "../../util/readFile";
import { log, logTable } from "../../util/log";
import { assertNever } from "../../util/assertions";

import { Direction, direction, Day, wait } from "./util";

class PartOne {
  private orientation = Direction.north;
  private position = { x: -1, y: -1 };
  private traveledMap: string[][];
  private exitFound = false;
  private traveledCoords: string[] = [];

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

    if (this.map[lookAhead.y][lookAhead.x] === "#") {
      return true;
    }
  }

  private step() {
    this.traveledMap[this.position.y][this.position.x] = "X";
    // this.traveledCoords.push(
    //   `${this.position.x}:${this.position.y}:${this.orientation}`
    // );

    const { x, y } = this.position;
    const next = this.nextPosition(x, y);
    if (
      this.traveledMap[next.y] === undefined ||
      this.traveledMap[next.y][next.x] === undefined
    ) {
      this.exitFound = true;
      return;
    }

    if (this.atBoundary()) {
      this.turn();
      return;
    }

    // this.map[y][x] = "X";
    this.position = next;

    // DEBUG line
    this.traveledMap[next.y][next.x] = `${direction[this.orientation]}`;
    this.traveledCoords.push(`${next.x}:${next.y}:${this.orientation}`);
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
    await wait(100);
    console.clear();
    logTable({ data: this.traveledMap });
    const lastTraveledCoord =
      this.traveledCoords[this.traveledCoords.length - 1];
    log("Last traveled coord: ", lastTraveledCoord);
    // log(
    //   "Position: ",
    //   this.position,
    //   direction[this.orientation],
    //   this.traveledMap[this.position.y][this.position.x]
    // );
  }

  public async findExit() {
    while (!this.exitFound) {
      // await this.debug();
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

  public getTraveledMap() {
    return this.traveledMap;
  }
}

export const partOne = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);
  const mapData = data.split("\n").map((line) => line.split(""));

  const map = new PartOne(mapData);
  map.findExit();
  const answer = map.distinctPositions();
  log("Part One number of distinct positions: ", answer);
};
