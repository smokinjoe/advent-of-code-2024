import { getFilename, readFile } from "../../util/readFile";
import { log, logTable } from "../../util/log";
import { assertNever } from "../../util/assertions";

import { Direction, direction, Day, wait } from "./util";

const Boundary = {
  Pound: "#",
  Barrel: "O",
};

class PartTwo {
  private orientation = Direction.north;
  private position = { x: -1, y: -1 };
  private startingPosition: null | { x: number; y: number } = null;
  private traveledMap: string[][];
  private exitFound = false;
  private traveledCoords: string[] = [];
  private numCircuits = 0;

  constructor(private map: string[][]) {
    this.map = map;
    this.traveledMap = JSON.parse(JSON.stringify(map));
    this.findStart();
  }

  private findStart() {
    if (this.startingPosition) {
      this.position = this.startingPosition;
      return;
    }
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] === "^") {
          this.startingPosition = { x, y };
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
      this.map[lookAhead.y][lookAhead.x] === Boundary.Pound ||
      this.traveledMap[lookAhead.y][lookAhead.x] === Boundary.Barrel
    ) {
      return true;
    }
  }

  private step() {
    // This takes care of marking X as the starting position
    this.traveledMap[this.position.y][this.position.x] = "X";

    // Get current position
    const { x, y } = this.position;

    // Determine next position
    const next = this.nextPosition(x, y);

    // Check to see if that places you outside of the map
    if (
      this.traveledMap[next.y] === undefined ||
      this.traveledMap[next.y][next.x] === undefined
    ) {
      // if it does, we are done!
      this.exitFound = true;
      return;
    }

    // Check to see if we're against a # boundary
    if (this.atBoundary()) {
      // if we are, take that about-face
      this.turn();
      return;
    }

    this.traveledCoords.push(
      `${this.position.x}:${this.position.y}:${this.orientation}`
    );
    // If things are clear, let's continue on!
    this.position = next;
    this.traveledMap[this.position.y][this.position.x] = "X";
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

  private resetBruteForce() {
    this.traveledCoords = [];
    this.orientation = Direction.north;
    this.exitFound = false;
    this.findStart();
  }

  private areWeDone() {
    const pos = `${this.position.x}:${this.position.y}:${this.orientation}`;
    const circuitFound = this.traveledCoords.includes(pos);

    if (circuitFound) {
      this.numCircuits++;
    }

    return this.exitFound || circuitFound;
  }

  private async findCircuit() {
    this.traveledMap = JSON.parse(JSON.stringify(this.map));

    while (!this.areWeDone()) {
      this.step();
    }
  }

  private async debug() {
    await wait(50);
    console.clear();
    logTable({ data: this.map });
    logTable({ data: this.traveledMap });
    // const lastTraveledCoord =
    //   this.traveledCoords[this.traveledCoords.length - 1];
    // log("Last traveled coord: ", lastTraveledCoord);
    // log(
    //   "Position: ",
    //   this.position,
    //   direction[this.orientation],
    //   this.traveledMap[this.position.y][this.position.x]
    // );
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

  public logMap() {
    logTable({ label: "Traveled Map", data: this.traveledMap });
    logTable({ label: "Map", data: this.map });
  }

  public async bruteForce() {
    // Loop through each element and add a `O` (or #) to the map except the starting point
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        this.resetBruteForce();
        if (this.map[y][x] === "^" || this.map[y][x] === Boundary.Pound) {
          continue;
        }

        this.map[y][x] = Boundary.Barrel;
        this.findCircuit();

        // NOTE: This should just be whatever character allows me to traverse over it again
        // If I wanted to be fancy, I could reset it to something that it was previously (eg. X)
        this.map[y][x] = ".";
      }
    }
  }

  public getNumCircuits() {
    return this.numCircuits;
  }
}

export const partTwo = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);
  const mapData = data.split("\n").map((line) => line.split(""));

  const map = new PartTwo(mapData);
  map.findExit();
  map.bruteForce();
  const numCircuits = map.getNumCircuits();
  log("Part Two: Number of circuits: ", numCircuits);
};
