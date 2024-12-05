import * as days from "./days";

const day = process.env.DAY || "one";
const isExample = process.env.RUN_EXAMPLE === "true";

console.log("Hello, Advent of Code 2024!");
console.log(`Running Day ${day}`);
console.log(`Mode: ${isExample ? "Example" : "Normal"}`);

type DayModules = {
  [key: string]: {
    partOne: () => void;
    partTwo: () => void;
  };
};

const dayModules: DayModules = days as DayModules;
const dayModule = dayModules[day];

dayModule.partOne();
dayModule.partTwo();
