import { assertIsDefined } from "../util/assertions";
import { readFile, getFilename } from "../util/readFile";

const Day = "04";

const setDayFourMap =
  (xmasCells: string[][]) =>
  (x: number, y: number, charToCheck: string): boolean => {
    try {
      if (xmasCells[x] === undefined) return false;
      if (xmasCells[x][y] === undefined) return false;

      //   console.log("X, Y: ", x, y);
      //   console.log("xmasCells[x][y]: ", xmasCells[x][y]);

      return xmasCells[x][y] === charToCheck;
    } catch (error) {
      const obj = {
        x,
        y,
      };
      console.table(obj);
      console.error(error);
      return false;
    }
  };

export const partOne = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);

  const xmasCells = data.split("\n").map((row) => row.split(""));

  const isCorrectCharacter = setDayFourMap(xmasCells);

  let numXMASes = 0;

  for (let x = 0; x < xmasCells.length; x++) {
    for (let y = 0; y < xmasCells[x].length; y++) {
      if (xmasCells[x][y] === "X") {
        // Check for XMAS to the right
        if (
          isCorrectCharacter(x, y, "X") &&
          isCorrectCharacter(x + 1, y, "M") &&
          isCorrectCharacter(x + 2, y, "A") &&
          isCorrectCharacter(x + 3, y, "S")
        ) {
          numXMASes++;
        }

        // Check for XMAS to the bottom
        if (
          isCorrectCharacter(x, y, "X") &&
          isCorrectCharacter(x, y + 1, "M") &&
          isCorrectCharacter(x, y + 2, "A") &&
          isCorrectCharacter(x, y + 3, "S")
        ) {
          numXMASes++;
        }

        // Check for XMAS to the left
        if (
          isCorrectCharacter(x, y, "X") &&
          isCorrectCharacter(x - 1, y, "M") &&
          isCorrectCharacter(x - 2, y, "A") &&
          isCorrectCharacter(x - 3, y, "S")
        ) {
          numXMASes++;
        }

        // Check for XMAS to the top
        if (
          isCorrectCharacter(x, y, "X") &&
          isCorrectCharacter(x, y - 1, "M") &&
          isCorrectCharacter(x, y - 2, "A") &&
          isCorrectCharacter(x, y - 3, "S")
        ) {
          numXMASes++;
        }

        // Check for XMAS to the top right
        if (
          isCorrectCharacter(x, y, "X") &&
          isCorrectCharacter(x + 1, y - 1, "M") &&
          isCorrectCharacter(x + 2, y - 2, "A") &&
          isCorrectCharacter(x + 3, y - 3, "S")
        ) {
          numXMASes++;
        }

        // Check for XMAS to the top left
        if (
          isCorrectCharacter(x, y, "X") &&
          isCorrectCharacter(x - 1, y - 1, "M") &&
          isCorrectCharacter(x - 2, y - 2, "A") &&
          isCorrectCharacter(x - 3, y - 3, "S")
        ) {
          numXMASes++;
        }

        // Check for XMAS to the bottom right
        if (
          isCorrectCharacter(x, y, "X") &&
          isCorrectCharacter(x + 1, y + 1, "M") &&
          isCorrectCharacter(x + 2, y + 2, "A") &&
          isCorrectCharacter(x + 3, y + 3, "S")
        ) {
          numXMASes++;
        }

        // Check for XMAS to the bottom left
        if (
          isCorrectCharacter(x, y, "X") &&
          isCorrectCharacter(x - 1, y + 1, "M") &&
          isCorrectCharacter(x - 2, y + 2, "A") &&
          isCorrectCharacter(x - 3, y + 3, "S")
        ) {
          numXMASes++;
        }
      }
    }
  }
  console.log("Solution to Part One: ", numXMASes);
};

export const partTwo = () => {
  const filename = getFilename(Day, "part-two");
  const xmasCells = readFile(filename)
    .split("\n")
    .map((row) => row.split(""));

  const isCorrectCharacter = setDayFourMap(xmasCells);

  let numXMASes = 0;

  for (let x = 0; x < xmasCells.length; x++) {
    for (let y = 0; y < xmasCells[x].length; y++) {
      if (xmasCells[x][y] === "A") {
        if (
          isCorrectCharacter(x - 1, y - 1, "M") &&
          isCorrectCharacter(x + 1, y - 1, "M") &&
          isCorrectCharacter(x - 1, y + 1, "S") &&
          isCorrectCharacter(x + 1, y + 1, "S")
        ) {
          numXMASes++;
        }

        if (
          isCorrectCharacter(x - 1, y - 1, "M") &&
          isCorrectCharacter(x + 1, y - 1, "S") &&
          isCorrectCharacter(x - 1, y + 1, "M") &&
          isCorrectCharacter(x + 1, y + 1, "S")
        ) {
          numXMASes++;
        }

        if (
          isCorrectCharacter(x - 1, y - 1, "S") &&
          isCorrectCharacter(x + 1, y - 1, "S") &&
          isCorrectCharacter(x - 1, y + 1, "M") &&
          isCorrectCharacter(x + 1, y + 1, "M")
        ) {
          numXMASes++;
        }

        if (
          isCorrectCharacter(x - 1, y - 1, "S") &&
          isCorrectCharacter(x + 1, y - 1, "M") &&
          isCorrectCharacter(x - 1, y + 1, "S") &&
          isCorrectCharacter(x + 1, y + 1, "M")
        ) {
          numXMASes++;
        }
      }
    }
  }

  console.log("Solution to Part Two: ", numXMASes);
};
