import { readFile, getFilename } from "../util/readFile";

const Day = "02";

const isDifferenceUnsafe = (difference: number): boolean =>
  Math.abs(difference) < 1 || Math.abs(difference) > 3;

const checkIfSafe = (reportArray: string[]): "Safe" | "Unsafe" => {
  let delta: null | "Increasing" | "Decreasing" = null;

  for (let i = 0; i < reportArray.length - 1; i++) {
    const current = parseInt(reportArray[i], 10);
    const next = parseInt(reportArray[i + 1], 10);

    const difference = next - current;

    if (delta === null) {
      if (difference > 0) {
        delta = "Increasing";
      } else if (difference < 0) {
        delta = "Decreasing";
      }
    } else {
      if (delta === "Increasing" && difference < 0) {
        return "Unsafe";
      }

      if (delta === "Decreasing" && difference > 0) {
        return "Unsafe";
      }
    }

    if (isDifferenceUnsafe(difference)) {
      return "Unsafe";
    }
  }

  return "Safe";
};

const parseReports = (
  data: string,
  withDampener = false
): Array<"Safe" | "Unsafe"> => {
  const reports = data.split("\n");

  const safetyArray = reports.map((report) => {
    const reportArray = report.split(" ");
    const isSafe = checkIfSafe(reportArray);

    if (!withDampener || isSafe === "Safe") {
      return isSafe;
    }

    for (let i = 0; i < reportArray.length; i++) {
      const reportCopy = [...reportArray];
      reportCopy.splice(i, 1);

      if (checkIfSafe(reportCopy) === "Safe") {
        return "Safe";
      }
    }

    return "Unsafe";
  });

  return safetyArray;
};

export const partOne = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);

  const safetyReport = parseReports(data);
  const safeReports = safetyReport.filter((report) => report === "Safe");
  console.log("Answer to Part One: ", safeReports.length);
};

export const partTwo = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);

  const safetyReport = parseReports(data, true);
  const safeReports = safetyReport.filter((report) => report === "Safe");
  console.log("Answer to Part Two: ", safeReports.length);
};
