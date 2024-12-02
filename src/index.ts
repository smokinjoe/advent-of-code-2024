import * as days from "./days";

const day = process.env.DAY || "one";
const isExample = process.env.RUN_EXAMPLE === "true";

console.log("Hello, Advent of Code!");
console.log(`Running Day ${day}`);
console.log(`Mode: ${isExample ? "Example" : "Normal"}`);

type DayModules = {
  [key: string]: {
    partOne: () => void;
    partTwo: () => void;
  };
};

const typedDays: DayModules = days as DayModules;
const dayModule = typedDays[day];

dayModule.partOne();
dayModule.partTwo();
