import { readFile, getFilename } from "../util/readFile";

const Day = "01";

function parseLeftAndRightLists(data: string) {
  const rows = data.split("\n");
  const left: number[] = [];
  const right: number[] = [];

  // Fill up the left and right arrays
  rows.forEach((row) => {
    const rowArray = row.split("   ");
    left.push(parseInt(rowArray[0], 10));
    right.push(parseInt(rowArray[1], 10));
  });

  // Sort each array from highest to lowest
  left.sort((a, b) => b - a);
  right.sort((a, b) => b - a);

  return [left, right];
}

export function partOne() {
  const filename = getFilename(Day);
  const data = readFile(filename);

  const [left, right] = parseLeftAndRightLists(data);

  const differences: number[] = [];
  for (let i = 0; i < left.length; i++) {
    // Determine absolute value of difference
    differences.push(Math.abs(left[i] - right[i]));
  }

  // Determine sum of all differences
  const sum = differences.reduce((acc, curr) => acc + curr, 0);
  console.log("Answer to Part One: ", sum);
}

export function partTwo() {
  const filename = getFilename(Day);
  const data = readFile(filename);

  const [left, right] = parseLeftAndRightLists(data);

  const numberOfAppearances: Record<number, number> = {};
  right.forEach((num) => {
    if (numberOfAppearances[num]) {
      numberOfAppearances[num] += 1;
    } else {
      numberOfAppearances[num] = 1;
    }
  });

  const similarityScores: number[] = [];

  left.forEach((num) => {
    const factor = numberOfAppearances[num] ?? 0;
    similarityScores.push(num * factor);
  });

  const sum = similarityScores.reduce((acc, curr) => acc + curr, 0);
  console.log("Answer to Part Two: ", sum);
}
