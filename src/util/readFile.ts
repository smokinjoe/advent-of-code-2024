import fs from "fs";

export const readFile = (filename: string): string => {
  return fs.readFileSync(`./src/data/${filename}`, "utf8");
};
