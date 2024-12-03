/**
 * It seems like the goal of the program is just to multiply some numbers.
 * It does that with instructions like mul(X,Y), where X and Y are each 1-3
 * digit numbers. For instance, mul(44,46) multiplies 44 by 46 to get a
 * result of 2024. Similarly, mul(123,4) would multiply 123 by 4.
 */

import { assertIsDefined } from "../util/assertions";
import { readFile, getFilename } from "../util/readFile";

const Day = "03";

const extractMulPairs = (data: string): number[][] => {
  /**
   * create a regular expression that captures the values between several mul( and )
   */
  const re = /mul\((\d+),(\d+)\)/g;

  const mulArray = data.match(re);
  assertIsDefined(mulArray);

  const pairs = mulArray.map((item) => {
    const match = re.exec(item);
    assertIsDefined(match);

    // --==* The More You Know!
    // Reset lastIndex to allow multiple exec calls
    re.lastIndex = 0;
    return [parseInt(match[1]), parseInt(match[2])];
  });

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

export const partTwo = () => console.log("Stubbed");
