import { readFile } from "./util/readFile";

console.log("Hello, Advent of Code! It is Day One.");

function dayOnePartOne() {
  const filename =
    process.env.RUN_EXAMPLE === "true" ? "day-01-example.txt" : "day-01.txt";
  const data = readFile(filename);
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

  const differences: number[] = [];
  for (let i = 0; i < left.length; i++) {
    // Determine absolute value of difference
    differences.push(Math.abs(left[i] - right[i]));
  }

  // Determine sum of all differences
  const sum = differences.reduce((acc, curr) => acc + curr, 0);
  console.log("Answer to Part One: ", sum);
}

dayOnePartOne();
