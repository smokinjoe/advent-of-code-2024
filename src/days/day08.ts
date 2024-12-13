import { log, logTable } from "../util/log";
import { getFilename, readFile } from "../util/readFile";

const Day = "08";

export const partOne = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);

  const dataRows = data.split("\n");
  const grid = dataRows.map((row) => row.split(""));

  const xboundary = grid[0].length;
  const yboundary = grid.length;

  const antennas = new Map();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== ".") {
        antennas.set(grid[y][x], [...(antennas.get(grid[y][x]) || []), [y, x]]);
      }
    }
  }

  const antinodes = new Set();

  antennas.forEach((items) => {
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items.length; j++) {
        if (i === j) continue;

        const [y1, x1] = items[i];
        const [y2, x2] = items[j];

        const dx = x2 - x1;
        const dy = y2 - y1;

        const x = x2 + dx;
        const y = y2 + dy;

        // Something is different wrong with this
        if (x >= 0 && x < xboundary && y >= 0 && y < yboundary) {
          try {
            if (grid[y][x] === ".") antinodes.add([y, x]);
          } catch (e) {
            log(`Errors at, x:${x}, y:${y}`);
            const yElement = grid[y] ?? [];
            const xElement = yElement[x] ?? [];
            log({ yElement, xElement });
          }
        }
      }
    }
  });

  //   const solution = readFile("day-08-example-solution.txt")
  //     .split("\n")
  //     .map((row) => row.split(""));
  //   logTable({ data: solution });

  //   log(antinodes);
  logTable({ data: grid });

  log("Part one: ", antinodes.size);
};
export const partTwo = () => log("Not implemented");
