import { readFile, getFilename } from "../util/readFile";

const Day = "02";

const parseReports = (data: string): Array<"Safe" | "Unsafe"> => {
  const reports = data.split("\n");

  const safetyArray = reports.map((report) => {
    const reportArray = report.split(" ");
    let delta: null | "Increasing" | "Decreasing" = null;

    for (let i = 0; i < reportArray.length - 1; i++) {
      const current = parseInt(reportArray[i], 10);
      const next = parseInt(reportArray[i + 1], 10);

      // const difference = Math.abs(current - next);
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

      if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
        return "Unsafe";
      }
    }

    return "Safe";
  });

  return safetyArray;
};

export const partOne = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);

  /**
   * The levels are either all increasing or all decreasing.
   * Any two adjacent levels differ by at least one and at most three.
   */

  const safetyReport = parseReports(data);
  const safeReports = safetyReport.filter((report) => report === "Safe");
  console.log("Answer to Part One: ", safeReports.length);
};

export const partTwo = () => {
  console.log("STUBBED");
};
