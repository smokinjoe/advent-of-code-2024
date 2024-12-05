import { assertIsDefined } from "../util/assertions";
import { readFile, getFilename } from "../util/readFile";

const Day = "04";

// const checkIfValidNorth = (y: number, min: number) => y - 3 >= min;
// const checkIfValidSouth = (y: number, max: number) => y + 3 <= max;
// const checkIfValidWest = (x: number, min: number) => x - 3 >= min;
// const checkIfValidEast = (x: number, max: number) => x + 3 <= max;

// const checkIfValidNorthWest = (x: number, y: number, min: number) =>
//   checkIfValidNorth(y, min) && checkIfValidWest(x, min);
// const checkIfValidNorthEast = (
//   x: number,
//   y: number,
//   min: number,
//   max: number
// ) => checkIfValidNorth(y, min) && checkIfValidEast(x, max);
// const checkIfValidSouthWest = (
//   x: number,
//   y: number,
//   min: number,
//   max: number
// ) => checkIfValidSouth(y, max) && checkIfValidWest(x, min);
// const checkIfValidSouthEast = (x: number, y: number, max: number) =>
//   checkIfValidSouth(y, max) && checkIfValidEast(x, max);

export const partOne = () => {
  //   const filename = "day-04-mini-example.txt";
  const filename = getFilename(Day);
  const data = readFile(filename);

  const xmasCells = data.split("\n").map((row) => row.split(""));

  console.table(xmasCells);

  //   const checkCharacterRecursion = (
  //     x: number,
  //     y: number,
  //     characterArray: string[]
  //   ) => {
  //     if (xmasCells[y][x] === undefined) return false;
  //     if (characterArray.length === 1) {
  //       // we're checking for final character
  //       return xmasCells[y][x] === characterArray[0];
  //     }
  //   };

  const isCorrectCharacter = (
    x: number,
    y: number,
    charToCheck: string
  ): boolean => {
    try {
      if (xmasCells[x] === undefined) return false;
      if (xmasCells[x][y] === undefined) return false;

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
export const partTwo = () => console.log("stubbed");
