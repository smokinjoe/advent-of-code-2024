/**
 * It seems like the goal of the program is just to multiply some numbers.
 * It does that with instructions like mul(X,Y), where X and Y are each 1-3
 * digit numbers. For instance, mul(44,46) multiplies 44 by 46 to get a
 * result of 2024. Similarly, mul(123,4) would multiply 123 by 4.
 */

import { assertIsDefined } from "../util/assertions";
import { readFile, getFilename } from "../util/readFile";

const Day = "03";

const mulRegex = /mul\((\d+),(\d+)\)/g;

const extractPair = (item: string): number[] => {
  const match = mulRegex.exec(item);
  assertIsDefined(match);

  // --==* The More You Know!
  // Reset lastIndex to allow multiple exec calls
  mulRegex.lastIndex = 0;
  return [parseInt(match[1]), parseInt(match[2])];
};

const extractMulPairs = (data: string): number[][] => {
  const mulArray = data.match(mulRegex);
  assertIsDefined(mulArray);

  const pairs = mulArray.map(extractPair);

  return pairs;
};

export const partOne = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);
  const pairs = extractMulPairs(data);
  const multipliedValuesArray = pairs.map(([x, y]) => x * y);
  const sum = multipliedValuesArray.reduce((acc, val) => acc + val, 0);
  console.log("Solution to Part One: ", sum);
};

const checkIfDont = (data: string, index: number) => {
  const segment = data.slice(index, index + 5);
  return segment === "don't";
};

const checkIfDo = (data: string, index: number) => {
  const segment = data.slice(index, index + 2);
  return !checkIfDont(data, index) && segment === "do";
};

const parseDataForValidString = (data: string): string => {
  const stringSegments = [];
  let trackString = true;

  for (let i = 0; i < data.length; i++) {
    if (data[i] === "d") {
      if (checkIfDont(data, i)) {
        trackString = false;
      } else if (checkIfDo(data, i)) {
        trackString = true;
      }
    }

    if (trackString) {
      stringSegments.push(data[i]);
    }
  }

  return stringSegments.join("");
};

export const partTwo = () => {
  const filename = getFilename(Day, "part-two");
  const data = readFile(filename);
  const parsed = parseDataForValidString(data);
  const pairs = extractMulPairs(parsed);
  const multipliedValuesArray = pairs.map(([x, y]) => x * y);
  const sum = multipliedValuesArray.reduce((acc, val) => acc + val, 0);
  console.log("Solution to Part Two: ", sum);
};
